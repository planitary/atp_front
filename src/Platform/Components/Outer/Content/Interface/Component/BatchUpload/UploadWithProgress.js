import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import axios from "axios";

const UploadWithProgress = ({ projectId ,getListInfo}) => {
    const props = {
        name: 'file',
        action: 'http://localhost:8080/interface/batchAddInterface',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('projectId', projectId);

            axios.post('http://localhost:8080/interface/uploadInterfaceByExcel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                if (response.data.code === '0') {
                    message.success(`${file.name} 上传成功!`);
                    console.log(response.data);
                    getListInfo(response.data.data)
                }
                else {
                    message.error(response.data.errMsg)
                }
            }).catch(error => {
                message.error(`${file.name} 上传失败`);
                console.error(error);
            });

            // 防止默认的上传行为
            return false;
        },

        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
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
