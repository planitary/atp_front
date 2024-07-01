import {Button, Divider, Form, Modal} from 'antd';
import {useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {DownloadOutlined} from '@ant-design/icons';
import ProjectSelectorSingle from '../ProjectSelectorSingle';
import UploadWithProgress from './UploadWithProgress'
import {getTCSTemplateCommon} from "../../../../../API/Api";

const UploadInterfaceForm = ({form, onChange}) => {
    return (
        <Form layout="vertical" form={form} name="batchAddModal">
            <Form.Item name="projectId" label="请先选择项目名称"
                       rules={[
                           {
                               required: true,
                           },
                       ]}>
                <ProjectSelectorSingle width={400} onchange={onChange}/>
            </Form.Item>
            <Form.Item name="batchButton" label="下载批量上传模板">
                <Button type="primary" icon={<DownloadOutlined/>} onClick={() => getTCSTemplateCommon('EX001')}>
                    下载模板(.xlsx)
                </Button>
            </Form.Item>

            <Form.Item name="upload" label="选择文件">
                <UploadWithProgress/>
            </Form.Item>
        </Form>
    );
};

const BatchUploadInterfaceForm = ({open, onCreate, onCancel, formType}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('');
    const [projectName, setProjectName] = useState('');

    const handleChange = (value) => {
        console.log(value);
        setProjectName(value.value);
    };

    let title;
    console.log(formType)
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
            okButtonProps={{autoFocus: true}}
            onCancel={onCancel}
            destroyOnClose
        >
            <UploadInterfaceForm form={form} onChange={handleChange}/>
        </Modal>
    );
};

export default BatchUploadInterfaceForm;
