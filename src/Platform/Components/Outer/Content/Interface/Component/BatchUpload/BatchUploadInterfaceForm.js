import {Button, Form, message, Modal} from 'antd';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import ProjectSelectorSingle from '../ProjectSelectorSingle';
import UploadWithProgress from './UploadWithProgress';
import {batchAddInterface, getTCSTemplateCommon} from "../../../../../API/Api";
import Input from "antd/es/input/Input";
import {GetInterfaceList} from "../../../../Store/Modules/ProjectStore";

const UploadInterfaceForm = ({ form, onChange, formType,handleFile}) => {
    const renderFormContent = () => {
        switch (formType) {
            case '1':
                return (
                    <>
                        <Form.Item name="projectName" label="请先选择项目名称"
                                   rules={[{ required: true,message:"请填写项目名称"}]}>
                            <ProjectSelectorSingle width={400} onchange={onChange} />
                        </Form.Item>
                        <Form.Item name="batchButton" label="下载批量上传模板">
                            <Button type="primary" icon={<DownloadOutlined />} onClick={() => getTCSTemplateCommon('EX001')}>
                                下载模板(.xlsx)
                            </Button>
                        </Form.Item>
                        <Form.Item name="upload" label="选择文件">
                            <UploadWithProgress handleFile={handleFile}/>
                        </Form.Item>
                    </>
                );
            case '2':
                return (
                    <>
                        <Form.Item name="jsonInput" label="请输入JSON">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="jsonUpload" label="选择文件">
                            <UploadWithProgress />
                        </Form.Item>
                    </>
                );
            case '3':
                return (
                    <>
                        <Form.Item name="swaggerUrl" label="Swagger URL">
                            <Input />
                        </Form.Item>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Form layout="vertical" form={form} name="batchAddModal">
            {renderFormContent()}
        </Form>
    );
};



const BatchUploadInterfaceForm = ({ open, onCancel, formType }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [interfaceList,setInterfaceList] = useState([])
    const [projectId, setProjectId] = useState('');
    const [projectName,setProjectName] = useState('')
    const [file,setFile] = useState('')

    const handleFile = (value) => {
        setFile(value)
    }

    const handleChange = (value) => {
        console.log(value);
        setProjectId(value.id);
        setProjectName(value.value)
    };
    const getInterfaceList = (value) => {
        setInterfaceList(value)
    }


    const handleOk = async () => {
        form.setFieldValue("projectName",projectName)
        try {
            await form.validateFields()
            console.log(file)
            batchAddInterface(file,projectId).then(res => {
                if (res.data.code === '0'){
                    message.success("批量新增接口成功");
                    // 新增完毕后，刷新列表
                    dispatch(GetInterfaceList(1,10))
                    onCancel()
                }else {
                    message.error(res.data.errMsg)
                }
            })
        }catch (error) {
            message.error("请填写必填项")
        }

    }

    let title;
    switch (formType) {
        case '1':
            title = '通过Excel新增接口';
            break;
        case '2':
            title = '从JSON新增接口';
            break;
        case '3':
            title = '从swagger新增接口';
            break;
        default:
            title = '批量导入接口';
    }

    return (
        <Modal
            open={open}
            title={<span className="custom-batch-add-modal">{title}</span>}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ autoFocus: true }}
            onCancel={onCancel}
            onOk={handleOk}
            destroyOnClose
        >
            <UploadInterfaceForm form={form} onChange={handleChange}
                                 formType={formType}
                                 projectId={projectId}
                                 handleFile={handleFile}
                                 getList={getInterfaceList}

            />
        </Modal>
    );
};

export default BatchUploadInterfaceForm;
