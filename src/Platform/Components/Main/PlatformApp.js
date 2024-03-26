import React, {useState} from 'react';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import SiderMenu from "../Outer/OuterSlideMenu/SiderMenu";
import OuterHeaderMenu from "../Outer/OuterHeaderMenu/OuterHeaderMenu";
import ProjectList from "../Outer/Content/Project/ProjectList";
import {Route, Routes} from "react-router-dom";

const {Header, Content} = Layout;


const PlatformApp = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // 父组件，管理顶部菜单栏的选中和侧边菜单栏值的切换
    const [selectedKey, setSelectedKey] = useState("自动化测试");
    const handleTopMenuClick = (key) => {
        setSelectedKey(key)
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <OuterHeaderMenu selectedKey={selectedKey} onSelect={handleTopMenuClick}/>
            <Layout>
                <SiderMenu selectedKey={selectedKey}/>

                <Layout style={{padding: '0 20px 20px'}}>
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                        <Routes>
                            <Route exact path="/platform/projectList" element={<ProjectList/>}/>
                        </Routes>
                    </Content>
        </Layout>
</Layout>
</Layout>
)
    ;
};
export default PlatformApp;
