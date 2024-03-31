import React, {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space} from 'antd';
import {useDispatch} from "react-redux";
import {GetProjectDetail} from "../Store/Modules/ProjectStore";
import axios from "axios";

const {Option} = Select;


const DetailDrawer = ({drawerVisible, editData, handleOpen, handleClose}) => {
    console.log(editData.projectUrl)
    // const projectInfo = {
    //     projectId: editData.projectId
    // }
    return (
        <>
            <Drawer
                title="编辑项目"
                width={500}
                mask={true}
                onClose={handleClose}
                open={drawerVisible}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={handleClose}>取消</Button>
                        <Button onClick={handleClose} type="primary">
                            确认
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="projectName"
                                label="项目名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入项目名称',
                                    },
                                ]}
                                initialValue={editData.projectName}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label="项目接口前缀"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入项目接口前缀',
                                    },
                                ]}
                                initialValue={editData.projectUrl}
                            >
                                <Input
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Owner"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an owner',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the type',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the approver',
                                    },
                                ]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please choose the dateTime',
                                    },
                                ]}
                            >
                                <DatePicker.RangePicker
                                    style={{
                                        width: '100%',
                                    }}
                                    getPopupContainer={(trigger) => trigger.parentElement}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default DetailDrawer;