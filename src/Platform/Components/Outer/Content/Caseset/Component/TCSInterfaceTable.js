import React, { useContext, useEffect, useRef, useState } from 'react';
import { Table, Tooltip, Space, Button, Select, Input, message } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import axios from 'axios';
import "./TCSInterfaceTable.scss";
import Form from "antd/es/form/Form";
import InterfaceSelectorSingle from "./InterfaceSelectorSingle";
import {value} from "lodash/seq";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

const TCSInterfaceTable = ({ sourceData,setNewData }) => {
    const [data, setData] = useState(sourceData);
    const [count, setCount] = useState(sourceData.length);

    const handleAdd = () => {
        const newData = {
            interfaceId: `new_${count}`, // 确保每个新数据有唯一的 ID
            interfaceName: '',
            interfaceUrl: '/new/ops',
            remark: '测试',
            requestBody: '',
        };
        setData([...data, newData]);
        setCount(count + 1);
    };

    const handleSelectChange = (selectedOption, record) => {
        console.log("selectedOption",selectedOption)
        console.log("data",record)
        if (selectedOption) {
            // 判断当前列表的数据id是否含有new (筛选新增的那一条数据)
            const newData = data.map(item =>
                item.interfaceId.includes("new")
                    ? { ...item, ...selectedOption }
                    : item
            );
            setData(newData);
            setNewData(newData)
        }
        console.log(data)
    };
    // const handleChange = (selectedOption,record) => {
    //     console.log(selectedOption)
    //     if (selectedOption) {
    //         setData({
    //         });
    //     }
    // }

    const handleDelete = (interfaceId) => {
        const newData = data.filter(item => item.interfaceId !== interfaceId);
        setData(newData);
        setNewData(newData)

    };

    const handleSave = (record) => {
        const newData = [...data];
        const index = newData.findIndex(item => record.interfaceId === item.interfaceId);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...record });
        setData(newData);
    };


    const columns = [
        {
            title: '接口名',
            dataIndex: 'interfaceName',
            render: (text, record) => (
                text === "" ? (
                    <InterfaceSelectorSingle onBlur={() => handleSave(record)}
                                             onChange={handleSelectChange}
                    />
                ) : (
                    <a>{text}</a>
                )
            ),
            width: '20%',
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
            ),
        },
        {
            title: '操作',
            key: 'operationInInterface',
            width: '8%',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleDelete(record.interfaceId)}>
                        <DeleteOutlined style={{ color: "red" }} />
                    </a>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button onClick={handleAdd} type="primary" className="add-button">
                新增接口
            </Button>
            <Table
                rowSelection={{
                    type: "checkbox",
                }}
                pagination={false}
                bordered
                columns={columns}
                dataSource={data}
                scroll={{ y: 300 }}
                rowKey="interfaceId" // 确保Table组件知道如何标识每一行
            />
        </div>
    );
};

export default TCSInterfaceTable;
