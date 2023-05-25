/////////////////////////////////
//select node(s) function
const selectNode = (elementProp, all) => {
  if (all) {
    return document.querySelectorAll(elementProp);
  } else {
    return document.querySelector(elementProp);
  }
};

export { selectNode };
