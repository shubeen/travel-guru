import React from 'react';
import Rectangle1 from '../../Image/Rectangle1.png';

const Login = () => {
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Rectangle1})` }} className="header " >
            <h1>this is login</h1>
        </div>
    );
};

export default Login;