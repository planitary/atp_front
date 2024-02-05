// import logo from './logo.svg';
// import './App.css';

// 项目根组件
// const count = 100;
// function getName(){
//     return 'jack';
// }
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

function buttonClick2(){
    console.log("按钮被点击了2")
}

function App() {
    // 回调函数并设置形参
    const buttonClick = (e) => {console.log("按钮被点击了",e)}
    // 箭头函数设置入参
    const buttonClick3 = (name) => {console.log("欢迎",name)}
    // 自定义入参+事件参数
    const buttonClick4 = (name,e) => {console.log("欢迎",name,e)}


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
        </div>

    );
}

export default App;
