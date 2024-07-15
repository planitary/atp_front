import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

const UploadWithProgress = ({handleFile}) => {
    const props = {
        name: 'file',
        action: '', // 空的action，因为我们不需要实际上传到服务器
        beforeUpload: (file) => {
            // 这里可以添加一些前置处理逻辑，例如文件验证
            message.success(`${file.name} 已选择`);
            // 防止默认的上传行为
            return false;
        },

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                handleFile(info.file)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 文件上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 文件上传失败`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            size: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
    );
};

export default UploadWithProgress;
