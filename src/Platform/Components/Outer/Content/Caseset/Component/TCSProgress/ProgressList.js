import React from 'react';
import {Avatar, Button, List, Space} from 'antd';
import {ApiTwoTone, CheckSquareTwoTone, ControlTwoTone, createFromIconfontCN, DatabaseTwoTone} from "@ant-design/icons";
import './ProgressList.scss'


const RedisIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_4636439_jku01l695g.js'
})

const ProgressList = ({data,handlePage}) => {

    const getOperationTypeAvatar = (operationType) => {
        switch (operationType) {
            case "operation_1":
                // return <RedisIcon type={"icon-example"} />
                return <ApiTwoTone/>
            case "operation_2":
                return <DatabaseTwoTone/>;
            case "operation_3":
                return <ControlTwoTone/>;
            default:
                return <CheckSquareTwoTone/>;
        }
    };


    return (
        <>
            <Space className={"progress-list-space"}>
                <Button type={"primary"} onClick={() => handlePage(1,data)}>编辑</Button>
            </Space>
            <List
                itemLayout="horizontal"
                bordered
                dataSource={data}
                renderItem={(item, index) => (

                    <List.Item>
                        <List.Item.Meta
                            avatar={getOperationTypeAvatar(item.operationType)}
                            title={item.stepName}
                            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </>


    );
};
export default ProgressList;