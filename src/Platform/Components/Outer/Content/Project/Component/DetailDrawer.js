import React, {useEffect, useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Tooltip} from 'antd';
import {useDispatch} from "react-redux";
import axios from "axios";

const {Option} = Select;


const DetailDrawer = ({drawerVisible, editData, handleClose}) => {
    console.log(editData.projectUrl, editData.projectLevel)
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
                destroyOnClose={true}
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
                                name="group"
                                label="项目所属组"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                                tooltip="若不选择任何组别，则项目被默认归为Admin组"
                                initialValue={editData.projectGroup}
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
                                name="owner"
                                label="负责人"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                                initialValue={editData.projectOwner}
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
                                name="level"
                                label="项目级别"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                                initialValue={getTagText(editData.projectLevel)}
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
                                initialValue={editData.remark}
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