import { CreateDimensions2, CreateVector2 } from "../Utils";

/** @param {HTMLCanvasElement} canvas */
function CreateBackground(canvas)
{
    const position = CreateVector2();
    const size = CreateDimensions2(canvas.width, canvas.height);

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.fillRect(position.x, position.y, size.width, size.height);
    }

    return { draw }
}

export default CreateBackground;