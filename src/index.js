// react必要核心包
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// react根组件
import App from './App';

//把app根组件渲染到id为root的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


