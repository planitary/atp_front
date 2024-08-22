// 用例执行结果页
import {Card, Col, Row, Statistic} from "antd";
import {Pie} from '@ant-design/charts'
import {useLocation} from "react-router-dom";

const TCSExecuteResultPage = () => {
    const location = useLocation();
    // 接受值需要和传递值一致
    const { mockExecuteInfo } = location.state || {};

    console.log(mockExecuteInfo)
    // 饼图配置
    const pieConfig = {
        // appendPadding: 10,
        data: [
            {
                type: '成功', value: mockExecuteInfo.successCount
            },
            {
                type: '失败', value: mockExecuteInfo.failedCount
            },
            {
                type: '忽略', value: mockExecuteInfo.ignoredCount
            }
        ],
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
        annotations: [
            {
                type: 'text',
                style: {
                    text: mockExecuteInfo.setName,
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 40,
                    fontStyle: 'bold',
                }
            }
        ],
        interaction: {
            tooltip: {
                render: (event,{title,items}) => {
                    console.log(title)
                }
            }
        }
    };
    return (
        <Row gutter={24}>
            <Col span={12}>
                <Pie {...pieConfig} />
            </Col>

            <Col span={12}>
                <Card title={"基本信息"}>
                    <Statistic title={"用例名称"} value={mockExecuteInfo.setName} />
                    <Statistic title={"通过率"} value={100 * mockExecuteInfo.passingRate} suffix={"%"}/>
                    <Statistic title={"执行耗时"} value={mockExecuteInfo.durationTime} suffix={"秒"} />
                    <Statistic title={"执行环境"} value={mockExecuteInfo.executeEnv} />
                    <Statistic title={"执行时间"} value={mockExecuteInfo.executeTime} />
                </Card>
            </Col>
        </Row>
    )
}

export default TCSExecuteResultPage