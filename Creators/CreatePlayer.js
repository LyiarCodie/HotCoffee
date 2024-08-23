import { CreateVector2, CreateDimensions2 } from '../Utils.js';
import "../definitions.js";

/** @param {Vector2} position */
function CreatePlayer(position = CreateVector2())
{
    const positon = CreateVector2(position);
    const size = CreateDimensions2(32, 32);

    /** @param {number} dt */
    const update = () => {
        
    }
    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.fillStyle = "white";
        ctx.fillRect(position.x, position.y, size.width, size.height);
    }

    return {draw, update}
}

export default CreatePlayer;