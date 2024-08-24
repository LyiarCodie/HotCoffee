import "./definitions.js";

/** 
 * @param {number} width
 * @param {number} height
 */
export function CreateDimensions2(width, height)
{
    return { width, height };
}

export function CreateVector2(x = 0, y = 0)
{
    const vector2 = { x, y }
  
    /** 
     * @param {Vector2} otherVector2
     * 
     * @description Compare this Vector2 with another.
     * */
    const Compare = (otherVector2) => {
        return vector2.x === otherVector2.x && vector2.y === otherVector2.y;
    }

    return { ...vector2,Compare };
}

/** 
 * @param {Vector2} position 
 * @param {Dimensions2} size
 * */
export function CreateBounds(position, size)
{
    const bounds = {
        left: position.x,
        top: position.y,
        right: position.x + size.width,
        bottom: position.y + size.height
    }

    /** @param {Vector2} newPosition */
    const setPosition = (newPosition) => {
        if (newPosition && isValidNumber(newPosition.x) && isValidNumber(newPosition.y))
        {
            bounds.left = newPosition.x;
            bounds.top = newPosition.y;
            bounds.right = newPosition.x + size.width;
            bounds.bottom = newPosition.y + size.height;
        }
        else
        {
            DisplayErrorMessage("CreateBounds", "setPosition", "newPosition", newPosition);
        }
    }

    /** 
     * @param {number} velocityX
     * @param {Bounds} other
     * @description returns **true** if this object bounds is touching the left side of `other` object bounds
     * */
    const isTouchingLeft = (velocityX, other) => {
        return bounds.top < other.bottom &&
               bounds.right + velocityX > other.left &&
               bounds.bottom > other.top &&
               bounds.left < other.right;
    }

    /** 
     * @param {number} velocityX
     * @param {Bounds} other
     * @description returns **true** if this object bounds is touching the right side of `other` object bounds
     * */
    const isTouchingRight = (velocityX, other) => {
        return bounds.top < other.bottom &&
               bounds.right > other.left &&
               bounds.bottom > other.top &&
               bounds.left + velocityX < other.right;
    }

    /** 
     * @param {number} velocityY
     * @param {Bounds} other
     * @description returns **true** if this object bounds is touching the top side of `other` object bounds
     * */
    const isTouchingTop = (velocityY, other) => {
        return bounds.top < other.bottom &&
               bounds.right > other.left &&
               bounds.bottom + velocityY > other.top &&
               bounds.left < other.right;
    }

    /** 
     * @param {number} velocityY
     * @param {Bounds} other
     * @description returns **true** if this object bounds is touching the bottom side of `other` object bounds
     * */
    const isTouchingBottom = (velocityY, other) => {
        return bounds.top + velocityY < other.bottom &&
               bounds.right > other.left &&
               bounds.bottom > other.top &&
               bounds.left < other.right;
    }

    return { bounds, setPosition, isTouchingLeft, isTouchingRight, isTouchingTop, isTouchingBottom }
}

/** @param {Vector2} vector2 */
export function Normalize(vector2)
{
    const diagonalVector = Math.sqrt(Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2));

    if (diagonalVector > 1)
    {
        vector2.x /= diagonalVector;
        vector2.y /= diagonalVector;

        vector2.x = Clamp(vector2.x, -0.7, 0.7);
        vector2.y = Clamp(vector2.y, -0.7, 0.7);
    }

    return vector2;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{ clientX: number, clientY: number }} realMousePosition
 */
export function GetCursorPositionOnCanvas(canvas, realMousePosition)
{
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const { clientX, clientY } = realMousePosition;
    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;

    return CreateVector2(mouseX, mouseY);
}

/** @param {number} value */
export function isValidNumber(value)
{
    return typeof(value) == "number" && !isNaN(value)
}

/**
 * @param {string} triggerName
 * @param {string} methodName
 * @param {string} parameterName
 * @param {any} valuePassedAsArgument
 * 
 * ```js
 * DisplayErrorMessage("CreateCursor", "setClick", "newValue", newValue);
 * // => [CreateCursor | setClick]: `newValue` is invalid!
 * // ... more informations ...
 * ```
 */
export function DisplayErrorMessage(triggerName, methodName, parameterName, valuePassedAsArgument)
{
    console.error(`[${triggerName} | ${methodName}]: \`${parameterName}\` is invalid!`)
    console.error(valuePassedAsArgument);
    throw new Error();
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
export function Clamp(value, min, max)
{
    if (value > max) return max;
    else if (value < min) return min;
    
    return value;
}