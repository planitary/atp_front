// import logo from './logo.svg';
// import './PlatformApp.css';

// 项目根组件
// const count = 100;
// function getName(){
//     return 'jack';
// }
// 列表渲染
import {useState} from "react";
import './index.css'

const list = [
    {id: 1001, name: 'Vue'},
    {id: 1002, name: 'React'},
    {id: 1003, name: 'Angular'}
]
const isLogin = false

const articleType = 3



function getArticleTemplate(){
    if (articleType === 0){
        return <div>我是无图文章</div>
    }else if(articleType === 1){
        return <div>我是单图文章</div>
    }
    else if (articleType === 3){
        return <div>我是三图文章</div>
    }
}

// 定义组件(首字母大写)
function Button(){
    // 业务逻辑
    return <button>click me !</button>
}

function buttonClick2(){
    console.log("按钮被点击了2")
}

const App2 = () => {
    // 数据驱动绑定（useState实现计数器)
    // useState返回的是一个数组，count表示状态状态变量，setCount表示修改状态变量的方法
    // 1、调用useState添加一个状态变量,构造函数的值表示计数的初值
    const [count,setCount] = useState(0)
    // 2、点击事件回调函数,每次点击时，count+1(setCount会更新新的count值)
    const handleClick = () => {
        setCount(count + 1)
    }
    // 再来一个exp
    const [form,setForm] = useState({name:'jack'})
    const handleChangeName = () => {
        // ...为展开运算符，方便地将可迭代对象的元素或属性展开，以便更容易地组合、复制或传递参数
        setForm({
            ...form,name: 'peter'
        })
    }

    // 回调函数并设置形参
    const buttonClick = (e) => {console.log("按钮被点击了",e)}
    // 箭头函数设置入参
    const buttonClick3 = (name) => {console.log("欢迎",name)}
    // 自定义入参+事件参数
    const buttonClick4 = (name,e) => {console.log("欢迎~",name,e)}


    return (
        <div className="App">
            this is APP
            {/*{"this is message"}*/}
            {/*{count}*/}
            {/*my name is {getName()}*/}
            {/*today is {new Date().getDate()}*/}
            {/*<div style={{color: 'red'}}> this is div</div>*/}

            {/*    渲染列表,使用匿名函数，=>右侧为返回值，需要哪个字段就用哪个字段进行返回，在进行行的渲染是
            指定一个key可以增加渲染速度*/}
            <ul>
                {list.map(item => (<li key={item.id}>{item.name}</li>))}
            </ul>
        {/*    逻辑与*/}
            {isLogin && <span>this is span when true</span>}
            <br/>
        {/*    三元运算符*/}
            {isLogin ? <span>jack</span> : <span style={{color: 'red'}}>no user!</span>}

            <br/>
            {getArticleTemplate()}

        {/*    事件绑定*/}
            <button onClick={buttonClick}>click me</button>
            <button onClick={() => buttonClick3("planitary")}>登录</button>
        {/*    自定义入参+事件参数*/}
            <button onClick={(e) => buttonClick4("peter",e)}>登录+事件</button>
            <br/>
            <p>组件</p>
        {/*    自闭和使用组件*/}
            <Button/>
        {/*    成对标签使用组件*/}
            <Button>成对</Button>
            <br/>
            <p>一下为数据驱动计数器</p>
            <button onClick={handleClick}>{count}</button>
            <button onClick={handleChangeName}>修改表单name:{form.name}</button>
            <br/>
            <p>通过css来设置组件样式</p>
            <span className='foo'>this is span</span>

        </div>


    );
}

export default App_L2;
