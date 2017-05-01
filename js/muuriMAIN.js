//YAAAAAAS LET'S DO THIS

//Setting up shop to manipulate DOM elements


var m = {};
var $grid = $('.grid');
var $filterField = $('.filter-field');
// var $filterField = $('input[name=myradio]');

// var $filterField = document.getElementsByClassName("filter-field")

//when we select an option from the .filter-field class dropdown, call function filter

  $filterField.on('change', filter);


//initiate a Muuri instance -- needs container and items;
// look at Muuri documentation for more options
// NOTE:
// Muuri does not convert a node list to array automatically
// so we gotta do it manually.
m.grid = new Muuri({
  container: document.getElementsByClassName('grid')[0],
  items: [].slice.call(document.getElementsByClassName('item')),
  dragEnabled: true
});

//see function updateIndices at bottom-- this will come in handy for CSS reasons,
// eventually reshaping elements as we drag them based on their index
m.grid.on('move', function () {
      updateIndices();
    });



function filter() {
  //muuri.get is a built-in Muuri method that gets all items-- you can also specify targets
  var items = m.grid.get();
  //find which filter we've picked
  // var activeFilter = $("input[name='option']:checked").val()
  var activeFilter = $("input[name='option']:checked").val()

  // var activeFilter = $filterField.val()

  var itemsToShow = [];
  var itemsToHide = [];

  // Check which items need to be shown/hidden
    console.log(activeFilter);
    // console.log(items)

    if(activeFilter !== 'all'){
    items.forEach(function (item) {
      var $elem = $(item._element);
      var isFilterMatch = $elem.attr('data-label') === activeFilter ? true : false;
      (isFilterMatch ? itemsToShow : itemsToHide).push(item);
    });
  } else {
    m.grid.show(items);
  }

  // console.log(itemsToShow);
  // console.log(itemsToHide);

//yay for more muuri methods! Making our life easy!


  m.grid.hide(itemsToHide);
  m.grid.show(itemsToShow);

}

function updateIndices() {

  m.grid.get().forEach(function (item, i) {
    $(item._element).attr('data-id', i + 1).find('.card-id').text(i + 1);
  });

}
