import React, {useState, useCallback, useEffect} from 'react';
import {Layout, Steps, List, Form, Input, Button, Card, Divider, Row, Col, Select} from 'antd';
import {ContactsTwoTone, HourglassTwoTone, PieChartOutlined} from "@ant-design/icons";
import InterfaceSelectorSingle from "../TCSList/InterfaceSelectorSingle";
import CodeEditor from "./CodeEditor";
import './CodeEditor.scss';
import {useLocation} from "react-router-dom";
import EmptyPage from "./EmptyPage";
import {add} from "lodash/math";
import debounce from "lodash/debounce";
import ProgressPage from "./ProgressPage";
import AddTCSForm from "../TCSList/AddTCSForm";
import ProgressList from "./ProgressList";
import {value} from "lodash/seq";

const {Header, Content} = Layout;

const AddTCSFormV2 = () => {

    // 拿到父组件跳转的值
    const location = useLocation();
    // const { tcsData } = location.state || {};

    // 临时创建一条数据
    // tcsData.stepsData = []
    // mock数据
    const {mockData} = location.state || {}
    const tcsData = mockData;
    // tcsData.stepsData = [
    //     {
    //         title: '测试步骤1',
    //         key: '3252509',
    //         operationType: 'ot1'
    //     },
    //     {
    //         title: '登陆接口',
    //         key: '32525092',
    //         operationType: 'ot1'
    //     },
    //     {
    //         title: 'DB调用',
    //         key: '3233339',
    //         operationType: 'ot2'
    //     },
    //     {
    //         title: 'DB调用后数据聚合',
    //         key: '3580294124',
    //         operationType: 'ot1'
    //     },
    //     {
    //         title: '清空数据',
    //         key: '4327891441',
    //         operationType: 'ot3'
    //     }
    // ]
    console.log(tcsData.stepsData.length)

    /**
     * 测试步骤组件渲染标记
     * 0：列表页
     * 1：步骤操作页
     * -1：空白页
     */
    const [pageIndex, setPageIndex] = useState(0)

    // 测试步骤组件渲染标记
    const handleComponent = (value) => {
        console.log(value)
        setPageIndex(value)
    }

    // mock初始表单数据
    const mockForm = [
        {
            stepName:"登录",
            operationType:"operation_1",
            remark:"test",
            interfaceName:"全局用户登录",
            interfaceUrl:"/use/center/login",
            requestBody:{"id":"1","class":"s.cls"},
            asserts:[
                {
                    param:"$..data..id",
                    assertType:"NotEquals",
                    value:"111"

                }
            ],
            extraType: "ConnectTimeOut",
            extraValue:"45",
            key:0,
            value:"ConnectTimeOut",
            children:"连接超时时间"
        },
        {
            stepName:"测试sql链接",
            operationType:"operation_2",
            remark:"test",
            DBContent:"xxx",
            asserts:[
                {
                    param:"$..data..id",
                    assertType:"NotEquals",
                    value:"222"

                }
            ],
            extraType: "WaitTimeOut",
            extraValue:"95",
            key:1,
            value:"WaitTimeOut",
            children:"等待超时时间"
        },
        {
            stepName:"清空数据",
            operationType:"operation_2",
            remark:"test",
            DBContent:"select * from cs_trend_class_config where trend_station_id = '1172652247652106241'",
            asserts:[
                {
                    param:"$..data..id",
                    assertType:"NotEquals",
                    value:"333"

                }
            ],
            extraType: "SqlExeTimeOut",
            extraValue:"120",
            key:2,
            value:"WaitTimeOut",
            children:"Sql执行超时时间"
        },
    ]

    const mockForm2 = []


    useEffect(() => {
        if (tcsData.stepsData.length === 0) {
            setPageIndex(-1)
        }
    }, [tcsData.stepsData.length])

    let component;
    switch (pageIndex) {
        case 0:
            component = <ProgressList data={tcsData.stepsData} handlePage={handleComponent}/>
            break;
        case 1:
            component = <ProgressPage tcsData={tcsData} initForm={mockForm}/>
            break;
        case -1:
            component = <EmptyPage handlePage={handleComponent}/>
            break;
        default:
            component = <AddTCSFormV2/>
    }

    return (
        <Layout style={{backgroundColor: '#fff'}}>
            <Header style={{background: '#fff', padding: '0px', height: '120px'}}>
                <span style={{
                    margin: "0",
                    fontWeight: "850",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px'
                }}>
                    <ContactsTwoTone style={{fontSize: "18px", marginRight: "5px"}}/>基础信息
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
            <Divider/>

            <Content style={{background: '#fff', padding: '0px'}}>
                <span style={{
                    margin: "0",
                    fontWeight: "850",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px'
                }}>

                    <HourglassTwoTone style={{fontSize: "18px", marginRight: "5px"}}/>测试步骤
                    {/*<PieChartOutlined  style={{ fontSize: "18px", marginRight: "5px" }}/>测试步骤*/}
                </span>

                {/*根据组件标记，分别展示列表页、步骤新增页、空白页*/}
                {component}
            </Content>


        </Layout>
    );
};

export default AddTCSFormV2;
