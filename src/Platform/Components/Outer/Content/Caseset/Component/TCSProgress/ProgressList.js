import React from 'react';
import { Avatar, List } from 'antd';
import {ApiTwoTone, CheckSquareTwoTone, ControlTwoTone, createFromIconfontCN, DatabaseTwoTone} from "@ant-design/icons";



const ProgressList = ({data}) => {

    const getOperationTypeAvatar = (operationType) => {
            switch (operationType) {
                case "ot1":
                    return `../../../../../../Static/icons/RedisMulti.svg`
                case "ot2":
                    return <DatabaseTwoTone />;
                case "ot3":
                    return <ControlTwoTone />;
                default:
                    return <CheckSquareTwoTone />;
            }
        };

    return (
        <List
            itemLayout="horizontal"

            bordered
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={getOperationTypeAvatar(item.operationType)} />}
                        title={item.title}
                        // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    );
};
export default ProgressList;