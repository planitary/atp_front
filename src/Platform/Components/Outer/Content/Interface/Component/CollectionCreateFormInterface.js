import React, {useState, useEffect} from 'react';
import {Button, Col, Form, Input, message, Modal, Row, Select} from 'antd';
import {addInterface, addProject} from "../../../../API/Api";
import {useDispatch, useSelector} from "react-redux";
import {GetInterfaceList, GetProjectList} from "../../../Store/Modules/ProjectStore";
import ProjectSelectorMultiple from "./ProjectSelectorMultiple";
import TextArea from "antd/es/input/TextArea";
import ProjectSelectorSingle from "./ProjectSelectorSingle";

const {Option} = Select

// interface对象
const interfaceDTO = {
    interfaceId: "",
    interfaceName: "",
    interfaceUrl: "",
    requestBody: "",
    projectId: "",
    createUser: "",
    remark: "",
    version: 0,
    projectName: "",
}


const CollectionCreateForm = ({form,onChange}) => {
    // 搜索筛选框默认填充值
    const filledOptionsList = useSelector(state => state.projectList)
    const filledOptions = filledOptionsList.projectList.items

    // const [projectId,setProjectId] = useState("")
    // const handleSetProjectId = (value) => {
    //     setProjectId(value)
    // }
    // interfaceDTO.projectId = projectId

    return (
        <Form layout="vertical" form={form} name="form_in_modal">
            <Form.Item
                name="interfaceName"
                label="接口名称"
                rules={[
                    {
                        required: true,
                        message: '请输入接口名称!',
                    },
                ]}
            >
                <Input placeholder={"请输入接口名称"}/>
            </Form.Item>
            <Form.Item
                name="interfaceUrl"
                label="接口地址前缀"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请输入接口前缀',
                    },
                ]}
                tooltip="接口url从第四级域名开始,例如，在www.test.com/cornerstone/test/data/add中接口url指/data/add"
            >
                <Input
                />
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="projectName"
                        label="接口归属项目"
                        rules={[
                            {
                                required: true,
                                message:"请为接口选择一个项目"
                            },
                        ]}
                    >
                        <ProjectSelectorSingle onchange={onChange}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="interfaceOwner"
                        label="负责人"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Select placeholder="接口维护人">
                            <Option value="Zane">Zane</Option>
                            <Option value="Molly">Molly</Option>
                            <Option value="Cole">Cole</Option>
                            <Option value="Stack">Stack</Option>
                            <Option value="Noah">Noah</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={23}>
                    <Form.Item
                        name="requestBody"
                        label="请求体"
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


const CollectionCreateFormInterfaceModal = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [projectName,setProjectName] = useState("")
    // 获取表单输入值并发起调用
    const handleFormInfo = async () => {
        form.setFieldValue("projectName",projectName)
        try {
            await form.validateFields()
            interfaceDTO.interfaceName = form.getFieldValue("interfaceName")
            interfaceDTO.interfaceUrl = form.getFieldValue("interfaceUrl")
            interfaceDTO.requestBody = form.getFieldValue("requestBody")
            interfaceDTO.createUser = form.getFieldValue("interfaceOwner")
            interfaceDTO.remark = form.getFieldValue("remark")
            interfaceDTO.projectName = projectName
            console.log("interfaceDTO:", interfaceDTO)
            addInterface(interfaceDTO).then(res => {
                if (res.data.code === '0') {
                    message.success('新增成功!');
                    // 新增完毕后，刷新列表
                    dispatch(GetInterfaceList(1, 10))
                    onCancel();
                } else {
                    message.error(res.data.errMsg)
                }
            })
        } catch (error) {
            message.error("请填写必填项")
        }

    }
    const handleChange = (value) => {
        setProjectName(value);
    }
    return (
        <Modal
            open={open}
            title="新建接口"
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
                onChange={handleChange}
            />
        </Modal>
    );
};

export default CollectionCreateFormInterfaceModal;
