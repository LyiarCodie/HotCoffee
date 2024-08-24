import { CreateDimensions2, CreateVector2, CreateBounds } from "../Utils";
import { DisplayErrorMessage, isValidNumber } from "../Utils";
import "../definitions.js";

/** 
 * @param {Dimensions2} _size 
 * @param {string} color
 * */
function CreateWall(_size, color)
{
    const position = CreateVector2();
    const size = CreateDimensions2(_size.width, _size.height);
    const rect = CreateBounds(position, size);
    
    /** @param {Vector2} newPosition */
    const setPosition = (newPosition) => {
        if (newPosition && isValidNumber(newPosition.x) && isValidNumber(newPosition.y))
        {
            Object.assign(position, { x: newPosition.x, y: newPosition.y });
        }
        else
        {
            DisplayErrorMessage("CreateWall", "setPosition", "newPosition", newPosition);
        }
    }

    const getSize = () => ({ width: size.width, height: size.height });

    const getBounds = () => {
        return {
            left: rect.bounds.left,
            right: rect.bounds.right,
            top: rect.bounds.top,
            bottom: rect.bounds.bottom
        }
    }

    const update = () => {
        rect.setPosition(position);
    }

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.fillStyle = color;
        ctx.fillRect(position.x, position.y, size.width, size.height);
    }

    return { draw, update, setPosition, getSize, getBounds }
}

export default CreateWall;