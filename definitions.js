/**
 * @typedef {Object} Vector2
 * @prop    {number} x
 * @prop    {number} y
 */

/**
 * @typedef {Object} Dimensions2
 * @prop    {number} width
 * @prop    {number} height
 */

/**
 * @typedef {Object} Bounds
 * @prop    {number} left
 * @prop    {number} right
 * @prop    {number} top
 * @prop    {number} bottom
 */

/**
 * @typedef {Object} KeyboardKey
 * @prop    {boolean} holding
 * @prop    {boolean} pressed
 */

/**
 * @typedef {Object} Cursor
 * @prop {(newPosition: Vector2) => void} setPosition
 * @prop {(newValue: boolean) => void} setHolding
 * @prop {(newValue: boolean) => void} setClick
 * @prop {() => boolean} getClick
 * @prop {() => boolean} getHolding
 */

/**
 * @typedef {Object} MouseInput
 * @prop {() => boolean} getClick
 * @prop {() => boolean} getHolding
 * @prop {() => Vector2} getPosition
 */

/**
 * @typedef {"A" | "W" | "S" | "D"} Keys
 * 
 * @typedef {Object} KeyboardInput
 * @prop {(Key: Keys) => boolean} KeyDown
 * @prop {(Key: Keys) => boolean} KeyPress
 */

/**
 * @typedef {Object} GameObject
 * @prop    {() => Bounds} getBounds
 */