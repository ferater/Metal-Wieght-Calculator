// select inputs
const inputs = selectNode("input.rectangle-input", true);
//select clear button
const clearButton = selectNode("button.clear");
//add click event clear button
clearButton.addEventListener("click", clearAll);
//select calculate button
const calculateButton = selectNode("button.calculate");
//add click event calculate button
calculateButton.addEventListener("click", calculateWeight);
//define dimensions object
const RectangleDimensions = {
  "line-a":0,
  "line-b":0,
  "line-h":0,
}
//define classNames
const selectedClassName = "selected";
const errorClassName = "error";
const correctClassName = "correct";
/////////////////////////////////////////
inputs.forEach((input) => {
  const line = selectNode(`.${input.id}`);
  const indicatorText = selectNode(`.indicator-${input.id}`);

  input.onfocus = () => {
    //clear unnecessary classes from lines & indicator texts
    removeClass(line, errorClassName);
    removeClass(line, correctClassName);
    removeClass(indicatorText, errorClassName);
    removeClass(indicatorText, correctClassName);
    //add selected class
    addClass(line, selectedClassName);
    addClass(indicatorText, selectedClassName);
  };
  ///////////////////////////////
  input.onblur = () => {
    //deselect indicator & line
    removeClass(line, selectedClassName);
    removeClass(indicatorText, selectedClassName);
    if (!input.value || input.value <= 0) {
      addClass(line, errorClassName);
    } else {
      addClass(line, correctClassName);
    }
  };
  /////////////////////////////
  input.oninput = () => {
    if (input.value <= 0) {
      removeClass(line, correctClassName);
      addClass(line, errorClassName);
    } else {
      removeClass(line, errorClassName);
      addClass(line, correctClassName);
    }
    indicatorText.innerHTML = `<span>${input.value} mm</span>`;
  };
});
/////////////////////////////////////////
function clearAll() {
  inputs.forEach((input) => {
    //clear input values
    input.value = "";
    //clear input classes
    removeClass(input, selectedClassName);
    removeClass(input, errorClassName);
    removeClass(input, correctClassName);
    //clear line classes
    const line = selectNode(`.${input.id}`)
    removeClass(line, selectedClassName);
    removeClass(line, errorClassName);
    removeClass(line, correctClassName);
    //clear line indicator texts
    const indicatorText = selectNode(`.indicator-${input.id}`)
    indicatorText.innerHTML = `<span>0 mm</span>`
    
  });
}
/////////////////////////////
function calculateWeight(){
  inputs.forEach(input=> {
    console.log(input.value);
  })
}
/////////////////////////////////
//select node(s) function
function selectNode(elementProp, all) {
  if (all) {
    return document.querySelectorAll(elementProp);
  } else {
    return document.querySelector(elementProp);
  }
}
////////////////
//add class function
function addClass(element, className) {
  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
}
//remove class function
function removeClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
}
