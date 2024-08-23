import { CreateVector2, CreateDimensions2, isValidNumber, DisplayErrorMessage } from "../Utils.js";

import "../definitions.js";

/** @type {HTMLImageElement} */
const cursorSpr = document.getElementById("cursorSpr");

function CreateCursor()
{
    const position = CreateVector2();
    // const size = CreateDimensions2(16, 16);
    let click = false;
    let holding = false;

    const setHolding = (newValue = true) => {
        if (typeof(newValue) == "boolean") { holding = newValue; }
        else { DisplayErrorMessage("setHolding", "newValue", newValue); }
    }
    
    const setClick = (newValue = true) => {
        if (typeof(newValue) == "boolean") { click = newValue; }
        else { DisplayErrorMessage("setClick", "newValue", newValue); }
    }

    const getHolding = () => holding;
    const getClick = () => click;

    /** @param {Vector2} newPosition */
    const setPosition = (newPosition) => {
        if (isValidNumber(newPosition.x) && isValidNumber(newPosition.y))
        {
            position.x = newPosition.x;
            position.y = newPosition.y;
        }
        else { DisplayErrorMessage("setPosition", "newPosition", newPosition); }
    }

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.drawImage(cursorSpr, position.x, position.y);
    }

    return { draw, setPosition, setHolding, setClick, getHolding, getClick }
}

export default CreateCursor;