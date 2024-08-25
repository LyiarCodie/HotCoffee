import CreateBackground from './Creators/CreateBackground.js';
import CreateCursor from './Creators/CreateCursor';
import CreatePlayer from './Creators/CreatePlayer.js';
import CreateMouseInput from './Creators/CreateMouseInput.js';
import CreateKeyboardInput from './Creators/CreateKeyboardInput.js';
import CreateCollider from './Creators/CreateCollider.js';
import CreateStaticLevelDecoration from './Creators/CreateStaticLevelDecoration.js';
import { CreateDimensions2, CreateVector2 } from './Utils.js';

import "./definitions.js";

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

/** @type {GameObject[][]} */
const instancesToDrawManager = [];

/** @type {KeyboardKey[]} */
const keysBeingPressed = [];
const keyboard = CreateKeyboardInput(keysBeingPressed);
const mouse = CreateMouseInput(gameCanvas);

function preload()
{
  gameCanvas.width = 384;
  gameCanvas.height = 216;
  ctx.imageSmoothingEnabled = false;

  const backgroundInsts = [];
  const cursorInsts = [];
  const playerInsts = [];
  const stageBackgroundLayerInsts = [];
  const stageForegroundLayerInsts = [];
  const chairsUnderPlayerLayerInsts = [];
  const chairsOverStageForegroundLayerInsts = [];
  const fridgeLayer = [];
  const tableLayer = [];
  const toasterLayer = [];
  const coffeeMakerLayer = [];
  
  // the sprites will be rendered in the same order as these instances arrays
  instancesToDrawManager.push(backgroundInsts);
  instancesToDrawManager.push(stageBackgroundLayerInsts);
  instancesToDrawManager.push(chairsUnderPlayerLayerInsts);
  instancesToDrawManager.push(fridgeLayer);
  instancesToDrawManager.push(tableLayer);
  instancesToDrawManager.push(toasterLayer);
  instancesToDrawManager.push(coffeeMakerLayer);
  instancesToDrawManager.push(playerInsts);
  instancesToDrawManager.push(stageForegroundLayerInsts);
  instancesToDrawManager.push(chairsOverStageForegroundLayerInsts);
  instancesToDrawManager.push(cursorInsts);

  const background = CreateBackground();
  
  const stageBackgroundLayerSpr = document.getElementById("stageBackgroundSpr");
  stageBackgroundLayerInsts.push(CreateStaticLevelDecoration(stageBackgroundLayerSpr, CreateVector2(123, 2)))
  const stageForegroundLayerSpr = document.getElementById("stageForegroundSpr");
  stageForegroundLayerInsts.push(CreateStaticLevelDecoration(stageForegroundLayerSpr, CreateVector2(125, 55)))
  const chairSpr = document.getElementById("chairSpr");
  for (let i = 0; i < 4; i++)
  {
    const currentChairPosition = CreateVector2(142 + (27 * i), 74);
    const chairUnderPlayer = CreateStaticLevelDecoration(chairSpr, currentChairPosition);
    chairsUnderPlayerLayerInsts.push(chairUnderPlayer);

    const chairOverStageForeground = CreateStaticLevelDecoration(chairSpr, currentChairPosition, CreateDimensions2(chairSpr.width, 2));
    chairsOverStageForegroundLayerInsts.push(chairOverStageForeground);
  }
  const fridgeSpr = document.getElementById("fridgeSpr");
  fridgeLayer.push(CreateStaticLevelDecoration(fridgeSpr, CreateVector2(156, 9)));
  const tableSpr = document.getElementById("tableSpr");
  tableLayer.push(CreateStaticLevelDecoration(tableSpr, CreateVector2(182, 22)));
  const toasterSpr = document.getElementById("toasterSpr");
  toasterLayer.push(CreateStaticLevelDecoration(toasterSpr, CreateVector2(188, 14)));
  const coffeeMakerSpr = document.getElementById("coffeeMakerSpr");
  coffeeMakerLayer.push(CreateStaticLevelDecoration(coffeeMakerSpr, CreateVector2(207, 10)));

  /** @type {Collider[]} */
  const nonInteractiveColliders = [];
  nonInteractiveColliders.push(CreateCollider(CreateVector2(123, 0), CreateDimensions2(133, 29)));
  nonInteractiveColliders.push(CreateCollider(CreateVector2(125, 57), CreateDimensions2(128, 19)));
  nonInteractiveColliders.push(CreateCollider(CreateVector2(142,72), CreateDimensions2(97, 9)));
  nonInteractiveColliders.push(CreateCollider(CreateVector2(156, 9), CreateDimensions2(72, 30)))

  /** @type {Collider[]} */
  const interactiveColliders = [];
  interactiveColliders.push(CreateCollider(CreateVector2(147, 29), CreateDimensions2(34,23), "", "fridgeInventoryTrigger", fridgeLayer[0]))
  interactiveColliders.push(CreateCollider(CreateVector2(185, 29), CreateDimensions2(18, 23), "", "toasterTrigger", toasterLayer[0]));
  interactiveColliders.push(CreateCollider(CreateVector2(204, 29), CreateDimensions2(18, 23), "", "coffeeMakerTrigger", coffeeMakerLayer[0]));

  const player = CreatePlayer(gameCanvas, keyboard, nonInteractiveColliders, interactiveColliders);
  const center = CreateVector2(gameCanvas.width / 2 - player.getSize().width + 100, gameCanvas.height / 2 - player.getSize().height / 2)
  player.setPosition(center);
  
  const cursor = CreateCursor(mouse);

  backgroundInsts.push(background);
  cursorInsts.push(cursor);
  playerInsts.push(player);
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
  // currentFPSCounter.update();

  if (instancesToDrawManager.length)
  {
    for (const currentInstancesArr of instancesToDrawManager)
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

  if (instancesToDrawManager.length)
  {
    for (const currentInstancesArr of instancesToDrawManager)
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