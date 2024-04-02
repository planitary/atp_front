import React, { useState } from 'react';
import {Button, Modal} from 'antd';
import {ExclamationCircleOutlined} from "@ant-design/icons";
import "./MessageInfo.scss"
const MessageInfo = ({modalStatus,handleOk,handleCancel}) => {
    return (
        <>
            <Modal
                okText={"确认"}
                cancelText={"取消"}
                destroyOnClose={true}
                title={
                    <div>
                        <ExclamationCircleOutlined className={"message-icon"}/>删除项目!
                    </div>
                }
                open={modalStatus} onOk={handleOk} onCancel={handleCancel}>
                <p>确定要删除当前项目吗?</p>
            </Modal>
        </>
    );
};



export default MessageInfo;