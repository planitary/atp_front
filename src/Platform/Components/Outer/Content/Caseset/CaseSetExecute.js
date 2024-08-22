import {Badge, Button, Modal, Progress, Space, Table, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetCaseSetList, GetInterfaceList, GetProjectList} from "../../Store/Modules/ProjectStore";

import BatchUploadFormModal from "./Component/TCSList/BatchUploadForm";
import "./CaseSetList.scss"

import ExeCuteDropButton from "./Component/TCSExcute/ExecuteDropButton";
import TCSExecuteModal from "./Component/TCSExcute/TCSExecuteModal";
import {useNavigate} from "react-router-dom";
// import {useHistory} from 'react-router-dom'

const CaseSetExecute = () => {

    const columns = [
        {
            title: '集合名',
            dataIndex: 'setName',
            width: '11%',
        },
        {
            title: '所属项目',
            dataIndex: 'projectName',
        },
        {
            title: '步骤数',
            dataIndex: 'steps',
            width: '12%'
        },
        {
            title: '负责人',
            dataIndex: 'owner',
            width: '10%',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '15%'
        }, {
            title: '用例执行进度',
            key: 'progress',
            width: '20%',
            render: (_, record) => {
                const { status, progress } = record; // 假设每个 record 中有 status 和 progress 字段

                if (status === -1) {
                    return <span>-</span>; // 未执行状态
                } else if (status === 1) {
                    return (
                        <Space>
                            <Progress
                                percent={progress}
                                size="small"
                                status="active"
                                style={{ width: 120 }}
                            />
                            <Badge status="processing" color="blue" /> {/* 动态蓝色圆点 */}
                        </Space>
                    );
                } else if (status === 2) {
                    return (
                        <Space>
                            <Progress
                                percent={100}
                                size="small"
                                status="success"
                                style={{ width: 120 }}
                            />
                            <Button type="link" onClick={() => handleViewClick(record)}>
                                查看结果
                            </Button>
                        </Space>
                    );
                }
            }
        },
        {
            title: '操作',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleExecuteClick()}>执行</a>
                    <a style={{"color": "red"}}>删除</a>
                    <ExeCuteDropButton/>
                </Space>
            )
        }
    ];

    const mockExecuteInfo = {
        stepNumber: 20,
        durationTime: 18,
        successCount: 13,
        failedCount: 5,
        ignoredCount: 2,
        executeTime: '2024-07-11 03:44:36',
        setName: '通用网关配置',
        executeEnv: "FAT",
        executeUser: "Joshua",
        extractDesc: "",
        passingRate: "0.65",
    }



    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [executeModal,setExecuteModal] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch((GetCaseSetList(1, 10)))
    }, [dispatch])

    // 查看执行结果回调
    const handleViewClick = (record) => {
        console.log(mockExecuteInfo)
        navigate("/platform/caseset/casesetExecute/exeResult",{ state : {mockExecuteInfo}})
    }

    // 点击执行回调，打开对话框
    const handleExecuteClick = () =>{
        setExecuteModal(true)
    }




    const [tcsInfo, setTCSInfo] = useState({
        setName: "",
        projectName: "",
        remark: "",
        setWeight: "",
        owner: "",
        interfaceInfoSIPDTOS: []

    })

    //mock数据，后续从接口取值
    // status字段：-1-未执行、1-执行中、2-执行完
    const mockData = [{
        setName: "开票通用",
        projectName: "BMS",
        remark: "12",
        setWeight: "3",
        owner: "Stack",
        steps: 22,
        interfaceInfoSIPDTOS: [12, 23, 23],
        createTime: '-',
        status: -1,
        progress: 0
    }, {
        setName: "OMS外部下单",
        projectName: "OMS",
        remark: "备注",
        setWeight: "2",
        owner: "Lynn",
        steps: 17,
        interfaceInfoSIPDTOS: [12, 23, 23],
        createTime: '-',
        status: 2,
        progress: 100
    },
        {
            setName: "通用网关配置",
            projectName: "BGY",
            remark: "备注",
            setWeight: "1",
            owner: "Zane",
            steps: 9,
            interfaceInfoSIPDTOS: [12, 23, 23],
            createTime: '2024-02-18 14:22:01',
            status: 1,
            progress: 69
        }]


    // // 从回调中拿到数据渲染列表
    const caseSetListData = useSelector(state => state.caseSetList)
    console.log(caseSetListData)
    const resData = caseSetListData.caseSetList
    // const rowData = resData.items;
    const rowData = mockData
    console.log("currentPage", currentPage)

    // 分页回调
    const handlePagination = (currentPage) => {
        // 更新
        setCurrentPage(currentPage);
        // 根据当前页码，发起新的回调
        dispatch(GetCaseSetList(currentPage)).then(
            setLoading(false)
        )
    }

    const currentId = (record) => {
        return record.id
    }

    // const history = useHistory();

    // 批量新增表单控制
    const [batchAddFormOpen, setBatchAddFormOpen] = useState(false);
    // 新增表单控制
    const [addFormOpen, setAddFormOpen] = useState(false);
    // 批量新增创建表单
    const onBatchCreate = (values) => {
        console.log("表单赋值:", values);
        setBatchAddFormOpen(false);
    }
    // 新增TCS表单
    const onCreate = (value) => {
        setAddFormOpen(false);
    }

    // 批量新增按钮
    const handleBatchAdd = () => {
        setBatchAddFormOpen(true)
    }
    // 新增测试用例集合
    const handleAdd = () => {
        setAddFormOpen(true)
    }

    // 新增批量表单关闭
    const onBatchCancel = () => {
        setBatchAddFormOpen(false)
    }
    // 新增TCS表单关闭
    const onCancel = () => {
        setAddFormOpen(false)
    }

    // 新增用例
    // const handleAddTCSClick = () =>{
    //     history.push('/edit')
    // }
    return (
        <>
            <Table
                columns={columns}
                rowKey={currentId}
                dataSource={rowData}
                pagination={{
                    pageSize: resData.pageSize,
                    current: currentPage,
                    total: resData.totalCounts,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: handlePagination
                }}
                loading={loading}
                // onChange={handleTableChange}
            />
            <TCSExecuteModal open={executeModal} setOpen={setExecuteModal}/>


        </>
    )
}

export default CaseSetExecute