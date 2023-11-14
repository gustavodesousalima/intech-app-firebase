import { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import './typerwriter.css'
// eslint-disable-next-line react/prop-types
const TypewriterComponent = ({ strings }) => {
    const typewriterRef = useRef(null);

    useEffect(() => {
        typewriterRef.current = new Typewriter('#typewriter', {
            strings: strings,
            autoStart: true,
            loop: true
        });

        return () => {
            typewriterRef.current.stop();
        };
    }, [strings]);

    return <div id="typewriter" />;
};

export default TypewriterComponent;
