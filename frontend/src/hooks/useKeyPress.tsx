import { useEffect, useRef } from "react";

type ControlKeys = 'ArrowUp' | 'ArrowDown' | 'w' | 's';

export const useKeyPress = () => {
    const keysPressed = useRef<Record<ControlKeys, boolean>>({
        ArrowUp: false,
        ArrowDown: false,
        w: false,
        s: false
    });

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key in keysPressed.current)
            keysPressed.current[event.key as ControlKeys] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key in keysPressed.current)
            keysPressed.current[event.key as ControlKeys] = false;
    };
    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };

    }, [] )

    return keysPressed;

}