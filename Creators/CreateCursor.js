import { CreateVector2, CreateDimensions2, isValidNumber, DisplayErrorMessage } from "../Utils.js";

import "../definitions.js";

/** @type {HTMLImageElement} */
const cursorSpr = document.getElementById("cursorSpr");

/** @param {MouseInput} mouse */
function CreateCursor(mouse)
{
    const position = CreateVector2();

    /** @param {Vector2} newPosition */
    const setPosition = (newPosition) => {
        if (isValidNumber(newPosition.x) && isValidNumber(newPosition.y))
        {
            position.x = newPosition.x;
            position.y = newPosition.y;
        }
        else { DisplayErrorMessage("setPosition", "newPosition", newPosition); }
    }

    const update = () => {
        setPosition(mouse.getPosition())
    }

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.drawImage(cursorSpr, position.x, position.y);
    }

    return { draw, update }
}

export default CreateCursor;