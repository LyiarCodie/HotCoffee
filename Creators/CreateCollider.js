import { CreateDimensions2, CreateVector2, CreateBounds } from "../Utils";
import { DisplayErrorMessage, isValidNumber } from "../Utils";
import "../definitions.js";

/** 
 * @param {Vector2} _position
 * @param {Dimensions2} _size 
 * @param {string} color - to draw this collider it must be pushed into any array instances in `instancesToDrawManager`
 * @param {string} tag - this could be used as a collide identifier
 * @param {StaticLevelDecoration} parent - the gameobject that have relation with this collider
 * */
function CreateCollider(_position, _size, color, tag = "", parent)
{
    let position = _position;
    if (!_position || !isValidNumber(_position.x) || !isValidNumber(_position.y))
    {
        position = CreateVector2();
    }
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

    const getTag = () => tag;

    const getParent = () => parent;

    const update = () => {
        rect.setPosition(position);
    }

    let draw = null;
    if (color && color.trim() != "")
    {
        /** @param {CanvasRenderingContext2D} ctx */
        draw = (ctx) => {
            ctx.fillStyle = color;
            ctx.fillRect(position.x, position.y, size.width, size.height);
        }
    }

    return { draw, update, setPosition, getSize, getBounds, getTag, getParent }
}

export default CreateCollider;