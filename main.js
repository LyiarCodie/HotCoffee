import CreateBackground from './Creators/CreateBackground.js';
import CreateCursor from './Creators/CreateCursor';
import CreatePlayer from './Creators/CreatePlayer.js';
import CreateMouseInput from './Creators/CreateMouseInput.js';
import CreateKeyboardInput from './Creators/CreateKeyboardInput.js';

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


/** @type {KeyboardKey[]} */
const keysBeingPressed = [];
const keyboard = CreateKeyboardInput(keysBeingPressed);
const mouse = CreateMouseInput(gameCanvas);

function preload()
{
  gameCanvas.width = 256 * 2;
  gameCanvas.height = 144 * 2;
  ctx.imageSmoothingEnabled = false;

  const backgroundInsts = [];
  const cursorInsts = [];
  const playerInsts = [];

  instancesManagersArr.push(backgroundInsts); // first: background is rendered/updated
  instancesManagersArr.push(playerInsts); // second: player is rendered/updated
  instancesManagersArr.push(cursorInsts); // third: cursor is rendered/updated

  const background = CreateBackground(gameCanvas);
  const player = CreatePlayer();
  const cursor = CreateCursor(mouse);

  backgroundInsts.push(background);
  cursorInsts.push(cursor);
  playerInsts.push(player);


  // CreateMouseInput(gameCanvas, cursor);
}

function update()
{
  if (instancesManagersArr.length)
  {
    for (const currentInstancesArr of instancesManagersArr)
    {
      if (currentInstancesArr.length)
      {
        for (const inst of currentInstancesArr)
        {
          if ("update" in inst) { inst.update(); }
        }
      }
    }
  }

  if (instancesManagersArr.length)
  {
    for (const currentInstancesArr of instancesManagersArr)
    {
      if (currentInstancesArr.length)
      {
        for (const inst of currentInstancesArr)
        {
          if ("draw" in inst) { inst.draw(ctx); }
        }
      }
    }
  }

  // if (keyboard.KeyDown("A")) console.log("MOOOOVE")
  mouse.setClickAsFalse();
  if (keysBeingPressed.length)
  {
    for (let i = keysBeingPressed.length - 1; i >= 0; i--)
    {
      const currentCallback = keysBeingPressed[i];
      if (currentCallback)
      {
        currentCallback();
        keysBeingPressed.pop();
      }
    }
  }

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