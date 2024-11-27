import React, { useState } from 'react';

const ConfirmButton = () => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleClick = () => {
        setIsConfirmed(true);
    };

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={isConfirmed}
                style={{
                    backgroundColor: isConfirmed ? '#d3d3d3' : '#007bff',
                    color: isConfirmed ? '#7a7a7a' : '#fff',
                    cursor: isConfirmed ? 'not-allowed' : 'pointer',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                }}
            >
                {isConfirmed ? 'Tasdiqlandi!' : 'Tasdiqlanmagan'}
            </button>
        </div>
    );
};

export default ConfirmButton;
