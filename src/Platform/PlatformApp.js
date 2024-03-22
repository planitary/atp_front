import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SliderMenu from "./Components/Outer/OuterSlideMenu/SliderMenu";
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
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['自动化测试']}
                    items={title}
                    style={{
                        flex: 10,
                        minWidth: 0,
                    }}
                />
            </Header>
            <Layout>
                <SliderMenu/>
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
