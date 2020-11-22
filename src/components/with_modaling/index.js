import React from 'react';
import { Modal } from '../modal';

/**
 * 
 * This is a High Order Component
 * which add the component into a modal
 * 
 */
export function WithModaling(component) {
    return function WihModalingComponent({ ...props }) {
        return (
            <Modal component={component} {...props} />
        );
    };
}