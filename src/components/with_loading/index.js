import React from 'react';
import loading from '../../asset/images/loading.gif';
import './style.css';

/**
 * 
 * This is a High Order Component
 * which set the loading state for the input component
 * 
 */
export function WithLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <div class='loading-wrapper'>
                <img class='loading-image' alt='Please wait...' src={loading} />
                <p class='loading-text'>Please wait...</p>
            </div>
        );
    };
}