import React from 'react';
import ReactDOM from 'react-dom';
import { sayHello, sayWorld } from './test';

sayHello();

ReactDOM.render(
    <div>
        <h1>aegean</h1>
    </div>,
    document.getElementById('root')
)