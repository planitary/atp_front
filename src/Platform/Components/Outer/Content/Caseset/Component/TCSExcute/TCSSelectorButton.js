import React from 'react';
import {
    BuildOutlined,
    DotChartOutlined,
    DownOutlined,
    FolderAddOutlined,
    ImportOutlined,
    PlayCircleOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import {Button, Dropdown, message, Space, Tooltip} from 'antd';

const items = [
    {
        label: '用例执行',
        key: '1',
        icon: <PlayCircleOutlined/>
    },
    {
        label: '执行结果',
        key: '2',
        icon: <DotChartOutlined/>
        ,
    },
    {
        label: '转UI自动化',
        key: '3',
        icon: <BuildOutlined/>,
    },
];

const TCSSelectorButton = ({myClassName, onMenuClick}) => {
    const menuProps = {
        items,
        onClick: (e) => {
            onMenuClick(e.key);
        },
    };
    return (
        <Dropdown menu={menuProps} className={myClassName}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    更多操作
                    <DownOutlined/>
                </Space>
            </a>


        </Dropdown>
    )

};
export default TCSSelectorButton;