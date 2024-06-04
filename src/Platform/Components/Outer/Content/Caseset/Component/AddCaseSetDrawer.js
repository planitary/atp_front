import React, {useEffect, useState} from 'react';
import {Button, Col, Drawer, Form, Input, message, Row, Select, Space} from 'antd';
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateCaseSet, updateInterface, updateProject} from "../../../../API/Api";
import {Selector} from "antd-mobile";
import TCSInterfaceTable from "./TCSInterfaceTable";

const {TextArea} = Input


const AddCaseSetDrawer = ({drawerVisible, editData, handleCloseIn, handleCloseOut}) => {


    const caseSetInfo = {...editData}
    const updateDTO = {
        owner:"",
        setId: caseSetInfo.setId,
        remark:"",
        projectName:"",
        setName:"",
        serWeight:"",
        interfaceInfoSIPDTOS: [],
        interfaceIds:[],
        projectId:""
    }
    console.log("caseSetInfo", caseSetInfo)

    const [form] = Form.useForm();

    // 填充表单字段值（注意由于form被useForm管理,所以通常的设置默认值的方法不管用)
    form.setFieldsValue(caseSetInfo);


    // 点击确认调用接口
    const handleConfirmClick = async () => {
        try {
            await form.validateFields()
            // message.success("success",value);
            const value = form.getFieldsValue();
            console.log("value:", value);

            updateDTO.owner = value.owner;
            updateDTO.projectId = caseSetInfo.projectId;
            updateDTO.remark = value.remark;
            updateDTO.projectName = value.projectName;
            updateDTO.setName = value.setName;
            updateDTO.setWeight = value.setWeight;
            updateDTO.interfaceInfoSIPDTOS = value.interfaceInfoSIPDTOS;
            // 检查 value.interfaceInfoSIPDTOS 是否存在并且是数组
            if (Array.isArray(value.interfaceInfoSIPDTOS)) {
                // 确保 updateDTO.interfaceIds 已经初始化为一个数组
                if (!Array.isArray(updateDTO.interfaceIds)) {
                    updateDTO.interfaceIds = [];
                }

                // 使用 forEach 方法遍历数组并推入 interfaceId
                value.interfaceInfoSIPDTOS.forEach((item) => {
                    updateDTO.interfaceIds.push(item.interfaceId);
                });
            }

            console.log("updateDTO",updateDTO)


            updateCaseSet(updateDTO).then(res => {
                if (res.data.code === '0') {
                    message.success('编辑成功!');
                    // 回调成功后清空对象
                    updateDTO.owner = ""
                    updateDTO.remark = ""
                    updateDTO.projectName = ""
                    updateDTO.setName = ""
                    updateDTO.setWeight = ""
                    updateDTO.interfaceInfoSIPDTOS = []
                    updateDTO.interfaceIds = []
                    updateDTO.projectId = ""
                    handleCloseIn();
                } else {
                    message.error(res.data.errMsg)
                }

            })
        } catch (error) {
            message.error("请填写必填项");
        }
    }


    // const projectInfo = {
    //     projectId: editData.projectId
    // }


    return (
        <>
            <Drawer
                title="编辑集合"
                width={1000}
                mask={true}
                onClose={handleCloseOut}
                open={drawerVisible}
                destroyOnClose={true}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={handleCloseOut}>取消</Button>
                        <Button onClick={handleConfirmClick} type="primary">
                            确认
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="setName"
                                label="集合名称"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入集合名称',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="projectName"
                                label="项目名"
                                hasFeedback
                            >
                                <Input disabled={true}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="setWeight"
                                label="集合权重"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >

                                <Select options={[
                                    {
                                        value: '1',
                                        label: '1',
                                    },
                                    {
                                        value: '2',
                                        label: '2',
                                    },
                                    {
                                        value: '3',
                                        label: '3',
                                    },
                                    {
                                        value: '4',
                                        label: '4',
                                    },
                                    {
                                        value: '5',
                                        label: '5',
                                    }
                                ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="维护人"
                                rules={[
                                    {
                                        required: false
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Form.Item
                            name="interfaceInfoSIPDTOS"
                            label="接口列表"
                            tooltip={"用例集合执行时，将按照列表顺序依次对接口进行调用，可对行进行拖曳更改顺序"}
                        >
                            todo:// 拖曳排序放后面实现吧
                            <TCSInterfaceTable data={caseSetInfo.interfaceInfoSIPDTOS}/>
                        </Form.Item>
                    </Row>
                    <Row gutter={10}>
                        <Col span={10}>
                            <Form.Item
                                name="remark"
                                label="备注"
                                rules={[
                                    {
                                        required: false
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default AddCaseSetDrawer;