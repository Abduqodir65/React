import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
    };

    const decrease = () => {
        setCount(count - 1);
    };
    const reset = () => {
        setCount(0);
    };

    return (
        <div style={{padding:'20px',borderRadius:'12px',width:'400px',textAlign: 'center', marginTop: '50px',color:'black',backgroundColor:'white',boxShadow:'-1px 2px 8px 2px rgba(34, 60, 80, 0.2)'}}>
            <h2>Simple Counter</h2>
            <h1>{count}</h1>
            <button onClick={decrease} style={{ margin: '10px', padding: '10px 20px' }}>
                -
            </button>
            <button onClick={reset} style={{ margin: '10px', padding: '10px 20px' }}>
                Reset
            </button>
            <button onClick={increase} style={{margin: '10px', padding: '10px 20px' }}>
                +
            </button>
        </div>
    );
}

export default Counter;
