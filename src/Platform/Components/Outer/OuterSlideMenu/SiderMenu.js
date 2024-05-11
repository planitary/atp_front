import React, {useState} from 'react';

import {Button, Menu} from 'antd';
import "./SiderMenu.scss"
import Sider from "antd/es/layout/Sider";
import {AutoTestNavTitle, UITestNavTitle} from "../Common/SideMenus";
import {useNavigate} from "react-router-dom";


// 侧边菜单的所有key
const rootSubMenuKeys = ["ATSub1", 'ATSub2', 'ATSub3','UTSub1', 'UTSub2'];
// 侧边菜单动态展示控制
const displayTitle = (key) => {
    if (key === '自动化测试') {
        return AutoTestNavTitle;
    }
    if (key === 'UI测试') {
        return UITestNavTitle;
    }
}
const SiderMenu = ({selectedKey}) => {


    const [openKeys, setOpenKeys] = useState(['ATSub1']);
    // 菜单栏的展开与收缩
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const navigate = useNavigate();
    const [currentKey,setCurrentKey] = useState("");

    // 路由控制
    const switchRoute = (key) => {
        console.log('跳转路由:',key)
        console.log(key.key)
        setCurrentKey(key.key)
        navigate(`/platform${key.key}`)
    }
    return (
        <Sider className="ant-layout-sider-nested"
        >
            <Menu className="ant-layout-sider-menu"
                  mode="inline"
                  selectedKeys={[currentKey]}
                  onOpenChange={onOpenChange}
                  openKeys={openKeys}
                  items={displayTitle(selectedKey)}
                  onSelect={switchRoute}
            />


        </Sider>
    );
};
export default SiderMenu;