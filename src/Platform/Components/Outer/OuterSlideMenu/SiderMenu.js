import React, {useState} from 'react';
import {
    ApartmentOutlined,
    ApiOutlined, DeploymentUnitOutlined,
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Button, Menu} from 'antd';
import "./SiderMenu.scss"
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

const AutoTestNavTitle = [
    getItem('项目', 'sub1', <ApartmentOutlined/>, [
        getItem('新建项目', 'p1'),
        getItem('项目列表', 'p2'),
    ]),
    getItem('接口', 'sub2', <ApiOutlined/>, [
        getItem('新建接口', 'a1'),
        getItem('接口列表', 'a2'),
        getItem('接口调用', 'a3'),
        getItem('调用记录', 'a4'),
    ]),
]
// 侧边菜单动态展示控制
const displayTitle = (key) => {
    if (key === '自动化测试'){
        return AutoTestNavTitle;
    }
    if (key === 'UI测试'){
        return UITestNavTitle;
    }

}

const UITestNavTitle = [
    getItem('项目', 'sub3', <DeploymentUnitOutlined />, [
        getItem('UI项目', 'd1'),
        getItem('UI图标', 'd2'),
        getItem('步骤维护', 'd3'),
    ]),
    getItem('接口', 'sub4', <ApiOutlined/>, [
        getItem('新建接口', 'a1'),
        getItem('接口列表', 'a2'),
        getItem('接口调用', 'a3'),
        getItem('调用记录', 'a4'),
    ]),
]
// 侧边菜单的所有key
const rootSubMenuKeys = ["sub1", 'sub2'];
const SiderMenu = ({selectedKey}) => {

    const [openKeys, setOpenKeys] = useState(['sub1']);
    // 菜单栏的展开与收缩
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Sider className="ant-layout-sider-nested"
        >
            <Menu className="ant-layout-sider-menu"
                  mode="inline"
                  selectedKeys={[selectedKey]}
                  onOpenChange={onOpenChange}
                  openKeys={openKeys}
                  items={displayTitle(selectedKey)}
            />

        </Sider>
    );
};
export default SiderMenu;