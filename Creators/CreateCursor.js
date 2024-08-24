import { CreateVector2, CreateDimensions2, isValidNumber, DisplayErrorMessage } from "../Utils.js";

import "../definitions.js";

/** @type {HTMLImageElement} */
const cursorSpr = document.getElementById("cursorSpr");

/** @param {MouseInput} mouse */
function CreateCursor(mouse)
{
    const position = CreateVector2();

    const update = () => {
        const mousePosition = mouse.getPosition();
        Object.assign(position, { x: mousePosition.x, y: mousePosition.y });
    }

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.drawImage(cursorSpr, position.x, position.y);
    }

    return { draw, update }
}

export default CreateCursor;