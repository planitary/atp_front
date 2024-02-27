// import logo from './logo.svg';
// import './App.css';

// 受控绑定表单
// 1、声明一个react状态

// 2、核心绑定流程(a.通过value属性绑定react状态，b.绑定事件，通过时间参数e拿到最新值，反向修改到react状态

// react获取dom 1、useRef生成对象，绑定到dom对象上 2、dom可用是，useRef获取dam(dom渲染完毕后)

// 组件通信-父传子(1、父组件传递数据，子组件标签绑定属性 2、子组件使用props接受数据

import {createContext, useContext, useRef, useState} from "react";

// 下方的APP是父组件，这里额外定义一个子组件
function Son(props){
    // 这里的props是个对象，包含了父组件传递过来的所有数据；他是个只读对象，不能直接修改，要修改只能依赖父组件
    console.log(props)
    return <div>this is son & his father is {props.name},it has jsx:{props.jsx}

    </div>
}
// 子组件的函数
function Son2({onGetSonMsg}){
    const sonMsg = 'this is Son!'
    return <button onClick={() => onGetSonMsg(sonMsg)}>sendMsg</button>
}

// 组件跨层通信，APP-A-B，即APP将数据传递给B
/** 组件跨层通信，APP-A-B，即APP将数据传递给B
 * 1、 通过createContext方法创建一个上下文对象
 * 2、在顶层组件 通过provider组件提供数据
 * 3、在底层组件 通过useContext钩子函数使用数据
 * @returns {JSX.Element}
 * @constructor
 */

function A(){
    return (
        <div>this is A component
        <B/>
        </div>
    )
}

function B(){
    const topMsgByApp = useContext(msgCtx)
    return (
        <div>this is B component,{topMsgByApp}</div>
    )
}

// 上下文对象，组件跨层通信时用到
const msgCtx = createContext('');

function App() {
    // 父组件属性
    const fatherName = 'this is App name'
    // 子传父，子组件将函数返回给父组件，父组件进行调用
    const [msg,setMsg] = useState('');

    const getSonMsg = (msg) => {
        console.log(msg)
        setMsg(msg);
    }
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
            {/*父组件传递时，可以传递任何东西*/}
            <Son name = {fatherName}
            age = {18}
            flag = {true}
            list=  {[1,3,5,7,9]}
            obj = {{id:'223',orderNo: '374279482397'}}
            func = {() => console.log(123)}
            jsx = {<span color="red">this is span</span>}/>
            <p>字传父</p>
            <span>{msg}</span>
            <Son2 onGetSonMsg={getSonMsg}/>
            <p>跨层通信</p>
        {/*    跨层通信*/}
            <msgCtx.Provider value={fatherName}>
                topMsg!
                <A/>
            </msgCtx.Provider>
        </div>
    );
}

export default App;
