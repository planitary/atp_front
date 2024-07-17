import React from 'react';
import {CopyOutlined, DownOutlined, EditOutlined, FileAddOutlined, SmileOutlined} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer">
                编辑
            </a>
        ),
        icon: <EditOutlined />
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" >
                归纳
            </a>
        ),
        icon: <FileAddOutlined />

    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer">
                复制
            </a>
        ),
        icon: <CopyOutlined />
    },
    {
        key: '4',
        label: (
            <a target={"_blank"} rel={"noopener noreferrer"}>
                提取用例（暂不可用)
            </a>
        ),
        disabled:true

    }
];
const ExeCuteDropButton = () => (
    <Space wrap>
    <Dropdown
        menu={{
                items,
            }}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                更多
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
    </Space>
);
export default ExeCuteDropButton;