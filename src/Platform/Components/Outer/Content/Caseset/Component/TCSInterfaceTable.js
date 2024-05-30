import React, { useState } from 'react';
import {Table, Radio, Divider, Tooltip} from 'antd';

const columns = [
    {
        title: '接口名',
        dataIndex: 'interfaceName',
        render: (text) => <a>{text}</a>,
        width: '15%'
    },
    {
        title: '接口url',
        dataIndex: 'interfaceUrl',
    },
    {
        title: '备注',
        dataIndex: 'remark',

    },
    {
        title: '请求体',
        dataIndex: 'requestBody',
        width: '20%',
        ellipsis: {
            showTitle: false,
        },
        render: (requestBody) => (
            <Tooltip placement="topLeft" title={requestBody}>
                {requestBody}
            </Tooltip>
        )
    }
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.interfaceName === 'Disabled User', // Column configuration not to be checked
        name: record.interfaceName,
    }),
};

const TCSInterfaceTable = ({ data }) => {
    console.log(data)


    return (
        <div>

            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                rowKey="interfaceId" // 确保Table组件知道如何标识每一行
            />
        </div>
    );
};

export default TCSInterfaceTable;
