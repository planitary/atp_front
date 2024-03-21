import React, {useState} from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined, LaptopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, NotificationOutlined,
    PieChartOutlined, UserOutlined,
} from '@ant-design/icons';
import {Button, Menu} from 'antd';
import "./SliderMenu.scss"
import Sider from "antd/es/layout/Sider";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(6).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const SliderMenu = () => {
    return (
        <Sider className="ant-layout-sider-nested"
        >
            <Menu className="ant-layout-sider-menu"
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items2}
            />
        </Sider>
    );
};
export default SliderMenu;