import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../counterSlice'

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md p-6 rounded-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Simple Counter</h1>
                <div className="text-4xl font-semibold mb-4">{count}</div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => dispatch(decrement())}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                        -
                    </button>
                    <button
                        onClick={() => dispatch(reset())}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => dispatch(increment())}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Counter;
