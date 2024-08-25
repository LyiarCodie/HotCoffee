import { CreateVector2, CreateDimensions2, CreateBounds, Normalize, isValidNumber, DisplayErrorMessage, Clamp } from '../Utils.js';
import "../definitions.js";

/** 
 * @param {HTMLCanvasElement} canvas 
 * @param {KeyboardInput} kb
 * @param {NonInteractiveCollider[]} nonInteractiveColliders
 * @param {InteractiveCollider[]} interactiveColliders
 * */
function CreatePlayer(canvas, kb, nonInteractiveColliders, interactiveColliders)
{
    const position = CreateVector2();
    const velocity = CreateVector2();
    const size = CreateDimensions2(16, 16);
    const rect = CreateBounds(position, size);

    const axis = CreateVector2();
    let moveSpeed = 2;

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
        interactiveCollidersHandle();
    }

    /** @param {Vector2} direction */
    const move = (direction) => {
        setVelocity(CreateVector2(moveSpeed * direction.x, moveSpeed * direction.y));

        nonInteractiveCollidersHandle();

        setPosition(CreateVector2(position.x + velocity.x, position.y + velocity.y));
        setPosition(CreateVector2(Clamp(position.x, 0, canvas.width - size.width), Clamp(position.y, 0, canvas.height - size.height)));
    }

    const nonInteractiveCollidersHandle = () => {
        // collisions
        if (nonInteractiveColliders.length)
        {
            for (const currentCollider of nonInteractiveColliders)
            {
                if (currentCollider.getBounds)
                    {
                        const gameObjectRight = currentCollider.getBounds().right;
                        const gameObjectLeft = currentCollider.getBounds().left;
                        const gameObjectTop = currentCollider.getBounds().top;
                        const gameObjectBottom = currentCollider.getBounds().bottom;

                        // horizontal collision
                        const touchingRight = axis.x < 0 && rect.isTouchingRight(velocity.x, currentCollider.getBounds());
                        const touchingLeft = axis.x > 0 && rect.isTouchingLeft(velocity.x, currentCollider.getBounds());
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
                        const touchingBottom = axis.y < 0 && rect.isTouchingBottom(velocity.y, currentCollider.getBounds());
                        const touchingTop = axis.y > 0 && rect.isTouchingTop(velocity.y, currentCollider.getBounds());
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

    const interactiveCollidersHandle = () => {
        if (interactiveColliders.length)
            {
                for (const currentCollider of interactiveColliders)
                {
                    if (rect.isOver(currentCollider.getBounds())) {
                        if (currentCollider.getTag() == "fridgeInventoryTrigger")
                        {
                            currentCollider.getParent().setHighlightBorder(true);

                            if (kb.KeyPress("J"))
                            {
                                openFridgeInventory();
                            }
                        }
                        else if (currentCollider.getTag() == "toasterTrigger")
                        {
                            currentCollider.getParent().setHighlightBorder(true);

                            if (kb.KeyPress("J"))
                            {
                                useToaster();
                            }
                        }
                        else if (currentCollider.getTag() == "coffeeMakerTrigger")
                        {
                            currentCollider.getParent().setHighlightBorder(true);

                            if (kb.KeyPress("J"))
                            {
                                useCoffeeMaker();
                            }
                        }

                        
                    }
                    else 
                    {
                        currentCollider.getParent().setHighlightBorder(false);
                    }
                }
            }
    }

    const openFridgeInventory = () => {
        console.log("bó escolher um pãozin");
    }

    const useToaster = () => {
        console.log("beleza, bora dá uma esquenta na coisa");
    }

    const useCoffeeMaker = () => {
        console.log("cafézin né? pão puro é foda");
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