import { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import PropTypes from 'prop-types';
import './typerwriter.css'

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

TypewriterComponent.propTypes = {
    strings: PropTypes.string.isRequired
}

export default TypewriterComponent;
