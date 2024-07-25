import React, { useState, useCallback } from 'react';
import { Layout, Steps, List, Form, Input, Button, Card, Divider, Row, Col, Select } from 'antd';
import {ContactsTwoTone, HourglassTwoTone, PieChartOutlined} from "@ant-design/icons";
import InterfaceSelectorSingle from "../TCSList/InterfaceSelectorSingle";
import CodeEditor from "./CodeEditor";
import './CodeEditor.scss';
import { useLocation } from "react-router-dom";
import EmptyPage from "./EmptyPage";

const { Header, Content } = Layout;
const { Step } = Steps;

const AddTCSFormV2 = () => {
    const [form] = Form.useForm();
    const operateList = [
        { label: '接口调用', value: 'operation_1' },
        { label: 'DB操作', value: 'operation_2' },
        { label: 'Redis操作', value: 'operation_3' },
        { label: 'RPC调用', value: 'operation_4' }
    ];

    const location = useLocation();
    // const { tcsData } = location.state || {};
    // mock数据
    const {mockData} = location.state || {}
    const  tcsData = mockData;
    console.log(tcsData.stepsData.length)

    const [current, setCurrent] = useState(0);
    const [code, setCode] = useState('');
    const [currentOType, setCurrentOType] = useState('');
    const [formValues, setFormValues] = useState({
        stepName: '',
        operationType: '',
        remark: '',
        DBContent: '',
        name: '',
        interfaceUrl: '',
        requestBody: '',
        projectId: '',
        fieldH: '',
        fieldE: '',
        fieldF: '',
        fieldG: '',
    });

    const [progressPage,setProgressPage] = useState(false)

    // 空白页新增按钮的回调
    const handlePage = (value) =>{
        console.log(value)
        setProgressPage(value)
    }

    const clearPrevValue = useCallback(() => {
        setFormValues(prevValues => ({
            ...prevValues,
            DBContent: '',
            name: '',
            interfaceUrl: '',
            remark: '',
        }));
        setCode('');
    }, []);

    const handleChange = useCallback((changedValues, allValues) => {

        if (currentOType !== changedValues.operationType && current === 0) {
            clearPrevValue();
        }
        setFormValues(prevValues => ({
            ...prevValues,
            ...allValues
        }));
    }, [current, currentOType, clearPrevValue]);

    const handleCode = useCallback((value) => {
        setCode(value);
        setFormValues(prevValues => ({
            ...prevValues,
            DBContent: value
        }));
    }, []);

    const next = useCallback(() => {
        setCurrent(current + 1);
    }, [current]);

    const prev = useCallback(() => {
        setCurrent(current - 1);
    }, [current]);

    const handleFinish = useCallback(() => {
        console.log(formValues);
    }, [formValues]);

    const OperationForm1 = useCallback(({ values, handleChange }) => (
        <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange} form={form}>
            <Form.Item label={"接口名"} name={"name"}>
                <InterfaceSelectorSingle projectId={tcsData.projectId} />
            </Form.Item>
            <Form.Item label={"接口url"} name={"interfaceUrl"}>
                <Input />
            </Form.Item>
            <Form.Item label={"传参"} name={"requestBody"}>
                <Input />
            </Form.Item>
        </Form>
    ), [form, tcsData.projectId]);

    const OperationForm2 = useCallback(({ values, handleChange, handleCode, code }) => (
        <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange}>
            <Form.Item label={"说明"} name={"remark"}>
                <Input />
            </Form.Item>
            <Form.Item label={"sql语句"} name={"DBContent"}>
                <CodeEditor handleCode={handleCode} code={code} />
            </Form.Item>
        </Form>
    ), []);

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
            content: (values, handleChange, handleCode) => {
                const operationType = values.operationType;
                switch (operationType) {
                    case 'operation_1':
                        return <OperationForm1 values={values} handleChange={handleChange} />;
                    case 'operation_2':
                        return <OperationForm2 values={values} handleChange={handleChange} handleCode={handleCode} code={code} />;
                    default:
                        return <div>请选择一个类型</div>;
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
                                    <Select.Option value={'Equal'}>{'='}</Select.Option>
                                    <Select.Option value={'NotEqual'}>{'!='}</Select.Option>
                                    <Select.Option value={'GreaterEqual'}>{'>='}</Select.Option>
                                    <Select.Option value={'LessEqual'}>{'<='}</Select.Option>
                                    <Select.Option value={'Greater'}>{'>'}</Select.Option>
                                    <Select.Option value={'Less'}>{'<'}</Select.Option>
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

    return (
        <Layout style={{ backgroundColor: '#fff' }}>
            <Header style={{ background: '#fff', padding: '0px', height: '120px' }}>
                <span style={{
                    margin: "0",
                    fontWeight: "850",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px'
                }}>
                    <ContactsTwoTone style={{ fontSize: "18px", marginRight: "5px" }} />基础信息
                </span>
                <Form layout="horizontal">
                    <Row gutter={10}>
                        <Col span={7}>
                            <Form.Item label="集合名称">
                                {tcsData.setName}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="所属项目">
                                {tcsData.projectName}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="创建时间">
                                {tcsData.createTime}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={7}>
                            <Form.Item label="集合说明">
                                {tcsData.remark}
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="维护人">
                                {tcsData.owner}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Header>
            <Divider />

                <Content style={{ background: '#fff', padding: '0px' }}>
                <span style={{
                    margin: "0",
                    fontWeight: "850",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px'
                }}>

                    <HourglassTwoTone style={{ fontSize: "18px", marginRight: "5px" }}/>测试步骤
                    {/*<PieChartOutlined  style={{ fontSize: "18px", marginRight: "5px" }}/>测试步骤*/}
                </span>

                    {/*无数据且步骤页标记为false时展示空白页*/}
                    {tcsData.stepsData.length === 0 && !progressPage ? (<EmptyPage handlePage={handlePage}/>) : (<span>
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
                    </span>)
                    }

                </Content>


        </Layout>
    );
};

export default AddTCSFormV2;
