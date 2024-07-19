import React, { useState } from 'react';
import { PageHeader, Steps, List, Form, Input, Button, Card } from 'antd';

const { Step } = Steps;

const steps = [
    {
        title: 'Step 1',
        content: (
            <Form layout="vertical">
                <Form.Item label="Field A">
                    <Input />
                </Form.Item>
                <Form.Item label="Field B">
                    <Input />
                </Form.Item>
            </Form>
        ),
    },
    {
        title: 'Step 2',
        content: (
            <Form layout="vertical">
                <Form.Item label="Field C">
                    <Input />
                </Form.Item>
                <Form.Item label="Field D">
                    <Input />
                </Form.Item>
            </Form>
        ),
    },
    {
        title: 'Step 3',
        content: (
            <Form layout="vertical">
                <Form.Item label="Field E">
                    <Input />
                </Form.Item>
                <Form.Item label="Field F">
                    <Input />
                </Form.Item>
            </Form>
        ),
    },
];

const AddTCSFormV2 = () => {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div>
            {/*<PageHeader*/}
            {/*    title="页面展示"*/}
            {/*    subTitle="这是一个展示页面，不能编辑"*/}
            {/*    style={{ borderBottom: '1px solid #f0f0f0' }}*/}
            {/*/>*/}

            <Steps current={current} style={{ margin: '20px 0' }}>
                {steps.map((item, index) => (
                    <Step key={index} title={item.title} />
                ))}
            </Steps>

            <div style={{ display: 'flex' }}>
                <List
                    header={<div>配置预览</div>}
                    bordered
                    dataSource={['选项 1', '选项 2', '选项 3']}
                    renderItem={item => <List.Item>{item}</List.Item>}
                    style={{ width: '20%', marginRight: '20px' }}
                />

                <Card title="表单内容" style={{ width: '75%' }}>
                    {steps[current].content}
                    <div style={{ marginTop: '24px' }}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => alert('完成')}>
                                完成
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                上一步
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AddTCSFormV2;
