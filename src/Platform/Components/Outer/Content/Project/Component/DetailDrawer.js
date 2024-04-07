import React, {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Alert, Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space, Tooltip} from 'antd';
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateProject} from "../../../../API/Api";

const {Option} = Select;


const DetailDrawer = ({drawerVisible, editData, handleCloseIn, handleCloseOut}) => {


    // 标签动态映射(文本)
    const getTagText = (level) => {
        switch (level) {
            case '1':
                return '最高';
            case '2':
                return '高';
            case '3':
                return '中';
            case '4':
                return '低';
            default :
                return '中'
        }
    }
    // console.log(editData)
    const project = {...editData}
    project.projectLevel = getTagText(editData.projectLevel)
    const [form] = Form.useForm();
    // if (editData.projectLevel === '1') {
    //     project.projectLevel = '最高';
    // }
    // if (editData.projectLevel === '2') {
    //     project.projectLevel = '高';
    // }
    // if (editData.projectLevel === '3') {
    //     project.projectLevel = '中';
    // }
    // if (editData.projectLevel === '4') {
    //     project.projectLevel = '低';
    // }

    // 填充表单字段值（注意由于form倍useForm管理,所以通常的设置默认值的方法不管用)
    form.setFieldsValue(project);


    // 点击确认调用接口
    const handleConfirmClick = async () => {
        try {
            await form.validateFields()
            // message.success("success",value);
            const value = form.getFieldsValue();
            console.log("value:", value);
            if (value.projectGroup === null) {
                editData.projectGroup = "";
            }
            else {
                editData.projectGroup = value.projectGroup;
            }

            editData.projectName = value.projectName;
            editData.projectLevel = value.projectLevel;
            editData.projectOwner = value.projectOwner;
            editData.remark = value.remark;
            editData.projectUrl = value.projectUrl;
            updateProject(editData).then(res => {
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
                title="编辑项目"
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
                                name="projectName"
                                label="项目名称"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入项目名称',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="projectUrl"
                                label="项目接口前缀"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入项目接口前缀',
                                    },
                                ]}
                                tooltip="前缀指紧跟一级域名后的二三级域名,例如，在www.test.com/cornerstone/test/data/add中项目前缀指/cornerstone/test"

                            >
                                <Input
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="projectGroup"
                                label="项目所属组"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                                tooltip="若不选择任何组别，则项目被默认归为Admin组"
                            >
                                <Select placeholder="请选择一个组别">
                                    <Option value="cornerstone">Cornerstone</Option>
                                    <Option value="hermes">Hermes</Option>
                                    <Option value="admin">Admin</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="projectOwner"
                                label="负责人"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select placeholder="请为项目指定负责人">
                                    <Option value="Noah">Noah</Option>
                                    <Option value="Zane">Zane</Option>
                                    <Option value="Blade">Blade</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="projectLevel"
                                label="项目级别"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Select placeholder="请确定项目级别">
                                    <Option value="highest">最高</Option>
                                    <Option value="high">高</Option>
                                    <Option value="middle">中</Option>
                                    <Option value="low">低</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="remark"
                                label="备注"
                                rules={[
                                    {
                                        required: false,
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
export default DetailDrawer;