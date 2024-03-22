import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SiderMenu from "./Components/Outer/OuterSlideMenu/SiderMenu";
import OuterHeaderMenu from "./Components/Outer/OuterHeaderMenu/OuterHeaderMenu";
const { Header, Content } = Layout;
const items1 = ['1', '2', '3',].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const title = ['自动化测试','UI测试','系统管理','帮助'].map((key) => ({
    key,
    label: `${key}`,
}));

const PlatformApp = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <OuterHeaderMenu/>
            <Layout>
                <SiderMenu/>
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
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
export default PlatformApp;
