import React, {useState} from 'react';
import {LaptopOutlined, NotificationOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Button, Divider, Layout, Menu, theme} from 'antd';
import SiderMenu from "../Outer/OuterSlideMenu/SiderMenu";
import OuterHeaderMenu from "../Outer/OuterHeaderMenu/OuterHeaderMenu";
import ProjectList from "../Outer/Content/Project/ProjectList";
import CaseSetList from "../Outer/Content/Caseset/CaseSetList"
import {Route, Routes} from "react-router-dom";
import "./Platform.scss"
import CollectionCreateForm from "../Outer/Content/Project/Component/CollectionCreateForm";
import CollectionCreateFormModal from "../Outer/Content/Project/Component/CollectionCreateForm";
import InterfaceList from "../Outer/Content/Interface/InterfaceList";
import CaseSetExecute from "../Outer/Content/Caseset/CaseSetExecute";
import AddTCSFormV2 from "../Outer/Content/Caseset/Component/TCSProgress/AddTCSFormV2";

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
                            <Route exact path="/platform/project/projectList" element={<ProjectList/>}/>
                            <Route exact path="/platform/interface/interfaceList" element={<InterfaceList/>}/>
                            <Route exact path="/platform/caseset/casesetList" element={<CaseSetList/>}/>
                            <Route exact path="/platform/caseset/casesetExecute" element={<CaseSetExecute/>}/>
                            <Route exact path="/platform/caseset/editProgress" element={<AddTCSFormV2/>}/>
                        </Routes>

                    </Content>
        </Layout>
</Layout>
</Layout>
)
    ;
};
export default PlatformApp;
