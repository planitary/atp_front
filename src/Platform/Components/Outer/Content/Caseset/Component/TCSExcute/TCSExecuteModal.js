import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const TCSExecuteModal = ({open,setOpen}) => {

    console.log(open)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('是否执行当前用例? 确认执行后将创建一个执行任务');

    // 异步执行，这里调用后端创建执行任务
    const handleOk = () => {
        setModalText('任务创建成功，请等待任务执行完成后查看执行结果');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Modal
                title="执行用例"
                open={open}
                okText={"确认"}
                cancelText={"取消"}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};
export default TCSExecuteModal;