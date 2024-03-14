import {Link,Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <div>我是一级路由layout<br/>
        {/*二级路由出口*/}
            <Link to={'/'}>关于</Link><br/>
            <Link to={'/board'}>面板</Link>
            <Outlet />
        </div>
    )
}

export default Layout