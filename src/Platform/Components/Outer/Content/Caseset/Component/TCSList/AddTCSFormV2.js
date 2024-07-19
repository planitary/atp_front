import React, {useEffect, useState} from 'react';
import {Layout, Steps, List, Form, Input, Button, Card, Divider, Row, Col} from 'antd';
import {useDispatch} from "react-redux";
import {getCaseSetDetail} from "../../../../../API/Api";
import {ContactsTwoTone} from "@ant-design/icons";

const {Header, Content} = Layout;
const {Step} = Steps;

const steps = [{
    title: '填写基本信息', content: (<Form layout="vertical">
            <Form.Item label="Field A">
                <Input/>
            </Form.Item>
            <Form.Item label="Field B">
                <Input/>
            </Form.Item>
        </Form>),
}, {
    title: '详细配置', content: (<Form layout="vertical">
            <Form.Item label="Field C">
                <Input/>
            </Form.Item>
            <Form.Item label="Field D">
                <Input/>
            </Form.Item>
        </Form>),
}, {
    title: '断言设置', content: (<Form layout="vertical">
            <Form.Item label="Field E">
                <Input/>
            </Form.Item>
            <Form.Item label="Field F">
                <Input/>
            </Form.Item>
        </Form>),
}, {
    title: '额外配置', content: (<Form layout="vertical">
            <Form.Item label="Field E">
                <Input/>
            </Form.Item>
            <Form.Item label="Field F">
                <Input/>
            </Form.Item>
        </Form>),
},];

const AddTCSFormV2 = ({tcsInfo}) => {

    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getCaseSetDetail())
    // })

    const [current, setCurrent] = useState(0);

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
    }

    return (<Layout style={{backgroundColor: '#fff'}}>
            <Header style={{background: '#fff', padding: '0px', height: '160px'}}>
                <span style={{margin: "0", fontWeight: "850", display: "flex"}}><ContactsTwoTone
                    style={{fontSize: "20px", marginRight: "5px"}}/>基础信息</span>

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

            <br/>
            <Content style={{marginLeft: '5px', backgroundColor: '#fff'}}>
                <Steps current={current} style={{marginBottom: '20px',width:"100%"}}>
                    {steps.map((item, index) => (<Step key={index} title={item.title}/>))}
                </Steps>

                <div style={{display: 'flex'}}>
                    <List
                        header={<div>配置预览</div>}
                        bordered
                        dataSource={['选项 1', '选项 2', '选项 3']}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        style={{width: '20%', marginRight: '20px'}}
                    />

                    <Card title="表单内容" style={{width: '85%'}}>
                        {steps[current].content}
                        <div style={{marginTop: '24px'}}>
                            {current < steps.length - 1 && (<Button type="primary" onClick={next}>
                                    下一步
                                </Button>)}
                            {current === steps.length - 1 && (<Button type="primary" onClick={() => alert('完成')}>
                                    完成
                                </Button>)}
                            {current > 0 && (<Button style={{margin: '0 8px'}} onClick={prev}>
                                    上一步
                                </Button>)}
                        </div>
                    </Card>
                </div>
            </Content>
        </Layout>);
};

export default AddTCSFormV2;
