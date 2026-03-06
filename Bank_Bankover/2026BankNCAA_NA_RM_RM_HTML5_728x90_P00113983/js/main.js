var mainTL = gsap.timeline();
var expandedTL = gsap.timeline();
var videoPlayTL = gsap.timeline();
var vidPoster, video1;
var _f1 = 0.25,
    _f2 = 2.75,
    _f3 = 5.25,
    _f4 = 7.75,
    _f5 = 10.25;



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

  banner.addEventListener('mouseenter', onmouseenter);
  banner.addEventListener('mouseleave', onmouseleave);

  document.getElementById('cover').style.display = "none";
  
  video1.on("ended", function() {
    gsap.to(vidPoster, 0.4,{autoAlpha:1, ease:Power2.easeOut})
    
  }); 

  mainTL.from('.capOneLogo', 0.4,{x:"-=232", ease:'power1.out', overwrite:0}, 0.25)
        .from(redSwoop, 0.25,{alpha:0, scale:"4", x:"-=30", y:"+=40", transformOrigin:"100% 50%", ease:'power1.out', overwrite:0}, 0.5)
        .from(capital, 0.25,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, 0.5)
        .from(one, 0.25,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, 0.55)

        
        .from('.ballCont', 3,{x:"-=1030", ease: "none"}, _f1+0.5)  
        .to('.ballCont #ball', 0.2,{y:"+=25", ease: "power1.in", yoyo:true, repeat:20}, _f1+0.5)  
        .to('.ballCont #ballShadow', 0.2,{alpha:1, scaleX:2, transformOrigin:"50% 50%", ease: "power1.in", yoyo:true, repeat:20}, _f1+0.5)  
        .from('.ballCont #ball', 3,{rotation:"-=1030", ease: "none"}, _f1+0.5)  
        .from(txt1Cont, 2.95,{x:"-=970", ease:'none'}, _f1+0.55)
        .from(txt1a, 2.95,{x:"+=970", ease:'none'}, _f1+0.55)
}

function vidPosterClick(){
  gsap.to(vidPoster, 0.1,{autoAlpha:0, ease:Power2.easeOut});
  video1[0].play();
  video1[0].muted = false;
}

function expand(){
  
    expandedTL.to(banner, 0,{css:{overflow:"visible"}}, 0)
              .from('.videoCont', 0.2,{alpha:0}, _f1+0.15)
              .from('.capOneLogo', 0.4,{x:"-=232", ease:'power1.out', overwrite:0}, _f1-0.2)
              .from(txt2a, 0.5,{alpha:0, x:"+=25", ease:'power2.easeInOut', overwrite:0}, _f1)
              .from(txt2b, 0.5,{alpha:0, x:"+=25", ease:'power2.easeInOut', overwrite:0}, '<+=0.05')
              .from(txt2c, 0.5,{alpha:0, x:"+=25", ease:'power2.easeInOut', overwrite:0}, '<+=0.05')

              .from(expRedSwoop, 0.4,{autoAlpha:0, scale:"2", x:"-=60", y:"+=8", transformOrigin:"50% 50%", ease:'power1.out', overwrite:0,}, _f1)
              .from(expCapital, 0.4,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, _f1)
              .from(expOne, 0.4,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, _f1+0.05)

              .from('.ballContExp #ball2', 1.5,{x:"-=350", rotation:"-=620", ease: "none"}, _f1+0.5)
              .from('.ballContExp #ball2Shadow', 1.5,{x:"-=350", ease: "none"}, _f1+0.5)
              .from('.ncaaLockupCont', 2,{x:"-=283", ease: "none"}, _f1+0.5)
              .from(proudPartnerOf, 2,{x:"+=283", ease: "none"}, _f1+0.5)
              .from(exprArrow, 0.4,{alpha:0, x:"-=15", ease: "none"}, '<+=1.5')
                 
      expandedTL.restart();
      gsap.to(ball, {css:{transform:"unset"}},0);
    }
function contract(){
  gsap.to(ball, {css:{transform:"unset"}},0.2);
  gsap.to(vidPoster, {autoAlpha:1});
  
  mainTL.restart();
}

function onmouseenter(){
  gsap.to(rArrow, 0.2, {x:10, ease:'power3.out'})
  gsap.to(exprArrow, 0.2, {x:10, ease:'power3.out'})
}
function onmouseleave(){
  gsap.to(rArrow, 0.2, {x:0, ease:'power3.out'})
  gsap.to(exprArrow, 0.2, {x:0, ease:'power3.out'})
}

window.onload=init;