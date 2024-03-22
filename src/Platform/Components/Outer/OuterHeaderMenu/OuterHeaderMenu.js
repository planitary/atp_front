import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import "./OuterHeaderMenu.scss"

const {Header} = Layout
const title = ['自动化测试','UI测试','系统管理','帮助'].map((key) => ({
    key,
    label: `${key}`,
}));


const OuterHeaderMenu = () => {
    return (
        <Header className="ant-layout-outer-header">
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
    )
};

export default OuterHeaderMenu;