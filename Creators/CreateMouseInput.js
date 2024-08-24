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

  const setClickAsFalse = () => {
      click = false;
  }

  const getHolding = () => holding;
  const getClick = () => click;

  const getPosition = () => ({ x: position.x, y: position.y })


  canvas.addEventListener("mousemove", (ev) => {
    const _position = GetCursorPositionOnCanvas(canvas, ev);
    Object.assign(position, { x:_position.x, y: _position.y });
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

