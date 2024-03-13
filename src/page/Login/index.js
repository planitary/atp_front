import {Link,useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>我是登录页<br/>
            {/*声明式写法*/}
            <Link to={"/article"}>跳转到文章页</Link><br/>
            {/*命令式写法，使用useNavigate钩子函数*/}
            <button onClick={() => navigate('/article')}>跳转到文章页</button><br/>
            {/*searchParam传参*/}
            <button onClick={() => navigate('/article?id=1001&name=jack')}>searchParam传参</button>
            {/*param传参*/}
            <button onClick={() => navigate('/article/1001')}>param传参</button>
        </div>

    )
}

export default Login