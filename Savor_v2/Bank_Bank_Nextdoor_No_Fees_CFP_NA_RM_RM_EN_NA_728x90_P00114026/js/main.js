var mainTL = gsap.timeline();
var cardTL = gsap.timeline();
var vidPoster, video1;
var isExpanded = false;
var swaySpeed = 3;
var _f1 = 0.25;
var COLLAPSED_SPLASH_VARIANT = 1;
var EXPANDED_SPLASH_VARIANT = 1;

function createSplashTL(coffeeSelector, cupSelector, variant){
  var splashTL = gsap.timeline();
  gsap.set(coffeeSelector, { autoAlpha: 0, transformOrigin: "86% 92%" });
  gsap.set(cupSelector, { transformOrigin: "100% 100%" });

  if(variant === 1){
    splashTL.fromTo(coffeeSelector,
      { scaleX: 0.58, scaleY: 0.42, y: 8, x: 3, rotation: -8, autoAlpha: 0 },
      { duration: 0.22, scaleX: 1.03, scaleY: 0.95, y: -2, x: -0.8, rotation: 1.6, autoAlpha: 1, ease: "power2.out" }
    )
    .to(coffeeSelector, { duration: 0.16, scaleX: 0.97, scaleY: 1.04, y: 1.2, x: 0.4, rotation: -1.2, ease: "sine.inOut" })
    .to(coffeeSelector, { duration: 0.2, scaleX: 1, scaleY: 1, y: 0, x: 0, rotation: 0, autoAlpha: 0.98, ease: "power2.out" })
    .to(cupSelector, { duration: 0.14, rotation: -0.9, y: -0.4, ease: "power1.out" }, 0)
    .to(cupSelector, { duration: 0.18, rotation: 0, y: 0, ease: "sine.out" }, 0.14);
  } else if(variant === 2){
    splashTL.fromTo(coffeeSelector,
      { scaleX: 0.5, scaleY: 0.34, y: 10, x: 4, rotation: -10, autoAlpha: 0 },
      { duration: 0.24, scaleX: 1.06, scaleY: 0.93, y: -3, x: -1.1, rotation: 2.1, autoAlpha: 1, ease: "power3.out" }
    )
    .to(coffeeSelector, { duration: 0.15, scaleX: 0.95, scaleY: 1.07, y: 1.8, x: 0.7, rotation: -1.6, ease: "sine.inOut" })
    .to(coffeeSelector, { duration: 0.14, scaleX: 1.02, scaleY: 0.99, y: -0.4, x: 0, rotation: 0.5, ease: "sine.inOut" })
    .to(coffeeSelector, { duration: 0.2, scaleX: 1, scaleY: 1, y: 0, x: 0, rotation: 0, autoAlpha: 0.98, ease: "power2.out" })
    .to(cupSelector, { duration: 0.1, rotation: -1, y: -0.4, ease: "power1.out" }, 0)
    .to(cupSelector, { duration: 0.16, rotation: 0.35, y: 0.1, ease: "sine.inOut" }, 0.1)
    .to(cupSelector, { duration: 0.18, rotation: 0, y: 0, ease: "sine.out" }, 0.26);
  } else {
    splashTL.fromTo(coffeeSelector,
      { scaleX: 0.48, scaleY: 0.36, y: 9, x: 3.8, rotation: -9, autoAlpha: 0 },
      { duration: 0.2, scaleX: 1.02, scaleY: 0.96, y: -2.6, x: -0.5, rotation: 1.6, autoAlpha: 1, ease: "power2.out" }
    )
    .to(coffeeSelector, { duration: 0.35, scaleX: 1, scaleY: 1, y: 0, x: 0, rotation: 0, autoAlpha: 0.98, ease: "elastic.out(1, 0.38)" })
    .to(cupSelector, { duration: 0.1, rotation: -0.9, y: -0.3, ease: "power2.out" }, 0)
    .to(cupSelector, { duration: 0.2, rotation: 0, y: 0, ease: "power1.out" }, 0.1);
  }

  return splashTL;
}

function init(){
  myFT.on('expand', expand);
  myFT.on('contract', contract);
  video1 = myFT.$("#video1");
  var expandClick = myFT.$(".clickthrough");
  var ctaClick = myFT.$(".cta");
  myFT.applyClickTag(expandClick, 1);
  myFT.applyClickTag(video1, 1);
  myFT.applyClickTag(ctaClick, 1);

  vidPoster = document.getElementById('vidPoster');
  banner = document.getElementById('banner');
  vidPoster.addEventListener('click', vidPosterClick);
  banner.addEventListener('mouseenter', onMouseEnter);
  banner.addEventListener('mouseleave', onMouseLeave);

  document.getElementById('cover').style.display = "none";
  
  video1.on("ended", function() {
    gsap.to(vidPoster, 0.4,{autoAlpha:1, ease:Power2.easeOut})
    
  });


  gsap.set("#ball", { x: -140, y: 0, rotation: 0 });
  gsap.set("#coffee", { scale:0, autoAlpha:0 });
  gsap.set("#cup", { rotation:0, y:0 });

  mainTL.from(redSwoop, 0.35,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1)
        .from(capital, 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.02')
        .from(one, 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.04')

        // .to(txt1a, 0.4,{ease:'power1.inOut'}, '<')
        .from("#rArrowExp", 0.5, {alpha:0, x:"-=10", ease:'power1.inOut', overwrite:0}, '<')

        .to("#ball", { duration: 2, x: 657, ease: "none" }, 0)
        .to("#ball", {duration: 1, y: -40, ease: "power1.out", yoyo: true, repeat: 1}, 0)
        .to("#ball", {duration: 0.12, scaleX: 1.14, scaleY: 0.86, ease: "power1.out"}, 1.82)
        .to("#ball", {duration: 0.2, scaleX: 1, scaleY: 1, ease: "sine.out"}, 1.94)
        .add(createSplashTL("#coffee", "#cup", COLLAPSED_SPLASH_VARIANT), ">-0.12")

        .call(onMouseEnter, null, '>+2')
        .call(onMouseLeave, null, '>+1');
}

function vidPosterClick(){
  gsap.to(vidPoster, 0.2,{autoAlpha:0, ease:Power2.easeOut, onComplete:function(){
    video1[0].play();
    video1[0].muted = false;}
  });
}

function expand(){
  isExpanded = true;
  cardTL.clear();
  gsap.set("#expBall", { x: -140, y: 156, rotation: 0 });
  gsap.set("#expCoffee", { scale:0, autoAlpha:0 });
  gsap.set("#expCup", { rotation:0, y:0 });
  cardTL.timeScale(1.5);
  cardTL.from('.expCapOneLogo #redSwoop', 0.35,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1+0.2)
        .from('.expCapOneLogo #capital', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.02')
        .from('.expCapOneLogo #one', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.04')

        .to("#expBall", { duration: 2, x: 270, ease: "none" }, 0)
        .to("#expBall", { duration: 1, y: -40, ease: "power1.out", yoyo: true, repeat: 1 }, 0)
        .to("#expBall", {duration: 0.12, scaleX: 1.14, scaleY: 0.86, ease: "power1.out"}, 1.82)
        .to("#expBall", {duration: 0.2, scaleX: 1, scaleY: 1, ease: "sine.out"}, 1.94)
        .add(createSplashTL("#expCoffee", "#expCup", EXPANDED_SPLASH_VARIANT), ">-0.12")

  gsap.delayedCall(3, onMouseEnter);
  gsap.delayedCall(3.5, onMouseLeave);
}
function contract(){
  isExpanded = false;
  gsap.set(vidPoster, {autoAlpha:1});
  mainTL.restart();
}

function onMouseEnter(){
  gsap.to(rArrow, 0.2,{x:"5", ease:'power1.inOut'});
  gsap.to(rArrowExp, 0.2,{x:"5", ease:'power1.inOut'});
}
function onMouseLeave(){
  gsap.to(rArrow, 0.2,{x:"0", ease:'power1.inOut'});
  gsap.to(rArrowExp, 0.2,{x:"0", ease:'power1.inOut'});
}

window.onload=init;
