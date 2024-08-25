import { CreateDimensions2, CreateVector2 } from "../Utils";

/** @type {HTMLImageElement} */
const groundSpr = document.getElementById("groundSpr");

function CreateBackground()
{
    const position = CreateVector2();
    const size = CreateDimensions2(groundSpr.width, groundSpr.height);

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        // ctx.fillStyle = "black";
        // ctx.fillRect(position.x, position.y, size.width, size.height);
        ctx.drawImage(groundSpr, position.x, position.y, size.width, size.height);
    }

    return { draw }
}

export default CreateBackground;