const Sticky = () => {
    const sidebar = document.querySelector('#sidebar');

    let lastScrollTop = 0;
    let scrollingDown;
    let isAbsolute = false;
    
    // let absolutePosition = 0;
    let windowTop;
    let sidebarTop;
    let windowBottom;
    let sidebarBottom;
    
    function checkScrollDirection() {
      if (lastScrollTop <= window.scrollY) {
        scrollingDown = true
      } else {
        scrollingDown = false
      }
      lastScrollTop = window.scrollY;
    }      
    
    function fixit(pos,top,bottom,isAb) {
    
      sidebar.style.position = pos;
      sidebar.style.top = top;
      sidebar.style.bottom = bottom;
      isAbsolute = isAb;
    }
    
    function scrolling() {
      //optional width check
      if (window.innerHeight <= sidebar.offsetHeight && window.innerWidth > 996) {
        checkScrollDirection();
        windowTop = window.scrollY;
        sidebarTop = sidebar.offsetTop;
        windowBottom = window.scrollY + window.innerHeight;
        sidebarBottom = sidebar.offsetHeight + sidebar.offsetTop;
    
        if(!scrollingDown && windowTop <= sidebarTop) {
          //fixToTop
          fixit("fixed",0,"unset",false)
        }
    
        if(scrollingDown && windowBottom >= sidebarBottom) {
          //fixToBottom
          fixit("fixed","unset",0,false)
        }
    
        if((!isAbsolute && Math.ceil(windowTop) > sidebarTop) || !isAbsolute && windowBottom< sidebarBottom) {
          //fixInPlace
          let absolutePosition = (Math.ceil(windowTop) + sidebar.offsetTop)+"px";
          fixit("absolute",absolutePosition,"unset",true)
        }
      }
    }
    
    window.addEventListener('scroll', scrolling);
}

export default Sticky;
