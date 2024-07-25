import {Button, Card, Col, Form, Input, List, Modal, Row, Select, Steps} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import InterfaceSelectorSingle from "../TCSList/InterfaceSelectorSingle";
import CodeEditor from "./CodeEditor";
import debounce from "lodash/debounce";
import InterfaceSelector from "./InterfaceSelector";

const { Step } = Steps;
const FinishModal = ({open}) =>{
    return (
        <Modal
            open={open}

            title={"新增步骤"}
            footer={[
                <Button key={"continue"} type={"primary"}>继续新增</Button>,
                <Button key={"back"}>不再新增</Button>
            ]}>
            <p>当前步骤已新增完成!</p>
        </Modal>
    )
}

const ProgressPage = ({tcsData}) => {
    const [form] = Form.useForm()

    const OperationForm1 = useCallback(({ values, handleChange }) => (
        <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange} form={form}>
            <Form.Item label={"接口名"} name={"interfaceName"}>
                <InterfaceSelector projectId={tcsData.projectId} handleData={handleInterfaceInfo}  />
            </Form.Item>
            <Form.Item label={"接口url"} name={"interfaceUrl"}>
                <Input disabled={true}/>
            </Form.Item>
            <Form.Item label={"传参"} name={"requestBody"}>
                <Input disabled={true}/>
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


    const [current, setCurrent] = useState(0);
    const [code, setCode] = useState('');
    let currentOType;
    // 测试步骤列表
    const [progressList,setProgressList] = useState([])

    const [finishButtonStatus,setStatus] = useState(false)

    // 新增后的对话框状态
    const [open,setOpen] = useState(false)

    const operateList = [
        { label: '接口调用', value: 'operation_1' },
        { label: 'DB操作', value: 'operation_2' },
        { label: 'Redis操作', value: 'operation_3' },
        { label: 'RPC调用', value: 'operation_4' }
    ];

    let interfaceInfo = {
        interfaceName: "",
        interfaceUrl: "",
        interfaceId: "",
        requestBody: ""
    }



    const [formValues, setFormValues] = useState({
        stepName: '',
        operationType: '',
        remark: '',
        DBContent: '',
        interfaceName: '',
        interfaceUrl: '',
        requestBody: '',
        projectId: '',
        fieldH: '',
        fieldE: '',
        fieldF: '',
        fieldG: '',
    });

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

        console.log(currentOType)
        if (currentOType !== changedValues.operationType && current === 0) {
            clearPrevValue();
        }
        setFormValues(prevValues => ({
            ...prevValues,
            ...allValues
        }));
    }, [currentOType, current, clearPrevValue, interfaceInfo.interfaceName, interfaceInfo.interfaceUrl, form]);

    const handleCode = useCallback((value) => {
        setCode(value);
        setFormValues(prevValues => ({
            ...prevValues,
            DBContent: value
        }));
    }, []);

    // 拿到接口信息
    const handleInterfaceInfo = (value) => {
        interfaceInfo = {...value}
        console.log(interfaceInfo)
    }

    const getInterfaceInfo = () => {
        return interfaceInfo;
    }


    // 步骤结束后的确认
    const handleFinish = useCallback(() => {
        const newValue = {...formValues};
        setProgressList(prevList => [...prevList,newValue])
        console.log(formValues)
        setStatus(true)
        setOpen(true)
        Modal.success({
            title: 'success',
            footer: (_) =>(
                <>
                    <Button key={"back"}>不再添加</Button>
                    <Button key={"continue"} type={"primary"}>继续添加</Button>
                </>
            ),
            content:"当前步骤已添加完成，需要继续添加么?"
        });
    }, [formValues]);

    //防抖
    const debouncedHandleFinish = useCallback(
        debounce(handleFinish, 300),
        [handleFinish]
    );

    useEffect(() => {
        return () => {
            debouncedHandleFinish.cancel();
        };
    },[debouncedHandleFinish]);




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

    const next = useCallback(() => {
        setCurrent(current + 1);
    }, [current]);

    const prev = useCallback(() => {
        setCurrent(current - 1);
    }, [current]);

    return (
        <span>
            <Steps current={current} style={{marginBottom: '20px', width: "100%"}}>
                {steps.map((item, index) => (<Step key={index} title={item.title}/>))}
            </Steps>
            <div style={{display: 'flex'}}>
                <List
                    header={<div style={{textAlign: "center", fontWeight: "600"}}>测试计划</div>}
                    bordered = {true}
                    dataSource={progressList}
                    renderItem={(item) => <List.Item key={item.stepName}>{item.stepName}</List.Item>}
                    style={{width: '30%', marginRight: '20px'}}
                />
                <Card title="表单内容" style={{width: '85%'}}>
                    {steps[current].content(formValues, handleChange, handleCode)}
                    <div style={{marginTop: '24px'}}>
                        {current > 0 && (<Button style={{margin: '0 8px'}} onClick={prev}>
                            上一步
                        </Button>)}
                        {current < steps.length - 1 && (<Button type="primary" onClick={next}>
                            下一步
                        </Button>)}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={debouncedHandleFinish} >
                                完成
                            </Button>)}
                    </div>
                </Card>
            </div>
            {/*<FinishModal open={open}/>*/}
        </span>

    )
};
export default ProgressPage