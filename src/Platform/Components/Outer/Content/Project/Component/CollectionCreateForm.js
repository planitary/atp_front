import React, {useState, useEffect} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import {addProject} from "../../../../API/Api";
import {useDispatch} from "react-redux";
import {GetProjectList} from "../Store/Modules/ProjectStore";

const {Option} = Select

// project对象
const project = {
    projectId: "",
    projectName: "",
    projectUrl: "",
    remark: "",
    projectGroup: "",
    projectOwner: "",
    projectLevel: "",
    version: 0
}

const CollectionCreateForm = ({form}) => {
    return (
        <Form layout="vertical" form={form} name="form_in_modal">
            <Form.Item
                name="projectName"
                label="项目名称"
                rules={[
                    {
                        required: true,
                        message: '请输入项目名称!',
                    },
                ]}
            >
                <Input placeholder={"请输入项目名称"}/>
            </Form.Item>
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
            <Row gutter={16}>
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
            </Row>
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
        </Form>
    );
};


const CollectionCreateFormModal = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [formInstance, setFormInstance] = useState();
    // 获取表单输入值并发起调用
    const handleFormInfo = async () => {
        try {
            await form.validateFields()
            project.projectName = form.getFieldValue("projectName")
            project.projectLevel = form.getFieldValue("projectLevel")
            project.projectOwner = form.getFieldValue("projectOwner")
            project.projectGroup = form.getFieldValue("projectGroup")
            project.remark = form.getFieldValue("remark")
            project.projectUrl = form.getFieldValue("projectUrl")
            console.log("project:",project)
            addProject(project).then(res => {
                if (res.data.code === '0') {
                    message.success('新增成功!');
                    // 新增完毕后，刷新列表
                    dispatch(GetProjectList(1,10))
                    onCancel();
                }else {
                    message.error(res.data.errMsg)
                }
            })
        }catch (error){
            message.error("请填写必填项")
        }

    }
    return (
        <Modal
            open={open}
            title="新建项目"
            okText="新建"
            cancelText="取消"
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={onCancel}
            destroyOnClose
            onOk={handleFormInfo}
        >
            <CollectionCreateForm
                form={form}
            />
        </Modal>
    );
};

export default CollectionCreateFormModal;
