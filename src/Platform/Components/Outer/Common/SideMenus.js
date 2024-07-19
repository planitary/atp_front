import {ApartmentOutlined, ApiOutlined, DeploymentUnitOutlined, FolderOutlined} from "@ant-design/icons";
import React from "react";
import {get} from "axios";

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
    getItem('项目', 'ATSub1', <ApartmentOutlined/>, [
        getItem('新建项目', '/addNewProject'),
        getItem('项目列表', '/project/projectList'),
    ]),
    getItem('接口', 'ATSub2', <ApiOutlined/>, [
        getItem('新建接口', 'a1'),
        getItem('接口列表', '/interface/interfaceList'),
        getItem('接口调用', 'a3'),
        getItem('调用记录', 'a4'),
    ]),
    getItem('测试集合','ATSub3',<FolderOutlined />,[
        getItem('测试集合列表','/caseset/casesetList'),
        getItem("集合执行",'/caseset/casesetExecute'),
        getItem('集合维护站','c2'),
    ])
]
// UI测试
const UITestNavTitle = [
    getItem('项目', 'UTSub1', <DeploymentUnitOutlined/>, [
        getItem('UI项目', 'd1'),
        getItem('UI图标', 'd2'),
        getItem('步骤维护', 'd3'),
    ]),
    getItem('接口', 'UTSub2', <ApiOutlined/>, [
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