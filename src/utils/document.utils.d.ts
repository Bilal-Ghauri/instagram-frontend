export const handleHideSideBar = (elementId) => {
  let fullScreenAbsoluter = document.getElementById("full-screen-absoluter");
  let element = document.getElementById(elementId);

  fullScreenAbsoluter?.classList.add("hidden");
  fullScreenAbsoluter?.classList.remove("z-[20]");
  fullScreenAbsoluter?.classList.add("z-[50]");

  if (elementId == "sideBar") {
    if (element?.classList.contains("translate-x-0")) {
      element?.classList.remove("translate-x-0");
      element.classList.add('z-[5]')
      element.classList.remove("z-50")
      element?.classList.add("translate-x-[-110%]");
    }
  } else {
    if (element?.classList.contains("translate-x-0")) {
      element?.classList.remove("translate-x-0");
      element?.classList.add("translate-x-full");
      element.classList.add('z-[10]')
      element.classList.remove('z-50')
      setTimeout(() => {
      element?.classList.add('hidden')
        
      }, 200);
    }
  }
  
};

export const handleShowSideBar = (elementId) => {
  let fullScreenAbsoluter = document.getElementById("full-screen-absoluter");
  let element = document.getElementById(elementId);
  if (fullScreenAbsoluter?.classList.contains("hidden")) {
    fullScreenAbsoluter.classList.remove("hidden");
  }

  if (elementId == "sideBar") {
    if (element?.classList.contains("translate-x-[-110%]")) {
      element.classList.add("translate-x-0");
      element.classList.remove('z-[5]')
      element.classList.add("z-50")
      element.classList.remove("translate-x-[-110%]");
    }
    
  } else {
    if (element?.classList.contains("translate-x-full")) {
      element.classList.remove('z-[10]')
      element.classList.add('z-50')
      element.classList.add("translate-x-0");
      element.classList.remove("translate-x-full");
      element?.classList.remove('hidden')
    }
  }
};
