import React, { useState } from 'react';
import {Layout, Menu} from 'antd';
import "./OuterHeaderMenu.scss"

const {Header} = Layout
const title = ['自动化测试','UI测试','地址传送门','帮助'].map((key) => ({
    key,
    label: `${key}`,
}));


const OuterHeaderMenu = ({selectedKey,onSelect}) => {
    // 根据顶部菜单，动态改变侧边菜单的值
    const handleTopMenuClick = (e) => {
        onSelect(e.key);
    }
    return (
        <Header className="ant-layout-outer-header">
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['自动化测试']}
                selectedKeys={selectedKey}
                items={title}
                onClick={handleTopMenuClick}
                style={{
                    flex: 10,
                    minWidth: 0,

                }}
            />
        </Header>
    )
};

export default OuterHeaderMenu;