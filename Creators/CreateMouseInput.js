import { CreateVector2, GetCursorPositionOnCanvas } from '../Utils.js';
import '../definitions.js';

/** 
 * @param {HTMLCanvasElement} canvas 
 * */
function CreateMouseInput(canvas)
{
  const position = CreateVector2();
  let click = false;
  let holding = false;

  const setHolding = (newValue = true) => {
    if (typeof(newValue) == "boolean") { holding = newValue; }
    else { DisplayErrorMessage("setHolding", "newValue", newValue); }
  }

  const setClickAsFalse = () => {
      click = false;
  }

  const getHolding = () => holding;
  const getClick = () => click;

  const getPosition = () => ({ x: position.x, y: position.y })


  canvas.addEventListener("mousemove", (ev) => {
    const _position = GetCursorPositionOnCanvas(canvas, ev);
    Object.assign(position, _position);
  })

  canvas.addEventListener("mousedown", () => {
    if (!holding)
    {
      click = true;
      holding = true
    }
  })

  canvas.addEventListener("mouseup", () => {
    if (holding)
    {
      holding = false;
      click = false;
    }
  })

  return { setClickAsFalse, getHolding, getClick, getPosition }
}

export default CreateMouseInput;

