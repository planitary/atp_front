import React, { useState } from 'react';
import { Layout, Steps, List, Form, Input, Button, Card, Divider, Row, Col, Select } from 'antd';
import { ContactsTwoTone, HourglassTwoTone } from "@ant-design/icons";
import InterfaceSelectorSingle from "./InterfaceSelectorSingle";
import CodeEditor from "./CodeEditor";
import './CodeEditor.scss'
import {valuesIn} from "lodash/object";
import {Option} from "antd/es/mentions";


const { Header, Content } = Layout;
const { Step } = Steps;

const operateList = [
    { label: '接口调用', value: 'operation_1' },
    { label: 'DB操作', value: 'operation_2' },
    { label: 'Redis操作', value: 'operation_3' },
    { label: 'RPC调用', value: 'operation_4' }
];




// 接口调用表单,搜索出接口后，会按照接口信息自动填充
const OperationForm1 = ({values,handleChange,projectId}) => (
    <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange}>
        <Form.Item label={"接口名"} name={"interfaceName"}>
            <InterfaceSelectorSingle projectId={projectId}/>
        </Form.Item>
        <Form.Item label={"接口url"} name={"interfaceUrl"}>
            <Input />
        </Form.Item>
        <Form.Item label={"传参"} name={"requestBody"}>
            <Input/>
        </Form.Item>

    </Form>

)

// DB操作表单
const OperationForm2 = ({values,handleChange,handleCode,code}) => (
    <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange}>
        <Form.Item label={"说明"}  name={"remark"}>
            <Input />
        </Form.Item>
        <Form.Item label={"sql语句"} name={"DBContent"}>
            <CodeEditor handleCode={handleCode} code={code}/>
        </Form.Item>
    </Form>
)



const AddTCSFormV2 = () => {


    const steps = [
        {
            title: '填写基本信息',
            fields: ['stepName', 'operationType'],
            content: (values, handleChange) => (
                <Form layout="vertical" initialValues={values} onValuesChange={handleChange}>
                    <Form.Item label="步骤名称" name="stepName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="执行方式" name="operationType">
                        <Select options={operateList} />
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: '详细参数',
            fields: ['fieldC', 'fieldD'],
            content: (values, handleChange,handleCode) => {
                const operationType = values.operationType
                switch (operationType) {
                    case 'operation_1':
                        return <OperationForm1 values={values} handleChange={handleChange}/>;
                    case 'operation_2':
                        return <OperationForm2 values={values} handleChange={handleChange} handleCode={handleCode} code={code}/>
                    default:
                        return <div>请选择一个类型</div>
                }
            },
        },
        {
            title: '断言设置',
            fields: ['paramA', 'assertType'],
            content: (values, handleChange) => (
                <Form layout="horizontal" initialValues={values} onValuesChange={handleChange} title={"断言设置"}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="参数A" name="paramA">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label={"表达式"} name={"assertType"}>
                                <Select>
                                    <Option value={'Equal'}>{'='}</Option>
                                    <Option value={'NotEqual'}>{'!='}</Option>
                                    <Option value={'GreaterEqual'}>{'>='}</Option>
                                    <Option value={'LessEqual'}>{'<='}</Option>
                                    <Option value={'Greater'}>{'>'}</Option>
                                    <Option value={'Less'}>{'<'}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="参数B" name="paramB">
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>


                    <Form.Item label="Field F" name="fieldF">
                        <Input />
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: '额外配置',
            fields: ['fieldG', 'fieldH'],
            content: (values, handleChange) => (
                <Form layout="vertical" initialValues={values} onValuesChange={handleChange}>
                    <Form.Item label="Field G" name="fieldG">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Field H" name="fieldH">
                        <Input />
                    </Form.Item>
                </Form>
            ),
        },
    ];
    const [current, setCurrent] = useState(0);

    // 储存当前代码
    const [code,setCode] = useState('')

    // 记录当前操作类型
    const [currentOType,setCurrentOType] = useState('')

    const getFormTitle = () => {
        return
    }

    // 步骤表单收集
    const [formValues, setFormValues] = useState({
        stepName: '',
        operationType: '',
        remark: '',
        DBContent: '',
        interfaceName: '',
        interfaceUrl: '',
        requestBody: '',
        fieldH: '',
        fieldE: '',
        fieldF: '',
        fieldG: '',
    });

    // 操作方式变更后清空之前的表单值
    const clearPrevValue = () => {
        formValues.DBContent = '';
        formValues.interfaceName = '';
        formValues.interfaceUrl = '';
        formValues.remark = "";
        setCode("")
    }

    const handleChange = (changedValues, allValues) => {
        // 第一步判断操作方式是否变更，变更后要清空之前的表单值
        if (currentOType !== changedValues.operationType && current === 0) {
            clearPrevValue()
        }
        console.log(changedValues)
        setFormValues(prevValues => ({
            ...prevValues,
            ...allValues
        }));
    };

    const handleCode = (value) =>{
        setCode(value);
        formValues.DBContent = value;
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const mockInfo = {
        setName: "应走货路由",
        projectName: "Cornerstone",
        remark: "mock数据",
        owner: "Molly罗爽",
        createTime: "2024-06-24 19:04:27"
    };

    // 步骤全部结束后的调用
    const handleFinish = () => {
        console.log(formValues)
    }

    return (
        <Layout style={{ backgroundColor: '#fff' }}>
            <Header style={{ background: '#fff', padding: '0px', height: '120px' }}>
        <span style={{ margin: "0", fontWeight: "850", display: "flex", alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          <ContactsTwoTone style={{ fontSize: "18px", marginRight: "5px" }} />基础信息
        </span>
                <Form layout="horizontal">
                    <Row gutter={10}>
                        <Col span={7}>
                            <Form.Item label="集合名称">
                                {mockInfo.setName}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="所属项目">
                                {mockInfo.projectName}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="创建时间">
                                {mockInfo.createTime}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={7}>
                            <Form.Item label="集合说明">
                                {mockInfo.remark}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="维护人">
                                {mockInfo.owner}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Header>
            <Divider />
            <Content style={{ background: '#fff', padding: '0px' }}>
        <span style={{ margin: "0", fontWeight: "850", display: "flex", alignItems: 'center', justifyContent: 'center', height: '40px' }}>
          <HourglassTwoTone style={{ fontSize: "18px", marginRight: "5px" }} />测试步骤
        </span>
                <Steps current={current} style={{ marginBottom: '20px', width: "100%" }}>
                    {steps.map((item, index) => (<Step key={index} title={item.title} />))}
                </Steps>
                <div style={{ display: 'flex' }}>
                    <List
                        header={<div>配置预览</div>}
                        bordered
                        dataSource={['选项 1', '选项 2', '选项 3']}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        style={{ width: '20%', marginRight: '20px' }}
                    />
                    <Card title="表单内容" style={{ width: '85%' }}>
                        {steps[current].content(formValues, handleChange, handleCode)}
                        <div style={{ marginTop: '24px' }}>
                            {current > 0 && (<Button style={{ margin: '0 8px' }} onClick={prev}>
                                上一步
                            </Button>)}
                            {current < steps.length - 1 && (<Button type="primary" onClick={next}>
                                下一步
                            </Button>)}
                            {current === steps.length - 1 && (<Button type="primary" onClick={handleFinish}>
                                完成
                            </Button>)}

                        </div>
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default AddTCSFormV2;
