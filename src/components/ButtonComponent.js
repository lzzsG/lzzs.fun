import React from 'react';

const ButtonComponent = ({ children, onClick }) => {
    return (
        <button className="btn btn-primary m-1" onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonComponent;
