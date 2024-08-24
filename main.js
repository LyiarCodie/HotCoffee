import CreateBackground from './Creators/CreateBackground.js';
import CreateCursor from './Creators/CreateCursor';
import CreatePlayer from './Creators/CreatePlayer.js';
import CreateMouseInput from './Creators/CreateMouseInput.js';
import CreateKeyboardInput from './Creators/CreateKeyboardInput.js';
import CreateWall from './Creators/CreateWall.js';
import { CreateDimensions2, CreateVector2 } from './Utils.js';

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
  gameCanvas.width = 256 * 3;
  gameCanvas.height = 144 * 3;
  ctx.imageSmoothingEnabled = false;

  const backgroundInsts = [];
  const cursorInsts = [];
  const WallInsts = [];
  const playerInsts = [];

  instancesManagersArr.push(backgroundInsts); // first: background is rendered/updated
  instancesManagersArr.push(WallInsts);
  instancesManagersArr.push(playerInsts); // second: player is rendered/updated
  instancesManagersArr.push(cursorInsts); // third: cursor is rendered/updated

  const background = CreateBackground(gameCanvas);

  const player = CreatePlayer(keyboard, WallInsts);
  const playerInitialPosition = CreateVector2(gameCanvas.width / 2 - player.getSize().width + 100, gameCanvas.height / 2 - player.getSize().height / 2)
  player.setPosition(playerInitialPosition);
  
  const cursor = CreateCursor(mouse);

  backgroundInsts.push(background);
  cursorInsts.push(cursor);
  playerInsts.push(player);

  const wall = CreateWall(CreateDimensions2(30, gameCanvas.height / 2.3), "lightgreen");
  const wallInitialPosition = CreateVector2(gameCanvas.width/2-wall.getSize().width/2, gameCanvas.height / 2-wall.getSize().height/2);
  wall.setPosition(wallInitialPosition);

  const wall2 = CreateWall(CreateDimensions2(gameCanvas.width / 3, 30));
  const wall2InitialPosition = CreateVector2(gameCanvas.width/2-wall2.getSize().width/2, gameCanvas.height -70);
  wall2.setPosition(wall2InitialPosition);

  WallInsts.push(wall);
  WallInsts.push(wall2);
}

const CreateCurrentFPSCounter = () => {
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 0;

  const update = () => {
    const currentTime = performance.now();
    frameCount++;

    const deltaTime = currentTime - lastTime;

    if (deltaTime >= 1000)
    {
      fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      console.log(`FPS: ${fps}`);
    }
  }

  return { update }
}
const currentFPSCounter = CreateCurrentFPSCounter();

function update()
{
  currentFPSCounter.update();

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