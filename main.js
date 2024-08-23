import CreateBackground from './Creators/CreateBackground.js';
import CreateCursor from './Creators/CreateCursor';
import { GetCursorPositionOnCanvas } from './Utils.js';

/** @type {HTMLCanvasElement} */
const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

/** @type {HTMLButtonElement} */
const StartBtn = document.getElementById("Start");
/** @type {HTMLButtonElement} */
const StopBtn = document.getElementById("Stop");

let isRunning = false;
let currentFrame = 0;
let animationFrameId = 0;

const instancesManagersArr = [];

const cursor = CreateCursor();
function preload()
{
  gameCanvas.width = 256;
  gameCanvas.height = 144;
  ctx.imageSmoothingEnabled = false;

  const backgroundInsts = [];
  const cursorInsts = [];

  instancesManagersArr.push(backgroundInsts);
  instancesManagersArr.push(cursorInsts);

  const background = CreateBackground(gameCanvas);

  backgroundInsts.push(background);
  cursorInsts.push(cursor);

  gameCanvas.addEventListener("mousemove", (ev) => {
    const position = GetCursorPositionOnCanvas(gameCanvas, ev);
    cursor.setPosition(position);
  })

  gameCanvas.addEventListener("mousedown", () => {
    if (!cursor.getHolding())
    {
      cursor.setHolding(true);
      cursor.setClick(true);
    }
  })

  gameCanvas.addEventListener("mouseup", () => {
    if (cursor.getHolding())
    {
      cursor.setHolding(false);
      cursor.setClick(false);
    }
  })
}

let lastTime = 0;
let fps = 0;
function update(timestamp)
{
  if (lastTime != 0)
  {
    const deltaTime = (timestamp - lastTime) / 1000;

    fps = 1 / deltaTime;
  }

  lastTime = timestamp;

  console.log("FPS: ", Math.round(fps))

  if (instancesManagersArr.length)
  {
    for (const currentInstancesArr of instancesManagersArr)
    {
      if (currentInstancesArr.length)
      {
        for (const inst of currentInstancesArr)
        {
          if ("draw" in inst) { inst.draw(ctx); }
          if ("update" in inst) { inst.update(); }
        }
      }
    }
  }

  cursor.setClick(false);

  currentFrame++;
  animationFrameId = window.requestAnimationFrame(update);
}

window.onload = preload;

StartBtn.onclick = () => {
  if (!isRunning)
  {
    gameCanvas.style.cursor = "none";
    update();
    isRunning = true;
    console.clear();
    console.log("> [Running]")
  }
};
StopBtn.onclick = () => {
  if (isRunning)
  {
    window.cancelAnimationFrame(animationFrameId);
    gameCanvas.style.cursor = "auto";
    isRunning = false;
    console.log("> [Stopped]")
  }
};