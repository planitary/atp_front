import {ApartmentOutlined, ApiOutlined, DeploymentUnitOutlined} from "@ant-design/icons";
import React from "react";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

// 自动化测试
const AutoTestNavTitle = [
    getItem('项目', 'sub1', <ApartmentOutlined/>, [
        getItem('新建项目', '/addNewProject'),
        getItem('项目列表', '/projectList'),
    ]),
    getItem('接口', 'sub2', <ApiOutlined/>, [
        getItem('新建接口', 'a1'),
        getItem('接口列表', 'a2'),
        getItem('接口调用', 'a3'),
        getItem('调用记录', 'a4'),
    ]),
]
// UI测试
const UITestNavTitle = [
    getItem('项目', 'sub3', <DeploymentUnitOutlined/>, [
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
const SideMenus = () => {


}

export {AutoTestNavTitle, UITestNavTitle}
export default SideMenus