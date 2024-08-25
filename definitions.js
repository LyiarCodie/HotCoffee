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
 * @typedef {Object} bounds
 * @prop    {number} left
 * @prop    {number} right
 * @prop    {number} top
 * @prop    {number} bottom
 * 
 * @typedef {Object} Bounds
 * @prop    {bounds} bounds

 * @prop    {(newPosition: Vector2) => void} setPosition
 * @prop    {(other: Bounds) => boolean} isOver
 * @prop    {(velocityX: number, other: Bounds)} isTouchingLeft
 * @prop    {(velocityX: number, other: Bounds)} isTouchingRight
 * @prop    {(velocityY: number, other: Bounds)} isTouchingTop
 * @prop    {(velocityY: number, other: Bounds)} isTouchingBottom
 * 
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
 * @typedef {"A" | "W" | "S" | "D" | "J"} Keys
 * 
 * @typedef {Object} KeyboardInput
 * @prop {(Key: Keys) => boolean} KeyDown
 * @prop {(Key: Keys) => boolean} KeyPress
 */

/**
 * @typedef {Object} GameObject
 * @prop {(ctx: CanvasRenderingContext2D) => void} draw
 * @prop {() => void} update
 */

/** @typedef {Object} StaticLevelDecoration
 *  @prop {(ctx: CanvasRenderingContext2D) => void} draw
 *  @prop {(value: boolean) => void} setHighlightBorder
 */

/**
 * @typedef {Object} NonInteractiveCollider
 * @prop {((ctx: CanvasRenderingContext2D) => void) | null} draw
 * @prop {(() => void) | null} update
 * @prop {(newPosition: Vector2) => void} setPosition
 * @prop {() => Dimensions2} getSize
 * @prop {() => Bounds} getBounds
 */

/**
 * @typedef {Object} InteractiveCollider
 * @prop {((ctx: CanvasRenderingContext2D) => void) | null} draw
 * @prop {(() => void) | null} update
 * @prop {(newPosition: Vector2) => void} setPosition
 * @prop {() => Dimensions2} getSize
 * @prop {() => Bounds} getBounds
 * @prop {() => string} getTag
 * @prop {() => StaticLevelDecoration} getParent
 */