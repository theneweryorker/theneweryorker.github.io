// import ListGroup from './ListGroup';
import './styles/FrontPage.css'; // Import your global CSS file
import React, { useEffect, useRef } from 'react';
import kid_face from '../assets/kid_face.png';
import appleimage from '../assets/apple.png';
import athens from '../assets/athens_ohio.jpg';
import benfranklin from '../assets/benfranklin.png';
import pointer from '../assets/fingerpointing-17.png';
import Mao from '../assets/Mao.png';
import warren from '../assets/warrenbuffet.png';
import rad from '../assets/rad-12.png';
import airplane from '../assets/airplane.png';
import yorker from '../assets/newyorker-13.png';
import topeka from '../assets/topeka.webp';
import formulas1 from '../assets/formulas1.png';
import formulas2 from '../assets/formulas2.png';

function FrontPage() {

const fullScreenStyles = {
  height: '100vh',
  width: '100vw',
};

  useEffect(() => {
    var hoverTriggers = document.querySelectorAll(".hover-trigger");

    hoverTriggers.forEach(function (hoverTrigger) {
      console.log("hello");
      hoverTrigger.addEventListener("mouseover", function () {

        var contentId = hoverTrigger.getAttribute("data-content");
        if(contentId != null) {
          var hoverContent = document.getElementById(contentId);
          if (hoverContent) {
            hoverContent.classList.add("active");
            var triggerRect = hoverTrigger.getBoundingClientRect();
            var triggerY = triggerRect.top + window.pageYOffset + 7;
            hoverContent.style.top = triggerY + "px";
          }
        }
      });
    });

    // this is for expanding text in blog
    function toggleExpand(button: any) {
      var paragraph = button.parentNode;
      paragraph.classList.toggle("expanded");
      var nextParagraph = paragraph.nextElementSibling;
      if (nextParagraph) {
        if (paragraph.classList.contains("expanded")) {
          nextParagraph.style.display = "block";
          button.classList.add("up");
        } else {
          nextParagraph.style.display = "none";
          button.classList.remove("up");

          hoverTriggers.forEach(function (hoverTrigger) {
            var contentId = hoverTrigger.getAttribute("data-content");
            if(contentId) {
              var hoverContent = document.getElementById(contentId);
              if(hoverContent) {
                hoverContent.classList.remove("active");
              }
            }
          });
        }
      }
    }

    // this is for expanding text in TOC

    function TOCExpand(button: any) {
      var tocEntry = button.parentNode;
      var tocParent = tocEntry.parentNode
      tocEntry.classList.toggle("expanded");
      var explainerText = tocParent.querySelector(".explainer-text");
      if (explainerText) {
        if (tocEntry.classList.contains("expanded")) {
          explainerText.style.display = "block";
          button.classList.add("up");
        } else {
          explainerText.style.display = "none";
          button.classList.remove("up");
        }
      }
    }
  }, [])

  return (
    <div style={fullScreenStyles}>
      <div id="content">
        <div className="flex-child left" style={{ color: 'black' }}>
          <span className="line1 invisible">Hello. Just a grown-up kid </span>
          <span id="bold" className="line1 invisible">(</span>
          <span className="flag line1 invisible">
            <img src={kid_face} id="funlogo" style={{ marginBottom: '-0.4em' }} alt="kid face" />
          </span>
          <span id="bold" className="line1 invisible">)</span>
          <span className="line2 invisible">figuring things out</span>
          <span className="line2 superscript invisible">1</span>
          <span className="line2 after_superscript invisible">.</span>
          <span className="line3 invisible">I grew up in a </span>
          <span className="line3 invisible myDIV direction">
            <a href="https://www.athensnews.com/news/campus/top-party-school-ranking-not-thrilling-ou-officials/article_6071ac97-72e6-5e88-9ac4-4b03a16d0daa.html">small Ohioan town </a>
          </span>
          <img src={athens} className="backgroundimage" style={{ marginLeft: '2em' }} alt="Athens Ohio" />
          <span className="flag line3 invisible">
            <img src= {appleimage} id="funlogo" style={{ height: '1.1em', marginBottom: '-0.1em' }} alt="apple" />
          </span>
          <span className="line4 invisible"> and went to school in Philly </span>
          <span className="flag line4 invisible">
            <img src={benfranklin} id="funlogo" style={{ height: '1.6em', marginBottom: '-0.5em' }} alt="ben franklin" />
          </span>
          <span className="line4 invisible"></span>
          <span className="line5 invisible"> where I studied people and $. I’ve lived in India</span>
          <span className="superscript line5 invisible">2</span>
          <span className="after_superscript line5 invisible">,</span>
          <span className="line6 invisible"> the UK</span>
          <span className="superscript line6 invisible">3</span>
          <span className="after_superscript line6 invisible">,</span>
          <span className="line7 invisible"> Morocco</span>
          <span className="superscript line7 invisible">4</span>
          <span className="after_superscript line7 invisible">,</span>
          <span className="line8 invisible"> and LA</span>
          <span className="superscript line8 invisible">5</span>
          <span className="flag line8 invisible">
            <img src={airplane} id="funlogo" style={{ height: '0.9em' }} alt="airplane" />
          </span>
          <span className="line9 invisible myDIV direction"> doing oddjobs</span>
          <img src="../assets/OddJob.jpg" className="backgroundimage" style={{ marginLeft: '4em', marginTop: '-4em', maxWidth: '4.5em', maxHeight: '3em' }} alt="OddJob" />
          <span className="superscript line9 invisible">6</span>
          <span className="line10 invisible"> but call NYC home where I work at Google. </span>
          <span className="flag line10 invisible">
            <img src={pointer} id="funlogo" style={{ height: '1.6em', marginBottom: '-0.5em' }} alt="finger pointing" />
          </span>
        </div>

        {/* Paragraph 2 */}
        <div className="flex-child right" style={{ color: 'black', marginLeft: '0.9em' }}>
          <span className="line11 invisible"> Ask me about </span>
          <span className="line11 invisible myDIV direction">AAPI activism,</span>
          <img src="../assets/yellow_peril.jpg" className="backgroundimage" style={{ marginLeft: '3em' }} alt="yellow peril" />
          <span className="line11 invisible"> nist propaganda </span>
          <span className="flag line11 invisible">
            <img src={Mao} id="funlogo" style={{ height: '1.7em', marginBottom: '-0.5em' }} alt="Mao" />
          </span>
          <span className="line12 invisible">, and Warren Buffet </span>
          <span className="flag line12 invisible">
            <img src={warren} id="funlogo" style={{ height: '1.4em', marginBottom: '-0.2em' }} alt="Warren Buffet" />
          </span>
          <span className="line13 invisible">. Right now:</span>
          <span className="line14 invisible myDIV direction"> pondering leftist edgelord culture </span>
          <img src="../assets/skater.gif" className="backgroundimage" style={{ marginLeft: '-3em', maxWidth: '4em', maxHeight: '3em' }} alt="skater" />
          <span className="superscript line13 invisible">7</span>
          <span className="flag line14 invisible">
            <img src={rad} id="funlogo" style={{ height: '1.2em', marginLeft: '-0.2em', marginBottom: '-0.2em' }} alt="rad" />
          </span>
          <span style={{ marginLeft: '-0.3em' }} className="line13 invisible"> ,</span>
          <span className="line15 invisible" style={{ marginTop: '-0.2em' }}> limping 26 miles, reading The Topeka School
            by Ben Lerner </span>
          <span className="flag line15 invisible">
            <img src={topeka} id="funlogo" style={{ height: '1.2em' }} alt="The Topeka School" />
          </span>
          <span className="line15 invisible">,</span>
          <span className="line16 invisible">unapologetically looking up</span>
          <span className="flag line16 invisible"></span>
          <img src={yorker} id="funlogo" style={{ height: '1.6em', marginBottom: '-0.4em' }} ></img>
          <span className="line17 invisible">crossword answers.</span>
        </div>
      </div>

      <div id="content" style={{ marginTop: '0.7em' }}>
        <div className="flex-child left">
          <img style={{ maxWidth: '93%' }} src={formulas1} alt="Formula 1" />
        </div>
        <div className="flex-child right">
          <img style={{ maxWidth: '100%' }} src={formulas2} alt="Formula 2" />
        </div>
      </div>
    </div>

  );
}

export default FrontPage;