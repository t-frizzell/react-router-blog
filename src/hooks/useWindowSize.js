import { useState,useEffect } from "react";

// Popular custom hook
const useWindowSize = () => {
    // Set data type as an object
    // Get the width and the height of the browser
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // if the window is resized
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        // Call once at load-time
        handleResize();

        //Add event listener
        window.addEventListener("resize", handleResize);

        // Remove event listener to prevent memory leak
        return () => window.removeEventListener("resize", handleResize);; // call cleanup
    
    }, []) // run at load time

    return windowSize;
}

export default useWindowSize;