import React from 'react';
import {DownOutlined, FolderAddOutlined, ImportOutlined, PlusOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
};
const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items = [
    {
        label: '通过Excel新增接口',
        key: '1',
        icon: <FolderAddOutlined />
    },
    {
        label: '从JSON新增接口',
        key: '2',
        icon: <ImportOutlined />,
    },
    {
        label: '从swagger新增接口',
        key: '3',
        icon: <ImportOutlined />,
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
const InterfaceAddButton = ({myClassName}) => (

        <Dropdown menu={menuProps} className={myClassName}>
            <Button type={"primary"} icon={<ImportOutlined/>}>
                <Space>
                    批量新增接口
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>

);
export default InterfaceAddButton;