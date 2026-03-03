var mainTL = gsap.timeline();
var cardTL = gsap.timeline();
var vidPoster, video1;
var isExpanded = false;
var swaySpeed = 3;
var _f1 = 0.25;
var SPLASH_ALT_DEFAULT = 2; // Options: 1, 2, 3
var SPLASH_ALT_EXPANDED = 2; // Options: 1, 2, 3

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
  resetCoffeeState("#coffee");
  resetSplashFx("#splashFx");

  mainTL.from(redSwoop, 0.35,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1)
        .from(capital, 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.02')
        .from(one, 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.04')

        .from("#rArrowExp", 0.5, {alpha:0, x:"-=10", ease:'power1.inOut', overwrite:0}, '<')

        .to("#ball", { duration: 2, x: 657, ease: "none" }, 0)
        .to("#ball", {duration: 1, y: -40, ease: "power1.out", yoyo: true, repeat: 1}, 0)
        .add(buildCoffeeSplash("#coffee", "#splashFx", SPLASH_ALT_DEFAULT), ">-0.12")

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
  resetCoffeeState("#expCoffee");
  resetSplashFx("#expSplashFx");
  cardTL.timeScale(1.5);
  cardTL.from('.expCapOneLogo #redSwoop', 0.35,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1+0.2)
        .from('.expCapOneLogo #capital', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.02')
        .from('.expCapOneLogo #one', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+0.04')

        .to("#expBall", { duration: 2, x: 270, ease: "none" }, 0)
        .to("#expBall", { duration: 1, y: -40, ease: "power1.out", yoyo: true, repeat: 1 }, 0)
        .add(buildCoffeeSplash("#expCoffee", "#expSplashFx", SPLASH_ALT_EXPANDED),">-0.12")

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

function resetCoffeeState(target){
  gsap.set(target, {
    autoAlpha: 0,
    x: 9,
    y: 10,
    scaleX: 0.32,
    scaleY: 0.18,
    rotation: 8,
    skewX: 0,
    filter: "blur(0px)",
    transformOrigin: "72% 82%"
  });
}

function resetSplashFx(fxTarget){
  gsap.set(fxTarget + " .splashDrop", { autoAlpha: 0, scale: 0.25, x: 0, y: 0, filter: "blur(0px)" });
  gsap.set(fxTarget + " .splashRing", { autoAlpha: 0, scaleX: 0.35, scaleY: 0.35, y: 0, filter: "blur(0px)" });
}

function buildCoffeeSplash(target, fxTarget, alt){
  var splashTL = gsap.timeline();
  var drops = fxTarget + " .splashDrop";
  var ring = fxTarget + " .splashRing";

  if (alt === 1) {
    splashTL
      .set(drops, { autoAlpha: 0, scale: 0.22, x: 0, y: 0, filter: "blur(0px)" }, 0)
      .set(ring, { autoAlpha: 0, scaleX: 0.35, scaleY: 0.35, y: 0 }, 0)
      .set(target, { autoAlpha: 1 })
      .to(target, { duration: 0.18, x: 0, y: -5, scaleX: 1.18, scaleY: 1.28, rotation: -5, skewX: -6, filter: "blur(1.3px)", ease: "power3.out" })
      .to(target, { duration: 0.22, x: -2, y: 3, scaleX: 0.9, scaleY: 0.84, rotation: 2.2, skewX: 3, filter: "blur(0px)", ease: "sine.inOut" })
      .to(target, { duration: 0.28, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, ease: "power2.out" });
    splashTL
      .to(ring, { duration: 0.28, autoAlpha: 0.7, scaleX: 1.18, scaleY: 0.96, y: 1, filter: "blur(0.7px)", ease: "power2.out" }, 0.09)
      .to(ring, { duration: 0.22, autoAlpha: 0, scaleX: 1.55, scaleY: 1.05, y: 2, filter: "blur(1.2px)", ease: "power1.out" }, 0.37)
      .to(fxTarget + " .dropA", { duration: 0.32, autoAlpha: 0.95, x: -16, y: -14, scale: 0.72, filter: "blur(0.4px)", ease: "power2.out" }, 0.11)
      .to(fxTarget + " .dropB", { duration: 0.33, autoAlpha: 0.95, x: -4, y: -20, scale: 0.78, filter: "blur(0.4px)", ease: "power2.out" }, 0.09)
      .to(fxTarget + " .dropC", { duration: 0.34, autoAlpha: 0.9, x: 13, y: -13, scale: 0.7, filter: "blur(0.4px)", ease: "power2.out" }, 0.1)
      .to(drops, { duration: 0.22, autoAlpha: 0, y: "+=12", scale: 0.42, filter: "blur(1px)", ease: "power1.in" }, 0.44);
    return splashTL;
  }

  if (alt === 3) {
    splashTL
      .set(drops, { autoAlpha: 0, scale: 0.24, x: 0, y: 0, filter: "blur(0px)" }, 0)
      .set(ring, { autoAlpha: 0, scaleX: 0.35, scaleY: 0.35, y: 0 }, 0)
      .set(target, { autoAlpha: 1 })
      .to(target, { duration: 0.15, x: -2, y: -6, scaleX: 1.22, scaleY: 1.34, rotation: -7, skewX: -8, filter: "blur(1.6px)", ease: "power4.out" })
      .to(target, { duration: 0.12, x: 3, y: 2, scaleX: 0.88, scaleY: 0.8, rotation: 2.8, skewX: 4.3, filter: "blur(0.4px)", ease: "power2.inOut" })
      .to(target, { duration: 0.14, x: -1.3, y: -0.8, scaleX: 1.08, scaleY: 1.05, rotation: -1, skewX: -1.7, ease: "sine.inOut" })
      .to(target, { duration: 0.24, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, filter: "blur(0px)", ease: "power2.out" });
    splashTL
      .to(ring, { duration: 0.22, autoAlpha: 0.8, scaleX: 1.25, scaleY: 1, y: 1, filter: "blur(0.8px)", ease: "power2.out" }, 0.08)
      .to(ring, { duration: 0.2, autoAlpha: 0, scaleX: 1.7, scaleY: 1.07, y: 2, filter: "blur(1.3px)", ease: "power1.out" }, 0.32)
      .to(fxTarget + " .dropA", { duration: 0.29, autoAlpha: 1, x: -18, y: -16, scale: 0.75, filter: "blur(0.4px)", ease: "power2.out" }, 0.08)
      .to(fxTarget + " .dropB", { duration: 0.31, autoAlpha: 0.95, x: -2, y: -24, scale: 0.82, filter: "blur(0.5px)", ease: "power2.out" }, 0.08)
      .to(fxTarget + " .dropC", { duration: 0.3, autoAlpha: 0.95, x: 15, y: -14, scale: 0.74, filter: "blur(0.4px)", ease: "power2.out" }, 0.1)
      .to(drops, { duration: 0.22, autoAlpha: 0, y: "+=13", scale: 0.38, filter: "blur(1px)", ease: "power1.in" }, 0.4);
    return splashTL;
  }

  splashTL
    .set(drops, { autoAlpha: 0, scale: 0.24, x: 0, y: 0, filter: "blur(0px)" }, 0)
    .set(ring, { autoAlpha: 0, scaleX: 0.35, scaleY: 0.35, y: 0 }, 0)
    .set(target, { autoAlpha: 1 })
    .to(target, { duration: 0.16, x: -1, y: -5, scaleX: 1.18, scaleY: 1.26, rotation: -5.5, skewX: -6, filter: "blur(1.2px)", ease: "power3.out" })
    .to(target, { duration: 0.15, x: 2, y: 2, scaleX: 0.9, scaleY: 0.83, rotation: 2, skewX: 2.8, filter: "blur(0.4px)", ease: "power1.inOut" })
    .to(target, { duration: 0.12, x: -0.8, y: -0.8, scaleX: 1.05, scaleY: 1.03, rotation: -0.7, skewX: -1.1, ease: "sine.inOut" })
    .to(target, { duration: 0.28, x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, filter: "blur(0px)", ease: "power2.out" });
  splashTL
    .to(ring, { duration: 0.24, autoAlpha: 0.75, scaleX: 1.2, scaleY: 0.98, y: 1, filter: "blur(0.7px)", ease: "power2.out" }, 0.09)
    .to(ring, { duration: 0.21, autoAlpha: 0, scaleX: 1.62, scaleY: 1.06, y: 2, filter: "blur(1.2px)", ease: "power1.out" }, 0.34)
    .to(fxTarget + " .dropA", { duration: 0.31, autoAlpha: 0.95, x: -15, y: -15, scale: 0.72, filter: "blur(0.4px)", ease: "power2.out" }, 0.1)
    .to(fxTarget + " .dropB", { duration: 0.33, autoAlpha: 0.95, x: -3, y: -22, scale: 0.8, filter: "blur(0.5px)", ease: "power2.out" }, 0.08)
    .to(fxTarget + " .dropC", { duration: 0.32, autoAlpha: 0.95, x: 14, y: -14, scale: 0.72, filter: "blur(0.4px)", ease: "power2.out" }, 0.1)
    .to(drops, { duration: 0.22, autoAlpha: 0, y: "+=12", scale: 0.4, filter: "blur(1px)", ease: "power1.in" }, 0.42);

  return splashTL;
}

window.onload=init;
