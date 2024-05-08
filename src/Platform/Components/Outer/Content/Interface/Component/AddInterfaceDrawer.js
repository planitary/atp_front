import React, {useEffect, useState} from 'react';
import {Button, Col, Drawer, Form, Input, message, Row, Select, Space} from 'antd';
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateProject} from "../../../../API/Api";
import ProjectSelector from "./ProjectSelector";
import {Selector} from "antd-mobile";

const {TextArea} = Input


const AddInterfaceDrawer = ({drawerVisible, editData, handleCloseIn, handleCloseOut}) => {


    const interfaceInfo = {...editData}
    const updateDTO = {...interfaceInfo}
    console.log(interfaceInfo)
    const [form] = Form.useForm();

    // 填充表单字段值（注意由于form被useForm管理,所以通常的设置默认值的方法不管用)
    form.setFieldsValue(interfaceInfo);


    // 点击确认调用接口
    const handleConfirmClick = async () => {
        try {
            await form.validateFields()
            // message.success("success",value);
            const value = form.getFieldsValue();
            console.log("value:", value);

            updateDTO.remark = value.remark;
            updateDTO.createUser = value.createUser;
            updateDTO.interfaceName = value.interfaceName;
            updateDTO.interfaceUrl = value.interfaceName;
            updateDTO.requestBody = value.requestBody;

            updateProject(updateDTO).then(res => {
                if (res.data.code === '0') {
                    message.success('编辑成功!');
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
                title="编辑接口"
                width={500}
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
                                name="interfaceName"
                                label="接口名称"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入接口名称',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="interfaceUrl"
                                label="接口url"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入接口url',
                                    },
                                ]}
                                tooltip="接口url从第四级域名开始,例如，在www.test.com/cornerstone/test/data/add中接口url指/data/add"

                            >
                                <Input
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="projectName"
                                label="接口所属项目"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="createUser"
                                label={"维护人"}
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
                        <Col span={23}>
                            <Form.Item
                                name="requestBody"
                                label="接口请求体"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <TextArea rows={5} placeholder={"请以json格式输入该接口的请求参数"}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={10}>
                            <Form.Item
                                name="remark"
                                label="备注"
                                rules={[
                                    {
                                        required:false
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
export default AddInterfaceDrawer;