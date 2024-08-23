/**
 * @typedef {Object} Vector2
 * @prop    {number} x
 * @prop    {number} y
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
 * @typedef {Object} KeyboardInput
 * @prop {(Key: string) => boolean} KeyDown
 * @prop {(Key: string) => boolean} KeyPress
 */