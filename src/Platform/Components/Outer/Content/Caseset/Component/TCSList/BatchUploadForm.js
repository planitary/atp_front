import {Button, Divider, Form, Modal} from "antd";
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {getTCSTemplate, getTCSTemplateCommon} from "../../../../../API/Api";
import axios from "axios";
import UploadWithProgress from "./UploadWithProgress";
import {DownloadOutlined} from "@ant-design/icons";
import "../../CaseSetList.scss"

const BathUploadForm = ({form,onChange}) => {
    return (
        <Form layout="vertical" form={form} name={"batchAddModal"}>
            <Form.Item
                name="batchButton"
                label="下载批量上传文件模板"
                >
                <Button type="primary"
                        icon={<DownloadOutlined />}
                        onClick={() => getTCSTemplateCommon('EX002')}>下载模板(.xlsx)</Button>
            </Form.Item>

            <Form.Item
                name="upload"
                label="选择文件"
                >
                <UploadWithProgress/>
            </Form.Item>
        </Form>
    )
}


const BatchUploadFormModal = ({open,onCreate,onCancel}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [fileName,setFileName] = useState("")
    const handleChange = (value) => {
        setFileName(value)
    }

    return (
        <Modal
            open={open}
            title={<span className={"custom-batch-add-modal"}>批量创建测试集合</span>}
            okText="确认"
            cancelText="取消"
            okButtonProps={{
                autoFocus: true,
            }}
            onCancel={onCancel}
            destroyOnClose
            // onOk={handleFormInfo}
        >
            <BathUploadForm
                form={form}
                onChange={handleChange}
            />
        </Modal>
    )
}

export default BatchUploadFormModal;