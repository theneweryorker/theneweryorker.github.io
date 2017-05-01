/*!
 * Palikka v1.0.0
 * https://github.com/niklasramo/palikka
 * Copyright (c) 2016 Niklas Rämö <inramo@gmail.com>
 * Released under the MIT license
 */

(function (glob, factory) {

  // UMD returnExports pattern.
  // https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(glob);
    });
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory(glob);
  }
  else {
    glob['Palikka'] = factory(glob);
  }

}(this, function (glob, undefined) {

  'use strict';

  // Default Palikka instance which is used by the static Palikka methods.
  var P = new Palikka();

  // Module states.
  var stateReady = 'ready';
  var stateDefined = 'defined';
  var stateUndefined = 'undefined';

  // Error messages.
  var errors = {
    invalidModuleId: 'Module id must be a non-empty string.',
    selfAsDep: 'Module cannot have itself as a dependency.',
    noDefineId: '.define() method must have an id.',
    noRequireId: '.require() method must have an id.',
    noRequireCb: '.require() method must have a callback function.',
    moduleNotReady: function (id) {
      return 'Required module (' + id + ') is not ready.';
    },
    circDep: function (id, depId) {
      return 'Circular dependency between ' + id + ' and ' + depId + '.';
    }
  };

  // Report symbols mapping.
  var reportSymbols = {
    'ready': '(v)',
    'defined': '(-)',
    'undefined': '( )'
  };

  /**
   * Module
   * ******
   */

  /**
   * Module instance constructor.
   *
   * @class
   * @private
   * @param {Palikka} palikka
   * @param {String} id
   * @param {Array} dependencies
   * @param {*} factory
   */
  function Module(palikka, id, dependencies, factory) {

    var instance = this;
    var isResolved = false;

    // Make sure module id is a string.
    if (!id || typeof id !== 'string') {
      throwError(errors.invalidModuleId);
    }

    // Make sure module is not already defined.
    if (palikka._modules[id]) {
      return;
    }

    // Validate dependencies.
    for (var i = 0; i < dependencies.length; i++) {

      var depId = dependencies[i];
      var dep = palikka._modules[depId];

      // Make sure the module id is valid
      if (!depId || typeof depId !== 'string') {
        throwError(errors.invalidModuleId);
      }

      // Make sure the module does not require itself.
      if (depId === id) {
        throwError(errors.selfAsDep);
      }

      // Make sure the module does not have a circular dependency.
      if (dep && dep.dependencies.indexOf(id) > -1) {
        throwError(errors.circDep(id, depId));
      }

    }

    // Setup instance data.
    instance.id = id;
    instance.order = ++palikka._counter;
    instance.dependencies = dependencies;
    instance.ready = false;
    instance.value = undefined;

    // Add module to palikka modules.
    palikka._modules[id] = instance;

    // Load dependency modules and resolve the module.
    if (dependencies.length) {
      loadModules.call(palikka, dependencies, onDependenciesLoaded);
    }
    else {
      onDependenciesLoaded();
    }

    // Helper function for resolving the module's value. Checks if the value is
    // a promise in which case the promises fulfilled/rejected value will be
    // used as the module's value.
    function resolve(value) {

      if (!isResolved) {
        isResolved = true;
        if (value && typeof value.then === 'function') {
          value.then(finalize, finalize);
        }
        else {
          finalize(value);
        }
      }

    }

    // Helper function to finalize the module's defintion procedure.
    function finalize(value) {

      // Update instance ready state and value.
      instance.ready = true;
      instance.value = value;

      // Process palikka callback queue.
      var queues = palikka._queues;
      var queue = queues[id] = (queues[id] || []).concat();
      for (var i = 0; i < queue.length; i++) {
        queue[i](instance);
      }

    }

    // A callback function for when dependency modules are loaded.
    function onDependenciesLoaded() {

      if (typeof factory === 'function') {

        var isDeferred = false;
        var defer = function (resolver) {
          if (!isDeferred) {
            isDeferred = true;
            if (typeof resolver === 'function') {
              resolver(function (value) {
                resolve(value);
              });
            }
            else {
              return resolve;
            }
          }
        };
        var req = function (id) {
          return getModuleValue.call(palikka, id);
        };
        var value = factory(req, defer, id);

        if (!isDeferred) {
          resolve(value);
        }

      }
      else {

        resolve(factory);

      }

    }

  }

  /**
   * Palikka
   * *******
   */

  /**
   * Palikka instance constructor.
   *
   * @class
   * @public
   */
  function Palikka() {

    this._modules = {};
    this._queues = {};
    this._counter = 0;

  }

  /**
   * @public
   * @memberof Palikka
   * @see Palikka.prototype.define
   */
  Palikka.define = function (ids, dependencies, factory) {

    var argsLength = arguments.length;

    argsLength > 2 ? P.define(ids, dependencies, factory) :
    argsLength > 1 ? P.define(ids, dependencies) :
    P.define(ids);

    return Palikka;

  };

  /**
   * @public
   * @memberof Palikka
   * @see Palikka.prototype.require
   */
  Palikka.require = function (modules, callback) {

    P.require(modules, callback);
    return Palikka;

  };

  /**
   * @public
   * @memberof Palikka
   * @see Palikka.prototype.getLog
   */
  Palikka.getLog = function (modules) {

    return P.getLog(modules);

  };

  /**
   * @public
   * @memberof Palikka
   * @see Palikka.prototype.getData
   */
  Palikka.getData = function () {

    return P.getData();

  };

  /**
   * Define a module or multiple modules. After a module is defined it can
   * not be undefined anymore and no other module can be defined with the same
   * id. Defining a module with a circular dependency results in an error.
   *
   * @public
   * @memberof Palikka.prototype
   * @param {Array|String} ids
   *   - Module id(s). Each module must have a unique id.
   * @param {Array|String} [dependencies]
   *   - Define one or more dependenies.
   * @param {*|Palikka~Factory} [factory]
   *   - If the factory is a function it is called once after all dependencies
   *     have loaded and it's return value will be assigned as the module's
   *     value. Otherwise the provided value is directly assigned as the
   *     module's value after the dependencies have loaded.
   * @returns {Object}
   *   - Returns the method's context.
   */
  Palikka.prototype.define = function (ids, dependencies, factory) {

    var hasDeps = arguments.length > 2;
    var ids = [].concat(ids);
    var deps = hasDeps ? [].concat(dependencies) : [];
    var factory = hasDeps ? factory : dependencies;

    if (!ids.length) {
      throwError(errors.noDefineId);
    }

    for (var i = 0; i < ids.length; i++) {
      new Module(this, ids[i], deps, factory);
    }

    return this;

  };

  /**
   * @callback Palikka~Factory
   * @param {Palikka~FactoryRequire} require
   *   - Returns the value of a dependency module when provided with a module id
   *     as the first argument.
   * @param {Palikka~FactoryDefer} defer
   *   - Defers the definition of the module.
   * @param {String} id
   *   - Id of the module which is being defined.
   */

  /**
   * Returns the value of a module when provided with a module id as the first
   * argument. If the provided module id does not exist an error will be thrown.
   *
   * @callback Palikka~FactoryRequire
   * @param {String} id
   *   - Id of the module.
   * @returns {*}
   *   - Value of the module.
   */

  /**
   * When called the module will be defined asynchronously. Returns a resolver
   * function that needs to be called to finish the module definition process.
   * The returned resolver function accepts one argument which will be assigned
   * as the value of the module.
   *
   * @callback Palikka~FactoryDefer
   * @returns {Palikka~FactoryResolver} resolver
   */

  /**
   * When called the module will be instantly defined with the provided value.
   *
   * @callback Palikka~FactoryResolver
   * @param {*} [value]
   */

  /**
   * Require modules.
   *
   * @public
   * @memberof Palikka.prototype
   * @param {Array|String} modules
   *   - An array of module ids or a single module id as a string.
   * @param {Palikka~RequireCallback} callback
   *   - Called after all the provided modules are defined and ready.
   * @returns {Palikka}
   */
  Palikka.prototype.require = function (modules, callback) {

    var instance = this;

    modules = [].concat(modules);

    if (!modules.length) {
      throwError(errors.noRequireId);
    }

    if (typeof callback !== 'function') {
      throwError(errors.noRequireCb);
    }

    loadModules.call(instance, modules, function () {
      callback(function (id) {
        return getModuleValue.call(instance, id);
      });
    });

    return instance;

  };

  /**
   * @callback Palikka~RequireCallback
   * @param {Palikka~FactoryRequire} require
   *   - Returns the value of a dependency module when provided with a module id
   *     as the first argument.
   */

  /**
   * Returns a tidy list of all the currently defined modules and their
   * dependencies in the exact order they were defined. The list also indicates
   * each module's current state: undefined '( )', defined '(-)' or ready '(v)'.
   *
   * @public
   * @memberof Palikka.prototype
   * @param {Array|String} [ids]
   *   - An array of module ids or a single module id as a string.
   * @returns {String}
   *   - Returns nicely formatted report of all the currently defined modules
   *     and their dependencies.
   */
  Palikka.prototype.getLog = function (ids) {

    return generateLog.call(this, ids);

  };

  /**
   * Get the current data of defined modules. Returns an array containing clones
   * of the defined module instances in same the order they were defined.
   *
   * @public
   * @memberof Palikka.prototype
   * @returns {Object}
   */
  Palikka.prototype.getData = function () {

    var data = this._modules;
    var ids = Object.keys(data);
    var ret = {};

    for (var i = 0; i < ids.length; i++) {
      ret[ids[i]] = getModuleData(data[ids[i]]);
    }

    return ret;

  };

  /**
   * Helpers
   * *******
   */

  /**
   * Load modules.
   *
   * @private
   * @param {Array} ids
   *   - An array of module ids (string).
   * @param {Function} callback
   *   - Called after all the provided modules are defined.
   */
  function loadModules(ids, callback) {

    var palikka = this;
    var modulesIds = [].concat(ids);
    var modulesLength = modulesIds.length;
    var counter = 0;

    for (var i = 0; i < modulesIds.length; i++) {

      var id = modulesIds[i];

      if (!id || typeof id !== 'string') {
        throwError(errors.invalidModuleId);
      }

      var module = palikka._modules[id];

      if (module && module.ready) {
        if (++counter === modulesLength) {
          callback();
        }
      }
      else {
        var queues = palikka._queues;
        var queue = queues[id] = queues[id] || [];
        queue[queue.length] = function () {
          if (++counter === modulesLength) {
            callback();
          }
        };
      }

    }

  }

  /**
   * Get a module's value by module id from a Palikka instance. Returns
   * undefined if the module is not found.
   *
   * @private
   * @param {String} id
   * @returns {*}
   */
  function getModuleValue(id) {

    if (!id || typeof id !== 'string') {
      throwError(errors.invalidModuleId);
    }

    var module = this._modules[id];

    if (!module || !module.ready) {
      throwError(errors.moduleNotReady(id));
    }

    return module.value;

  }

  /**
   * Return a clone of a module instance.
   *
   * @private
   * @param {Module} module
   */
  function getModuleData(module) {

    return {
      id: module.id,
      order: module.order,
      dependencies: module.dependencies,
      ready: module.ready,
      value: module.value
    };

  }

  /**
   * Generate log data.
   *
   * @private
   * @param {Array|String} [ids]
   * @returns {Object}
   */
  function generateLog(ids) {

    var report = '';
    var moduleIds = ids && typeof ids !== 'function' ? ids : null;
    var modules = this._modules;
    var modulesArray = (moduleIds ? [].concat(moduleIds) : Object.keys(modules))
    .filter(function (id) {
      return modules[id];
    })
    .map(function (id) {
      return getModuleData(modules[id]);
    })
    .sort(function (a, b) {
      return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
    });

    for (var i = 0; i < modulesArray.length; i++) {
      var module = modulesArray[i];
      var state = module.ready ? stateReady : stateDefined;
      report += generateLogEntry(module.id, null, state);
      for (var ii = 0; ii < module.dependencies.length; ii++) {
        var depId = module.dependencies[ii];
        var dep = modules[depId];
        var depState = !dep ? stateUndefined : dep.ready ? stateReady : stateDefined;
        report += generateLogEntry(depId, module.id, depState);
      }
    }

    return report;

  }

  /**
   * Default logger function which is used to define the template for a report
   * entry.
   *
   * @private
   * @param {String} id
   *   - Id of the module.
   * @param {String|Null} parentId
   *   - Id of the parent module or null if the module is a root level module.
   * @param {String} state
   *   - Possible values are: "undefined", "defined" or "ready".
   * @returns {String}
   */
  function generateLogEntry(id, parentId, state) {

    return (parentId ? '    ' : '') + reportSymbols[state] + ' ' + id + '\n';

  }

  /**
   * Throw library error.
   *
   * @private
   * @param {String} message
   */
  function throwError(message) {

    throw new Error('[Palikka] ' + message);

  }

  return Palikka;

}));
