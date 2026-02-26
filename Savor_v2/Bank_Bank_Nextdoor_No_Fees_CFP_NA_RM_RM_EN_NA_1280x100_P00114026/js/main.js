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

  mainTL.from(redSwoop, 0.25,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1)
        .from(capital, 0.25,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.02')
        .from(one, 0.25,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.04')

        .from(txt1a, 0.4,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<')
        .from(".ctaCont", 0.5, {alpha:0, x:"-=10", ease:'power1.inOut', overwrite:0}, '<')
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

  cardTL.timeScale(1.5);
  cardTL.from('.expCapOneLogo #redSwoop', 0.35,{alpha:0, scale:4, x:"-=150", y:"+=50", ease:'power3.out'}, _f1+0.2)
        .from('.expCapOneLogo #capital', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.02')
        .from('.expCapOneLogo #one', 0.35,{alpha:0, y:"+=15", ease:'power3.out'}, '<+=0.04')

        .from('.txt2a', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<')
        .from('.txt2b', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<+0.1')
        .from('.txt2c', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<+0.1')
        .from('.ctaExpCont', 0.35,{alpha:0, x:"+=20", ease:'power1.inOut'}, '<+0.1')

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