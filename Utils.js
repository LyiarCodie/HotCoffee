export function CreateDimensions2(width = 0, height = 0)
{
    return { width, height };
}

export function CreateVector2(x = 0, y = 0)
{
    return {x, y};
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
    return value && typeof(value) == "number" && !isNaN(value)
}

/**
 * @param {string} methodName
 * @param {string} parameterName
 * @param {any} valuePassedAsArgument
 * 
 * ```js
 * DisplayErrorMessage("setClick", "newValue", newValue);
 * // => [error | setClick]: `newValue` is invalid!
 * // ... more informations ...
 * ```
 */
export function DisplayErrorMessage(methodName, parameterName, valuePassedAsArgument)
{
    console.error(`[error | ${methodName}]: \`${parameterName}\` is invalid!`)
    throw new Error("value passed as argument: " + valuePassedAsArgument);
}
