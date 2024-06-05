import React, {useContext, useEffect, useRef, useState} from 'react';
import {Table, Radio, Divider, Tooltip, Space, Button, Select} from 'antd';
import {DeleteOutlined, DeleteTwoTone} from "@ant-design/icons";
import "./TCSInterfaceTable.scss"

const EditableContext = React.createContext(null);

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.interfaceName === 'Disabled User', // Column configuration not to be checked
        name: record.interfaceName,
    }),
};

const TCSInterfaceTable = ({ sourceData }) => {
    const [editing, setEditing] = useState(false);
    const ref = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            ref.current?.focus();
        }
    }, [editing]);


    console.log(sourceData)
    const [data, setData] = useState(sourceData);
    const [count,setCount] = useState(sourceData.length)
    const handleAdd = () => {
        const newData = {
            // 这里的值后续通过接口填充
            interfaceId:'',
            interfaceName: '',
            interfaceUrl: '/new/ops',
            remark: '测试',
            requestBody: '',
        };
        setData([...sourceData,newData])
        setCount(count + 1)
    }

    const handleSave = (record) => {
        console.log("row",record)
        const newData = [...data];
        console.log("newData:",newData)
        const index = newData.findIndex((item) => record.interfaceId === item.interfaceId);
        const item = newData[index];
        newData.splice(index,1,{
            ...item,
            ...record,
        })
        setData(newData)
    }
    const columns = [
        {
            title: '接口名',
            dataIndex: 'interfaceName',
            // 根据接口名动态选择样式，有值时展示文字，无值时展示搜索框
            render: (text,record) => (
                // console.log(text)
                text === "" ? <Select options={[
                    {
                        value: '1',
                        label: '1',
                    },
                    {
                        value: '2',
                        label: '2',
                    }
                ]} ref={ref} onBlur={handleSave}/> : <a>{text}</a>
            ),
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
            width: '25%',
            ellipsis: {
                showTitle: false,
            },
            render: (requestBody) => (
                <Tooltip placement="topLeft" title={requestBody}>
                    {requestBody}
                </Tooltip>
            )
        },
        {
            title: '操作',
            key: 'operationInInterface',
            width: '8%',
            render: (_, record) => (
                <Space size="middle">
                    {/*<a ><DeleteTwoTone  twoToneColor={"red"} /></a>*/}
                    <a><DeleteOutlined style={{color:"red"}}/> </a>
                </Space>
            )
        }
    ];
    return (
        <div>
            <Button onClick={handleAdd} type="primary" className="add-button">
                新增接口
            </Button>
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                pagination={false}
                bordered
                columns={columns}
                dataSource={data}
                scroll={{y:300}}
                rowKey= {sourceData.interfaceId} // 确保Table组件知道如何标识每一行
            />
        </div>
    );
};

export default TCSInterfaceTable;
