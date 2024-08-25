import "../definitions.js";
import { isValidNumber } from "../Utils.js";

/**
 * @param {HTMLImageElement} image 
 * @param {Vector2} position
 * @param {Dimensions2} clipSize
 */
function CreateStaticLevelDecoration(image, position, clipSize)
{
    let draw = null;

    // this conditional is necessary because the clip properties of `drawImage` make
    // drawing a little more expensive in terms of processing
    if (!clipSize || !isValidNumber(clipSize.width) || !isValidNumber(clipSize.height))
    {
        /** @param {CanvasRenderingContext2D} ctx */
        draw = (ctx) => {
            ctx.drawImage(image,position.x,position.y);
        }
    }
    else
    {
        /** @param {CanvasRenderingContext2D} ctx */
        draw = (ctx) => {
            ctx.drawImage(image, 0, 0, clipSize.width, clipSize.height,position.x, position.y, clipSize.width, clipSize.height);
        };
    }
    

    return { draw };
}

export default CreateStaticLevelDecoration;