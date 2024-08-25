import "../definitions.js";

/** @param {KeyboardKey[]} keysBeingPressedArr */
function CreateKeyboardInput(keysBeingPressedArr)
{
    const keys = {
        A: {
            holding: false,
            pressed: false,
        },
        D: {
            holding: false,
            pressed: false
        },
        W: {
            holding: false,
            pressed: false
        },
        S: {
            holding: false,
            pressed: false
        },
        J: {
            holding: false,
            pressed: false
        }
    }

    /** @param {KeyboardKey} key */
    const setFalseKey = (key) => {
        key.pressed = false
        Object.assign(keys, key)
    }

    window.addEventListener("keydown", ({ key }) => {

        /** @type {KeyboardKey} */
        const currentKey = keys[key.toUpperCase()];
        if (currentKey && !currentKey.holding)
        {
            currentKey.holding = true;
            currentKey.pressed = true;
        }
    })

    window.addEventListener("keyup", ({ key }) => {
        /** @type {KeyboardKey} */
        const currentKey = keys[key.toUpperCase()];
        if (currentKey && currentKey.holding)
        {
            currentKey.holding = false;
            currentKey.pressed = false;
        }
    })

    /** @param {"A" | "W" | "S" | "D"} key */
    const KeyDown = (key) => {
        const currentKey = keys[key];
        if (currentKey) { return currentKey.holding; }

        return false;
    }

    /** @param {"A" | "W" | "S" | "D"} key */
    const KeyPress = (key) => {
        const currentKey = keys[key];
        
        if (currentKey && currentKey.holding) {
            keysBeingPressedArr.push(() => setFalseKey(currentKey));
            return currentKey.pressed; 
        }

        return false;
    }

    return { KeyDown, KeyPress }
}

export default CreateKeyboardInput;