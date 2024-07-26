import {Button, Card, Col, Form, Input, List, Modal, Row, Select, Space, Steps} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import InterfaceSelectorSingle from "../TCSList/InterfaceSelectorSingle";
import CodeEditor from "./CodeEditor";
import debounce from "lodash/debounce";
import InterfaceSelector from "./InterfaceSelector";
import './CodeEditor.scss'
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";

const {Step} = Steps;

const ProgressPage = ({tcsData}) => {
    
    const [form] = Form.useForm()
    const [current, setCurrent] = useState(0);
    const [code, setCode] = useState('');
    let currentOType;
    // 测试步骤列表
    const [progressList, setProgressList] = useState([])

    // 接口新增
    const OperationForm1 = useCallback(({values, handleChange}) => (
        <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange}
              form={form} preserve={false}  className={"interface-add-label"} >
            <Form.Item label={"接口名"} name={"interfaceName"} rules={[
                {
                    required: true,
                    message: "请选定一个接口"
                }
            ]}>
                <InterfaceSelector projectId={tcsData.projectId} />
            </Form.Item>
            <Form.Item label={"接口url"} name={"interfaceUrl"} labelAlign={"left"}>
                <Input disabled={true}/>
            </Form.Item>
            <Form.Item label={"传参"} name={"requestBody"} labelAlign={"left"}>
                <Input disabled={true}/>
            </Form.Item>
        </Form>
    ), [form, tcsData.projectId]);

    // code输入
    const OperationForm2 = useCallback(({values, handleChange, handleCode, code}) => (
        <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange} preserve={false}>
            <Form.Item label={"说明"} name={"remark"} className={"code-editor-label"}>
                <Input/>
            </Form.Item>
            <Form.Item label={"sql语句"} name={"DBContent"}>
                <CodeEditor handleCode={handleCode} code={code}/>
            </Form.Item>
        </Form>
    ), []);

    // 断言筛选项
    const AssertSelect = ({value,onChange}) => {
        return (
            <Select onChange={onChange} value={value}>
                <Select.Option value={'Equals'}>{'='}</Select.Option>
                <Select.Option value={'NotEquals'}>{'!='}</Select.Option>
                <Select.Option value={'GreaterEquals'}>{'>='}</Select.Option>
                <Select.Option value={'LessEquals'}>{'<='}</Select.Option>
                <Select.Option value={'Greater'}>{'>'}</Select.Option>
                <Select.Option value={'Less'}>{'<'}</Select.Option>
            </Select>

        )
    }

    // 额外配置筛选项
    const ExtraSelect = ({value,onChange}) => {
        return (
        <Select defaultValue={"接口响应超时时间"} value={value} onChange={onChange} name>
            <Select.Option value={"InterfaceResTimeOut"}>接口响应超时时间</Select.Option>
            <Select.Option value={"SqlExeTimeOut"}>Sql执行超时时间</Select.Option>
            <Select.Option value={"ConnectTimeOut"}>连接超时时间</Select.Option>
            <Select.Option value={"waitTimeOut"}>等待时间</Select.Option>
        </Select>
        )}

    // 断言动态表单
    const DynamicAssertForm = useCallback(({values, handleChange}) => (
        <Form layout="horizontal" initialValues={values} onValuesChange={handleChange} preserve={false}
              title={"断言设置"} name={"asserts"}>
            <Form.List name={"asserts"}>
                {(fields, {add, remove}) => (
                    <div style={{width:'100%'}}>
                        {fields.map(({key, name, ...restField}) => (
                            <Space key={key} style={{display: "flex", marginBottom: 8}} align={"baseline"}>
                                <Row gutter={16} >
                                    <Col span={9}>
                                        <Form.Item label="参数A" name={[name, 'param']} {...restField}
                                        rules={[
                                            {
                                                required: true,
                                                message:'参数缺失'
                                            }
                                        ]}>
                                            <Input placeholder={"断言参数"} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label={"表达式"} name={[name, 'assertType']} {...restField}
                                        rules={[
                                            {
                                                required:true,
                                                message:"请选择一个表达式"
                                            }
                                        ]}>
                                            <AssertSelect/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={9}>
                                        <Form.Item label="参数B" name={[name, 'value']} {...restField}
                                                   rules={[
                                                       {
                                                           required: true,
                                                           message:'参数缺失'
                                                       }
                                                   ]}>
                                            <Input placeholder={'断言值'}/>

                                        </Form.Item>
                                    </Col>
                                </Row>
                                <MinusCircleOutlined onClick={() => remove(name)}/>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type={"dashed"} onClick={() => add()} block icon={<PlusOutlined />} >
                                新增一行
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form.List>

        </Form>
    ), []);

    // 额外配置动态表单
    // const DynamicExtraForm = useCallback(({values,handleChange}) => (
    //     <Form layout={"horizontal"} initialValues={values} onValuesChange={handleChange} preserve={false}
    //           title={"额外配置"} name={"extras"}>
    //         <Form.List name={"extras"}>
    //             {(fields,{add,remove}) =>(
    //                 <>
    //                     {fields.map(({key,name,...restField}) => (
    //                         <Space key={key} style={{display: "flex",marginBottom:8}} align={"baseline"}>
    //                             <Input addonBefore={ExtraSelect(values,handleChange)} addonAfter={"ms"} style={{width:"100%"}}/>
    //                             <MinusCircleOutlined onClick={() => remove(name)}/>
    //                         </Space>
    //                     ))}
    //                     <Form.Item>
    //                         <Button type={"dashed"} onClick={() => add()} block icon={<PlusOutlined />}>新增一行
    //                         </Button>
    //                     </Form.Item>
    //                 </>
    //             )}
    //         </Form.List>
    //     </Form>
    // ),[]);



    const operateList = useMemo(() => [
        {label: '接口调用', value: 'operation_1'},
        {label: 'DB操作', value: 'operation_2'},
        {label: 'Redis操作', value: 'operation_3'},
        {label: 'RPC调用', value: 'operation_4'}
    ],[])

    const steps = useMemo(() => [
        {
            title: '填写基本信息',
            fields: ['stepName', 'operationType'],
            content: (values, handleChange) => (
                <Form layout="horizontal" initialValues={values} onValuesChange={handleChange} preserve={false}
                      form={form} >
                    <Form.Item label="步骤名称" name="stepName" rules={[
                        {
                            required:true,
                            message:"请输入步骤说明"
                        },
                    ]} hasFeedback>
                        <Input />
                    </Form.Item>
                    <Form.Item label="执行方式" name="operationType" rules={[
                        {
                            required: true,
                            message:"请选择一个执行步骤"
                        }
                    ]}>
                        <Select options={operateList}/>
                    </Form.Item>
                </Form>
            ),
        },
        {
            title: '编辑详细参数',
            content: (values, handleChange, handleCode) => {
                const operationType = values.operationType;
                switch (operationType) {
                    case 'operation_1':
                        return <OperationForm1 values={values} handleChange={handleChange}/>;
                    case 'operation_2':
                        return <OperationForm2 values={values} handleChange={handleChange} handleCode={handleCode}
                                               code={code}/>;
                    default:
                        return <div>请选择一个类型</div>;
                }
            },
        },
        {
            title: '断言设置',
            fields: ['asserts'],
            content: (values, handleChange) => (
                <DynamicAssertForm values={values} handleChange={handleChange}/>
            ),
        },
        {
            title: '额外配置',
            fields: ['interfaceTimeOut', 'sqlTimeOut'],
            content: (values, handleChange) => (
                // <DynamicExtraForm values={values} handleChange={handleChange}/>
                <Form layout="horizontal" initialValues={values} onValuesChange={handleChange} preserve={false} form={form}>

                    <Form.Item label="额外配置" name="extra">
                        <Input addonBefore={
                            <Form.Item name={"ExtraType"} noStyle initialValue={"接口响应超时时间"}>
                                <Select  value={values} onChange={handleChange}>
                                    <Select.Option value={"InterfaceResTimeOut"}>接口响应超时时间</Select.Option>
                                    <Select.Option value={"SqlExeTimeOut"}>Sql执行超时时间</Select.Option>
                                    <Select.Option value={"ConnectTimeOut"}>连接超时时间</Select.Option>
                                    <Select.Option value={"WaitTimeOut"}>等待时间</Select.Option>
                                </Select>
                            </Form.Item>
                        } addonAfter={"ms"}/>
                    </Form.Item>
                </Form>
            ),
        },
    ],[form, operateList, code]);

    let interfaceInfo = {
        interfaceName: "",
        interfaceUrl: "",
        interfaceId: "",
        requestBody: ""
    }


    const [formValues, setFormValues] = useState({});

    const clearPrevValue = useCallback(() => {
        setFormValues({
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
        setCode('');
    }, []);

    // const handleChange = useCallback((changedValues, allValues) => {
    //     console.log(changedValues);
    //     setFormValues(allValues);
    // }, []);


    const handleChange = useCallback((changedValues, allValues) => {
        if (currentOType !== changedValues.operationType && current === 0) {
            clearPrevValue();
        }
        setFormValues(prevValues => ({
            ...prevValues,
            ...allValues
        }));
    }, [currentOType, current, clearPrevValue]);

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

    //继续添加
    const handleContinue = useCallback(() => {
        console.log(formValues)
        setProgressList(prevList => [...prevList, formValues])
        clearPrevValue();
        // setFormValues({})
        // form.setFieldsValue("");
        // form.resetFields()
        form.setFieldValue("stepName","")
        form.setFieldValue("operationType","")
        setCurrent(0)
        Modal.destroyAll();
    },[clearPrevValue, form, formValues])

    // 步骤结束后的确认
    const handleFinish = useCallback(() => {

        Modal.success({
            title: '添加成功',
            footer: (_) => (
                <>
                    <Button key={"back"}>不再添加</Button>
                    <Button key={"continue"} type={"primary"}  onClick={handleContinue}>继续添加</Button>
                </>
            ),
            content: "当前步骤已添加完成，需要继续添加么?"
        });
    }, [handleContinue]
    );

    //防抖
    const debouncedHandleFinish = useCallback(
        debounce(handleFinish, 300),
        [handleFinish]
    );

    const next = useCallback(async () => {
        try {
            console.log("x:",steps[current].fields)
            await form.validateFields(steps[current].fields)
            setCurrent(current + 1);
        } catch (error) {
            console.log("表单校验失败", error);
        }
    },[form, steps, current]);

    const prev = useCallback(() => {
        setCurrent(current - 1);
    }, [current]);

    useEffect(() => {
        return () => {
            debouncedHandleFinish.cancel();
        };
    }, [debouncedHandleFinish]);




    return (
        <span>
            <Steps current={current} style={{marginBottom: '20px', width: "100%"}}>
                {steps.map((item, index) => (<Step key={index} title={item.title}/>))}
            </Steps>
            <div style={{display: 'flex'}}>
                <List
                    header={<div style={{textAlign: "center", fontWeight: "600"}}>测试计划</div>}
                    bordered={true}
                    dataSource={progressList}
                    renderItem={(item) => <List.Item key={item.stepName}>{item.stepName}</List.Item>}
                    style={{width: '30%', marginRight: '20px'}}
                />
                <Card title={steps[current].title} style={{width: '85%'}}>
                    {steps[current].content(formValues, handleChange, handleCode)}
                    <div style={{marginTop: '24px'}}>
                        {current > 0 && (<Button style={{margin: '0 8px'}} onClick={prev}>
                            上一步
                        </Button>)}
                        {current < steps.length - 1 && (<Button type="primary" onClick={next}>
                            下一步
                        </Button>)}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={debouncedHandleFinish}>
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