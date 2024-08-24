import { CreateVector2, CreateDimensions2, CreateBounds, Normalize, isValidNumber, DisplayErrorMessage } from '../Utils.js';
import "../definitions.js";

/** 
 * @param {Vector2} position 
 * @param {KeyboardInput} kb
 * @param {[GameObject[]]} collisions
 * */
function CreatePlayer(kb, ...collisions)
{
    const position = CreateVector2();
    const velocity = CreateVector2();
    const size = CreateDimensions2(32, 32);
    const rect = CreateBounds(position, size);

    const axis = CreateVector2();
    let moveSpeed = 5;

    const update = () => {
        rect.setPosition(position);

        const left_key = kb.KeyDown("A") ? -1 : 0;
        const right_key = kb.KeyDown("D") ? 1 : 0;
        const up_key = kb.KeyDown("W") ? -1 : 0;
        const down_key = kb.KeyDown("S") ? 1 : 0;

        Object.assign(axis, CreateVector2(left_key + right_key, up_key + down_key));

        if (!axis.Compare(CreateVector2()))
        {
            Object.assign(axis, Normalize(axis));
        }

        move(axis);
    }

    /** @param {Vector2} direction */
    const move = (direction) => {
        setVelocity(CreateVector2(moveSpeed * direction.x, moveSpeed * direction.y));

        collide();

        setPosition(CreateVector2(position.x + velocity.x, position.y + velocity.y));
    }

    const collide = () => {
        // collisions
        if (collisions.length)
        {
            for (const collisionsGroups of collisions)
            {
                if (collisionsGroups.length)
                {
                    for (const currentGameObject of collisionsGroups)
                    {
                        const gameObjectRight = currentGameObject.getBounds().right;
                        const gameObjectLeft = currentGameObject.getBounds().left;
                        const gameObjectTop = currentGameObject.getBounds().top;
                        const gameObjectBottom = currentGameObject.getBounds().bottom;

                        // horizontal collision
                        const touchingRight = axis.x < 0 && rect.isTouchingRight(velocity.x, currentGameObject.getBounds());
                        const touchingLeft = axis.x > 0 && rect.isTouchingLeft(velocity.x, currentGameObject.getBounds());
                        if (touchingRight)
                        {
                            const gap = Math.abs(rect.bounds.left - gameObjectRight);
                            for (let i = 0; i < gap; i++)
                            {
                                setPosition(CreateVector2(position.x - 1, position.y));
                                if (position.x < gameObjectRight)
                                {
                                    setPosition(CreateVector2(gameObjectRight, position.y));
                                }
                            }
                            
                            setVelocity(CreateVector2(0, velocity.y));
                        }
                        else if (touchingLeft)
                        {
                            const gap = Math.abs(gameObjectLeft - rect.bounds.right);
                            for (let i = 0; i < gap; i++)
                            {
                                setPosition(CreateVector2(position.x + 1, position.y));
                                if (position.x + size.width > gameObjectLeft)
                                {
                                    setPosition(CreateVector2(gameObjectLeft-size.width, position.y));
                                }
                            }

                            setVelocity(CreateVector2(0, velocity.y));
                        }

                        // vertical collision
                        const touchingBottom = axis.y < 0 && rect.isTouchingBottom(velocity.y, currentGameObject.getBounds());
                        const touchingTop = axis.y > 0 && rect.isTouchingTop(velocity.y, currentGameObject.getBounds());
                        if (touchingTop)
                        {
                            const gap = Math.abs(rect.bounds.bottom - gameObjectTop);
                            for (let i = 0; i < gap; i++)
                            {
                                setPosition(CreateVector2(position.x, position.y + 1));
                                if (position.y + size.height > gameObjectTop)
                                {
                                    setPosition(CreateVector2(position.x, gameObjectTop - size.height));
                                }
                            }
                            setVelocity(CreateVector2(velocity.x, 0));
                        }
                        else if (touchingBottom)
                        {
                            const gap = Math.abs(rect.bounds.top - gameObjectBottom);
                            for (let i = 0; i < gap; i++)
                            {
                                setPosition(CreateVector2(position.x, position.y - 1));
                                if (position.y < gameObjectBottom)
                                {
                                    setPosition(CreateVector2(position.x, gameObjectBottom));
                                }
                            }

                            setVelocity(CreateVector2(velocity.x, 0));
                        }
                    }
                }
            }
        }
    }

    /** @param {Vector2} newPosition */
    const setPosition = (newPosition) => {
        if (newPosition && isValidNumber(newPosition.x) && isValidNumber(newPosition.y))
        {
            Object.assign(position, { x: newPosition.x, y: newPosition.y });
        }
        else
        {
            DisplayErrorMessage("CreatePlayer", "setPosition", "newPosition", newPosition);
        }
    }

    /** @param {Vector2} newVelocity */
    const setVelocity = (newVelocity) => {
        if (newVelocity && isValidNumber(newVelocity.x) && isValidNumber(newVelocity.y))
        {
            Object.assign(velocity, { x: newVelocity.x, y: newVelocity.y });
        }
        else
        {
            DisplayErrorMessage("CreatePlayer", "setVelocity", "newVelocity", newVelocity);
        }
    }

    const getBounds = () => ({ ...rect })

    const getSize = () => ({ ...size })

    /** @param {CanvasRenderingContext2D} ctx */
    const draw = (ctx) => {
        ctx.fillStyle = "white";
        ctx.fillRect(position.x, position.y, size.width, size.height);
    }

    return { draw, update, setPosition, getSize, getBounds }
}

export default CreatePlayer;