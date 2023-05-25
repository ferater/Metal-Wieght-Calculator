import { selectNode } from "./selectNode.js";
import { addClass, removeClass } from "./classAddRmove.js";

//define const intensity
let intensity = 0;

//define dimensions object
const rectangleDimensions = {
  "rectangle-line-a": 0,
  "rectangle-line-b": 0,
  "rectangle-line-h": 0,
};

//define classNames
const selectedClassName = "selected";
const errorClassName = "error";
const correctClassName = "correct";
const showResultClassName = "show";

//select  mareial select
const mareialSelect = selectNode("select#material-select");
//select  mareial intensity text
const mareialIntensityText = selectNode(".material-intensity");
//add event material select
mareialSelect.addEventListener("change", selectMaterial);

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

//select show result div
const showResult = selectNode(".show-result");
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
      removeClass(input, errorClassName);
      removeClass(line, errorClassName);
      addClass(line, correctClassName);
    }
    indicatorText.innerHTML = `<span>${input.value} mm</span>`;
  };
});
/////////////////////////////////////////
function selectMaterial() {
  intensity = mareialSelect.value;
  mareialIntensityText.innerHTML = `<span>${intensity}</span>`;
  removeClass(mareialSelect, errorClassName);
}
///////////////////////////////////////////
function clearAll() {
  inputs.forEach((input) => {
    const line = selectNode(`.${input.id}`);
    const indicatorText = selectNode(`.indicator-${input.id}`);
    //remove mareialSelect error class
    removeClass(mareialSelect, errorClassName);
    //clear input values
    input.value = "";
    //clear input classes
    removeClass(input, selectedClassName);
    removeClass(input, errorClassName);
    removeClass(input, correctClassName);
    //clear line classes
    removeClass(line, selectedClassName);
    removeClass(line, errorClassName);
    removeClass(line, correctClassName);
    //clear line indicator texts
    indicatorText.innerHTML = `<span>0 mm</span>`;
    //clear show result
    showResult.innerHTML = `<span>0.00 Kg</span>`;
    removeClass(showResult, showResultClassName);
  });
  Object.keys(rectangleDimensions).forEach((key) => {
    rectangleDimensions[key] = 0;
  });
}
/////////////////////////////
function calculateWeight() {
  if (!intensity) {
    addClass(mareialSelect, errorClassName);
    return;
  }
  inputs.forEach((input) => {
    const line = selectNode(`.${input.id}`);
    const indicatorText = selectNode(`.indicator-${input.id}`);
    //set rectangleDimensions if input value correct
    if (input.value && input.value > 0) {
      rectangleDimensions[input.id] = input.value;
    } else {
      //add error class if input value not correct
      addClass(input, errorClassName);
      addClass(line, errorClassName);
      addClass(indicatorText, errorClassName);
    }
  });
  const [a, b, h] = Object.values(rectangleDimensions);
  if (!a || !b || !h) return;

  const result =
    (a / 1000) *
    (b / 1000) *
    h *
    intensity;

  if (result > 0) {
    showResult.innerHTML = `<span>${Number(result.toFixed(2))} Kg</span>`;
    addClass(showResult, showResultClassName);
  }
}

