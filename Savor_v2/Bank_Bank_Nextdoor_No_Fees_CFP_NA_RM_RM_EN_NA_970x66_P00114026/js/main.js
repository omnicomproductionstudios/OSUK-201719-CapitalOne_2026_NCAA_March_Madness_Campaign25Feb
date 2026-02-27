var mainTL = gsap.timeline();
var cardTL = gsap.timeline();
var vidPoster, video1;
var isExpanded = false;
var swaySpeed = 3;
var _f1 = 0.25;

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

  mainTL.from(redSwoop, 0.25,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1)
        .from(capital, 0.25,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.02')
        .from(one, 0.25,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.04')

        .from(txt1a, 0.4,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<')
        .from(".ctaCont", 0.5, {alpha:0, x:"-=10", ease:'power1.inOut', overwrite:0}, '<')

        .to("#ball", { duration: 2, x: 877, ease: "none" }, 0)
        .to("#ball", {duration: 1, y: -30, ease: "power1.out", yoyo: true, repeat: 1}, 0)
        .to("#coffee", {duration: 0.45, scale:1, autoAlpha:1, ease: "power4.out" },">-0.1")

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
  gsap.set("#expBall", { x: -200, y: 149, rotation: 0 });
  gsap.set("#expCoffee", { scale:0, autoAlpha:0 });
  cardTL.timeScale(1.5);
  cardTL.from('.expCapOneLogo #redSwoop', 0.35,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1+0.2)
        .from('.expCapOneLogo #capital', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.02')
        .from('.expCapOneLogo #one', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.04')

        .from('.txt2a', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<')
        .from('.txt2b', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<+0.1')
        .from('#rArrowExp', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<+0.1')

        .to("#expBall", { duration: 2, x: 337, ease: "none" }, 0)
        .to("#expBall", { duration: 1, y: -40, ease: "power1.out", yoyo: true, repeat: 1 }, 0)
        .to("#expCoffee", { duration: 0.45, scale:1, autoAlpha:1, ease: "power3.out" },">-0.1")

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
