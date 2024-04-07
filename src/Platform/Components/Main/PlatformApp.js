import React, {useState} from 'react';
import {LaptopOutlined, NotificationOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Button, Divider, Layout, Menu, theme} from 'antd';
import SiderMenu from "../Outer/OuterSlideMenu/SiderMenu";
import OuterHeaderMenu from "../Outer/OuterHeaderMenu/OuterHeaderMenu";
import ProjectList from "../Outer/Content/Project/ProjectList";
import {Route, Routes} from "react-router-dom";
import "./Platform.scss"
import CollectionCreateForm from "../Outer/Content/Project/Component/CollectionCreateForm";
import CollectionCreateFormModal from "../Outer/Content/Project/Component/CollectionCreateForm";

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
    // 表单赋值
    const [formValue,setFormvalues] = useState();
    // 表单控制
    const [formOpen,setFormOpen] = useState(false);
    const onCreate = (values) => {
        console.log("表单赋值:",values);
        setFormvalues(values);
        setFormOpen(false);
    }
    const onCancel = () => {
        setFormOpen(false)
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
                    <div className={"middle-layout"}>
                        <span className={"middle-add-button"}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined/>}
                            onClick={() => setFormOpen(true)}>新增项目</Button>
                        </span>
                    </div>
                    <CollectionCreateFormModal
                    open={formOpen}
                    onCreate={onCreate}
                    onCancel={onCancel}>
                    </CollectionCreateFormModal>

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
