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
  
  mainTL
        .set(".ballCont", {y:120})
        .from('.capOneLogo', 0.4,{x:"-=232", ease:'power1.out', overwrite:0}, 0.25)
        .from(redSwoop, 0.25,{alpha:0, scale:"4", x:"-=30", y:"+=40", transformOrigin:"100% 50%", ease:'power1.out', overwrite:0}, 0.5)
        .from(capital, 0.25,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, 0.5)
        .from(one, 0.25,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, 0.55)


        .to(".ballCont", 1.5, {y:0, ease: "power1.inOut",}, "0")
        .to('.ballCont #ball', 0.3,{y:"+=5", repeat: 1, yoyo: true, ease: "power1.in"}, ">")
        .to('.ballCont', 2,{rotation:-20, yoyo:true, repeat:3, ease:"sine.inOut"}, ">-=0.2")

        
        // .to('.ballCont #ballShadow', 0.3,{y:"+=15", ease:"power1.in", yoyo:true, repeat:13}, _f1+0.5)
        // .to('.ballCont #ball', 0.3,{x:"+=2", yoyo:true, repeat:13, ease:"sine.inOut"}, _f1+0.5)

        
}

function vidPosterClick(){
  gsap.to(vidPoster, 0.1,{autoAlpha:0, ease:Power2.easeOut});
  video1[0].play();
  video1[0].muted = false;
}

function expand(){
  
    expandedTL
    // .set(".ballContExp", {y:600})
              
              .to(banner, 0,{css:{overflow:"visible"}}, 0)
              .from('.videoCont', 0.2,{alpha:0}, _f1+0.15)
              .from('.capOneLogo', 0.4,{x:"-=232", ease:'power1.out', overwrite:0}, _f1-0.2)
              .from(txt2a, 0.5,{alpha:0, ease:'power2.easeInOut', overwrite:0}, _f1)

              .from(expRedSwoop, 0.4,{autoAlpha:0, scale:"2", x:"-=60", y:"+=8", transformOrigin:"50% 50%", ease:'power1.out', overwrite:0,}, _f1)
              .from(expCapital, 0.4,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, _f1)
              .from(expOne, 0.4,{alpha:0, y:"+=10", ease:'power1.inOut', overwrite:0}, _f1+0.05)
              
              .to('.ballContExp', 0.5,{autoAlpha:1}, _f1+0.5)
            .to('.ballContExp', 5,{x:"+=274", ease:"sine.out"}, _f1+0.5)

            .to('.ballContExp #ball2', 1,{y:"+=130", ease:"power1.inOut", yoyo:true, repeat:4}, _f1+0.5)
            .to('.ballContExp #ball2Shadow', 1,{y:"+=120", alpha:1, ease:"power1.inOut", yoyo:true, repeat:4}, _f1+0.5)

            .to('.ballContExp #ball2', 0.3,{x:"+=2", yoyo:true, repeat:4, ease:"sine.inOut"}, _f1+0.5)

            // .to('.ballContExp', 2,{rotation:-20, transformOrigin: "center center", yoyo:true, repeat:1, ease:"sine.inOut"}, "<5")
              
            
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