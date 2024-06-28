function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco()

document.addEventListener("DOMContentLoaded", function () {
  var t = gsap.timeline();
  //navbar
  t.from("nav>#nav-logo, nav>ul>li, nav>#nav-icons>.icon-div, nav>.menu-container", {
    duration: 1,
    y: -100,
    opacity: 0,
    stagger: {
      amount: .5,
      from: "start"
    }
  });
  //section1-> h1
  t.from("#section1 h1", {
    duration: 2,
    scale: .5,
    opacity: 0,
    ease: "power3.out"
  }, "-=0.5");
  t.from("#section1 #bottom-des h2, #section1 #bottom-des h3", {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: {
      amount: .5,
      from: "start"
    }
  }, "-=1");

  // Pin section1
  ScrollTrigger.create({
    trigger: "#section1",
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
    scroller: "#main",
  });
});

// Section-2
// Image scroll, pagination, and button control
document.addEventListener('DOMContentLoaded', function () {
  const rightDiv = document.querySelector('#right-overflow');
  const leftBtn = document.querySelector('#left-btn');
  const rightBtn = document.querySelector('#right-btn');
  const counter = document.querySelector('.counter');
  const imgOuter = document.querySelectorAll('.img-outer');
  const total = imgOuter.length;
  let index = 0;

  function updateCounter() {
    counter.innerHTML = `${index + 1} / ${total}`;
    leftBtn.setAttribute('data-state', index === 0 ? 'disabled' : '');
    rightBtn.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
  }

  leftBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      rightDiv.scrollBy({
        left: -600,
        behavior: 'smooth'
      });
      updateCounter();
    }
  });

  rightBtn.addEventListener('click', () => {
    if (index < total - 1) {
      index++;
      rightDiv.scrollBy({
        left: 600,
        behavior: 'smooth'
      });
      updateCounter();
    }
  });

  // Image hover animation
  imgOuter.forEach(imgOuter => {
    const img = imgOuter.querySelector('img');
    const staticSrc = img.src;
    const gifSrc = img.getAttribute('data-gif');

    img.addEventListener('mouseover', () => {
      img.src = gifSrc;
    });

    img.addEventListener('mouseout', () => {
      img.src = staticSrc;
    });
  });

  updateCounter();
});


// Section-3
Shery.imageEffect("#back", { style: 5, config: { "a": { "value": 1.49, "range": [0, 30] }, "b": { "value": -0.98, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 1.9793814432989691 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": false }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.59, "range": [0, 10] }, "metaball": { "value": 0.15, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.46, "range": [0, 2] }, "noise_scale": { "value": 16.03, "range": [0, 100] } }, gooey: true });

var elems = document.querySelectorAll(".elem");

elems.forEach(function (elem) {
  var h1s = elem.querySelectorAll("h1");
  var index = 0;
  var animating = false;

  document.querySelector("#section4")
    .addEventListener("click", function () {
      if (!animating) {
        animating = true;
        gsap.to(h1s[index], {
          top: '-=100%',
          ease: Expo.easeInOut,
          duration: 1,
          onComplete: function () {
            gsap.set(this._targets[0], { top: "100%" });
            animating = false;
          },
        });
        index === h1s.length - 1 ? (index = 0) : index++;

        gsap.to(h1s[index], {
          top: "-=100%",
          ease: Expo.easeInOut,
          duration: 1,
        });
      }
    });
});





// Mobile view JS adjustments
if (window.innerWidth > 320) {
  // Section-2 video scale up
  gsap.timeline({
    scrollTrigger: {
      trigger: "#section2",
      start: "top bottom",
      end: "top top",
      scrub: true,
      scroller: "#main",
    }
  })
    .to("#section2 video", {
      scale: 1,
      ease: "none"
    });


  // Section-3
  gsap.timeline({
    scrollTrigger: {
      trigger: "#section3",
      start: `-80% top`,
      end: `5% top`,
      scrub: true,
      scroller: "#main",
    }
  })
    .from("#section3 #wrap #left h1 ", {
      y: `100`,
      opacity: 0
    });

  // Section-4
  gsap.timeline({
    scrollTrigger: {
      trigger: "#section4",
      start: `-150% top`,
      end: `10% top`,
      scrub: true,
      scroller: "#main",
    }
  })
    .from("#section4 #text .elem h1", {
      speed: .1,
      y: `500`,
      opacity: 0
    });


  //   Section-5
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section5>#top",
      start: `-300% top`,
      end: `50% top`,
      scrub: 1,
      duration: 3,
      scroller: `#main`,
    }
  })
  tl.from("#section5>#top>h2", {
    bottom: `-20%`,
    opacity: 0
  })
  tl.from("#section5>#top>h1", {
    bottom: `-20%`,
    opacity: 0
  })
  tl.from("#section5>#top>h3", {
    bottom: `-20%`,
    opacity: 0
  })
  tl.to("#section5>#vid-div",
    {
      scale: 1,

    })

  // Section-6 pin and text animation
  ScrollTrigger.create({
    trigger: "#section6",
    start: "top top",
    end: "+=500%",
    pin: true,
    pinSpacing: false,
    scroller: "#main",
  });
  var t12 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section6",
      start: `-50% top`,
      end: `10% top`,
      scrub: 1,
      duration: 1,
      scroller: `#main`,
    }
  });
  t12.from("#section6 #h1-wrap h1", {
    duration: 1,
    y: `40`,
    opacity: 0,
    stagger: {
      amount: 1.5,
      from: "start"
    }
  });

  // Section6 Box images animation
  var tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: "#box1",
      start: `-50% top`,
      end: `10% top`,
      scrub: 1,
      duration: 1,
      delay: -3,
      scroller: `#main`,
    }
  });
  tl3.from("#box1>.img-wrap", {
    x: `-40%`,
    opacity: 0
  });

  var tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: "#box2",
      start: `-50% top`,
      end: `10% top`,
      scrub: 1,
      duration: 1,
      delay: -3,
      scroller: `#main`,
    }
  });
  tl4.from("#box2>.img-wrap", {
    x: `40%`,
    opacity: 0
  });

  var tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: "#box3",
      start: `-50% top`,
      end: `10% top`,
      scrub: 1,
      duration: 1,
      delay: -3,
      scroller: `#main`,
    }
  });
  tl5.from("#box3>.img-wrap", {
    x: `-40%`,
    opacity: 0
  });

  var tl6 = gsap.timeline({
    scrollTrigger: {
      trigger: "#box4",
      start: `-50% top`,
      end: `10% top`,
      scrub: 1,
      duration: 1,
      delay: -3,
      scroller: `#main`,
    }
  });
  tl6.from("#box4>.img-wrap", {
    x: `40%`,
    opacity: 0
  });

  // Section-7 page-1 animation
  var tl7 = gsap.timeline({
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top top",
      end: "top -200%",
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    }
  });
  tl7.to("#page1 h1, #page1 .media-wrap", {
    x: '-300%',
    ease: "power2.inOut",
  });

  //page-2
  var tl8 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section7>#page2",
      start: `-60% top`,
      end: `5% top`,
      scrub: 1,
      duration: 1,
      scroller: `#main`,
    }
  })
  tl8.from("#section7>#page2>h1", {
    y: `20%`,
    opacity: 0
  })
  tl8.from("#section7>#page2>#logo-main>.logo-img", {
    y: "20%",
    opacity: 0,
    duration: 1,
    stagger: {
      amount: 1.5,
      from: "start"
    }
  });

  // page-3
  var tl9 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section7>#page3",
      start: `-80% top`,
      end: `5% top`,
      scrub: 1,
      scroller: `#main`,
    }
  });
  tl9.from("#section7 #page3>h1", {
    duration: 1,
    y: `20%`,
    opacity: 0
  });
  tl9.from("#page3 .same:nth-child(2)", {
    duration: 1,
    x: "-20%",
    opacity: 0
  }, 0);
  tl9.from("#page3 .same:nth-child(4)", {
    duration: 1,
    x: "20%",
    opacity: 0
  }, 0);
  tl9.from("#page3 #middle", {
    duration: 1,
    y: "20%",
    opacity: 0
  }, 0);


  //page-4
  var tl10 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section7>#page4",
      start: `-100% top`,
      end: `-70% top`,
      scrub: 1,
      scroller: `#main`,
    }
  })
  tl10.from("#section7>#page4>.content", {
    y: "20%",
    opacity: 0,
    duration: 1,
    stagger: {
      amount: 1,
      from: "start"
    }
  });


  //page-5
  var tl11 = gsap.timeline({
    scrollTrigger: {
      trigger: "#section7>#page5",
      start: `-100% top`,
      end: `0% top`,
      scrub: 1,
      duration: 1,
      scroller: `#main`,
    }
  })
  tl11.from("#section7>#page5", {
    opacity: 0.6,
    duration: 3
  })
  tl11.from("#section7>#page5>#links>#links-left, #section7>#page5>#links>#links-main>ul, #section7>#page5>#mid-loop ,#section7>#page5>footer", {
    y: "20%",
    opacity: 0,
    duration: 1,
    stagger: {
      amount: 1.3,
      from: "start"
    }
  }, "0.5");

}

