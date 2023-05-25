////////////////
//add class function
const addClass = (element, className) => {
    if (!element.classList.contains(className)) {
      element.classList.add(className);
    }
  }
  ////////////////////
  //remove class function
  const removeClass = (element, className) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  }
  
  export {addClass, removeClass}