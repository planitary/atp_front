import {useDispatch, useSelector} from "react-redux";
import {Col, Form, Input, message, Modal, Row, Select} from "antd";
import ProjectSelectorSingle from "../../Interface/Component/ProjectSelectorSingle";
import TextArea from "antd/es/input/TextArea";
import React, {useState} from "react";
import {Option} from "antd/es/mentions";
import TCSInterfaceTable from "./TCSInterfaceTable";
import {addInterface} from "../../../../API/Api";
import {GetInterfaceList} from "../../../Store/Modules/ProjectStore";

// 新增TCS对象
const TCSInfo = {
    setName: "",
    interfaceIds: [],
    remark: "",
    setWeight: 0,
    projectId: "",
    owner: "",
    extractParamDTOS: [{}]
}

const TCSAddCreateForm = ({form, onChange,setInterfaceList,projectInfo}) => {
    console.log(projectInfo)

    // 新增时的原始数据
    const [sourceData, setSourceData] = useState([])

    // 填充后后的新数据
    const handleNewData = (newData) => {
        setInterfaceList(newData)
    }

    return (
        <Form layout="vertical" form={form} name="form_in_modal">
            <Row gutter={23}>
                <Col span={12}>
                    <Form.Item
                        name="setName"
                        label="集合名称"
                        rules={[
                            {
                                required: true,
                                message: '请输入测试集合名称!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入测试集合名称"}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="projectInfo"
                        label="集合所属项目"
                        rules={[
                            {
                                required: true,
                                message: '请选择测试集合所属项目!',
                            },
                        ]}
                        tooltip={"请选择当前集合所属的项目，注意，项目一旦选择后无法更改!"}
                        >
                        <ProjectSelectorSingle onchange={onChange} width={400}/>
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
                                required: true,
                                message: '请输入测试集合名称!',
                            },
                        ]}
                        tooltip={"用1-5表示当前集合在项目中的占比，权重越高，占比越高，说明集合越重要"}
                    >
                        <Select placeholder="集合权重">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
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
                    >
                        <Select placeholder="测试集合负责人">
                            <Option value="Zane">Zane</Option>
                            <Option value="Molly">Molly</Option>
                            <Option value="Cole">Cole</Option>
                            <Option value="Stack">Stack</Option>
                            <Option value="Noah">Noah</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Form.Item
                    name="interfaceList"
                    label="接口列表"
                    rules={[
                        {
                            required: true,
                            message: "请至少选择一个接口!",
                        },
                    ]}
                    tooltip={"在下方列表为当前集合选择接口，输入接口名称会自动进行搜索"}
                >
                    <TCSInterfaceTable sourceData={sourceData}
                                       setNewData={handleNewData}
                                       projectId={projectInfo.id}
                                       />
                </Form.Item>
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


const AddTCSForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    const handleChange = () => {
        return 1
    }

    const [interfaceList,setInterfaceList] = useState("")
    const [projectInfo,setProjectInfo] = useState("")
    const getInterfaceList = (values) => {
        console.log(values)
        setInterfaceList(values)
    }
    // 项目取值
    const fillProject = (value) => {
        setProjectInfo(value)
    }

    // 获取表单输入值并发起调用
    const handleFormInfo = async () => {
        // form.setFieldValue("projectName",projectName)
        console.log("interfaceList:",interfaceList)
        console.log("projectInfo",projectInfo)
        // try {
        //     await form.validateFields()
        //     TCSInfo.setName = form.getFieldValue("setName")
        //     TCSInfo.setWeight = form.getFieldValue("setWeight")
        //     TCSInfo.remark = form.getFieldValue("TCSInfo")
        //     TCSInfo.owner = form.getFieldValue("owner")
        //     TCSInfo.interfaceIds = form.getFieldValue("remark")
        //     console.log("interfaceDTO:", interfaceDTO)
        //     addInterface(interfaceDTO).then(res => {
        //         if (res.data.code === '0') {
        //             message.success('新增成功!');
        //             // 新增完毕后，刷新列表
        //             dispatch(GetInterfaceList(1, 10))
        //             onCancel();
        //         } else {
        //             message.error(res.data.errMsg)
        //         }
        //     })
        // } catch (error) {
        //     message.error("请填写必填项")
    }

    return (
        <Modal
            open={open}
            title={"新建集合"}
            okText="确认"
            cancelText="取消"
            width={950}
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={onCancel}
            destroyOnClose
            onOk={handleFormInfo}
        >
            <TCSAddCreateForm
                form={form}
                onChange={fillProject}
                // 调用子组件获取接口信息，此处调用链为Modal->TCSAddCreateForm->TCSInterfaceTable
                setInterfaceList={getInterfaceList}
                projectInfo={projectInfo}
            />
        </Modal>
    )
}

export default AddTCSForm