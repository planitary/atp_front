// import logo from './logo.svg';
// import './App.css';

// 受控绑定表单
// 1、声明一个react状态

// 2、核心绑定流程(a.通过value属性绑定react状态，b.绑定事件，通过时间参数e拿到最新值，反向修改到react状态

// react获取dom 1、useRef生成对象，绑定到dom对象上 2、dom可用是，useRef获取dam(dom渲染完毕后)

import {useRef, useState} from "react";

function App() {
    const [value,setValue] = useState('')
    const inputRef = useRef(null)
    const showDom = () => {
        console.log(inputRef.current)
    }
    return (
        <div>
            <p>将表单状态与react进行绑定，react状态改变，表单内容随之改变</p>
            <input value={value} onChange={(e) => setValue(e.target.value)}
            type='text'/>
            {/*<br/>*/}
            <p>react获取dom</p>
            <input type='text' ref={inputRef}/>
            {/*按钮模拟渲染dom*/}
            <button onClick={showDom}>获取dom</button>
        </div>
    );
}

export default App;
