import {Button, Space, Table, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetCaseSetList, GetInterfaceList, GetProjectList} from "../../Store/Modules/ProjectStore";
import {InfoCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {getCaseSetDetail} from "../../../API/Api";
import UpdateCaseSetDrawer from "./Component/TCSList/UpdateCaseSetDrawer";
import BatchUploadFormModal from "./Component/TCSList/BatchUploadForm";
import "./CaseSetList.scss"
import axios from "axios";
import AddTCSForm from "./Component/TCSList/AddTCSForm";
import {useNavigate} from "react-router-dom";

const CaseSetList = () => {

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
            title: (
                <div>
                    权重
                    <Tooltip title="用1-5表示当前集合在项目中的占比，权重越高，占比越高，说明集合越重要">
                        <InfoCircleOutlined className="interface-title-icon"/>
                    </Tooltip>
                </div>),
            dataIndex: 'setWeight',
            width: '7%',
            render: (_, record) => (
                <>
                    <Tag color={getTagColor(record.setWeight)} bordered={false}>
                        {getTagText(record.setWeight)}
                    </Tag>
                </>
            )
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: '12%'
        },



        // {
        //     title: '创建人',
        //     dataIndex: 'createUser',
        // },
        // {
        //     title: (
        //         <div>
        //             参数提取列表
        //             <Tooltip title="鼠标悬浮在单元格内可查看详情">
        //                 <InfoCircleOutlined className="interface-title-icon"/>
        //
        //             </Tooltip>
        //         </div>),
        //
        //     dataIndex: 'parameterList',
        //     width: '12%',
        //     ellipsis: {
        //         showTitle: false
        //     },
        //     render: (parameterList) => (
        //         <Tooltip placement="topLeft" title={parameterList}>
        //             {parameterList}
        //         </Tooltip>
        //     )
        // },
        {
            title: '负责人',
            dataIndex: 'owner',
            width: '10%',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '15%'
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: '15%'
        },
        {
            title: '操作',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEditClick(record)}>编辑</a>
                    <a style={{"color": "red"}}>删除</a>
                    <a onClick={() => handleTCSEditClick(record)}>维护步骤</a>
                </Space>
            )
        }
    ];

    // mock数据
    const mockList = [
        {
            setName: "测试1",
            projectName: "cornerstone",
            setWeight: 4,
            remark: "测试",
            owner: "Lynn",
            createTime: "2024-01-23 12:09:44",
            updateTime: "2024-01-24 23:22:10"
        }
    ]

    // 标签动态映射(颜色)
    const getTagColor = (level) => {
        switch (level) {
            case 1:
            case 2:
                return 'lime';
            case 3:
                return 'blue';
            case 4:
                return 'orange';
            case 5:
                return 'red';
            default:
                return "blue"
        }
    }

    // 标签动态映射(文本)
    const getTagText = (level) => {
        switch (level) {
            case 1:
                return '1';
            case 2:
                return '2';
            case 3:
                return '3';
            case 4:
                return '4';
            case 5:
                return '5';
            default :
                return '3'
        }
    }

    // // 集合详情
    // const [casetSetInfo, setCaseSetInfo] = useState({
    //     setName: "",
    //     projectId: "",
    //     setWeight: "",
    //     owner: "",
    //     remark: "",
    //     interfaceInfoSIPDTOS: [],
    //     parameterList: [],
    // })


    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [drawerVisible, setDrawerVisible] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch((GetCaseSetList(1, 10)))
    }, [dispatch])


    // const tcsInfo = {
    //     setName: "",
    //     projectName: "",
    //     remark: "",
    //     setWeight: "",
    //     owner: "",
    //     interfaceInfoSIPDTOS: []
    // }
    const handleEditClick = async (record) => {
        await getCaseSetDetail(record.setId).then(res => {
            if (res.data.code === '0') {
                const data = res.data.data
                // setTCSInfo({
                //     setName: data.setName,
                //     projectName: data.projectName,
                //     remark: data.remark,
                //     setWeight: data.setWeight,
                //     owner: data.owner,
                //     interfaceInfoSIPDTOS: data.interfaceInfoSIPDTOS,
                // })
                // tcsInfo.setName = data.setName;
                // tcsInfo.projectName = data.projectName;
                // tcsInfo.remark = data.remark;
                // tcsInfo.setWeight = data.setWeight;
                // tcsInfo.owner = data.owner;
                // tcsInfo.interfaceInfoSIPDTOS = data.interfaceInfoSIPDTOS
                setTCSInfo(data)
            }
            console.log("tcsInfo", tcsInfo)
        })
        setDrawerVisible(true)
    }

    // const handleEditClick = async (record) => {
    //     const params = {
    //         setId: record.setId
    //     };
    //     const url = "http://localhost:8080/caseSet/getCaseSetDetail";
    //     try {
    //         let res = await axios.get(url,{params});
    //         setTCSInfo(res.data.data)
    //     }catch (error){
    //         console.error("Error:",error)
    //     }
    //     setDrawerVisible(true)
    // }
    // 抽屉关闭事件回调
    const handleCloseClick = () => {
        setDrawerVisible(false);
        // 关闭后重新请求列表
        dispatch(GetCaseSetList(currentPage, 10));
    }

    // 外部点击×或者取消的关闭回调
    const handleCloseOut = () => {
        setDrawerVisible(false);
    }

    const navigate = useNavigate();

    const [tcsInfo, setTCSInfo] = useState({
        setName: "",
        projectName: "",
        remark: "",
        setWeight: "",
        owner: "",
        interfaceInfoSIPDTOS: []
    })

    let tcsData = {
        setName: "",
        projectName: "",
        remark: "",
        setWeight: "",
        owner: "",
        createTime: "",
    }

    const mockData = {
        setName: mockList[0].setName,
        projectName: mockList[0].projectName,
        remark: mockList[0].remark,
        setWeight: mockList[0].setWeight,
        owner: mockList[0].owner,
        createTime: mockList[0].createTime,
        projectId:"2423423432",
        stepsData:[]
    }


    //维护步骤
    const handleTCSEditClick = async (record) => {
        // await getCaseSetDetail(record.setId).then(res => {
        //     if (res.data.code === '0'){
        //         const setData = res.data.data
        //         tcsData = {...setData}
        //     }
        // })
        // console.log(mockData)
        // 真实数据
        // navigate("/platform/caseset/editProgress", { state: { tcsData } });
        // mock数据
        navigate("/platform/caseset/editProgress", { state: { mockData } });
    }


    // // 从回调中拿到数据渲染列表
    const caseSetListData = useSelector(state => state.caseSetList)
    console.log(caseSetListData)
    const resData = caseSetListData.caseSetList
    const rowData = resData.items;
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


    // 批量新增表单控制
    const [batchAddFormOpen, setBatchAddFormOpen] = useState(false);
    // 新增表单控制
    const [addFormOpen,setAddFormOpen] = useState(false);
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

    return (
        <>
            <div className={"caseset-container"}>
                <Button className={"caseset-batch-add-button-wrapper"}
                        icon={<PlusOutlined/>}
                        type={"primary"}
                        onClick={() => handleBatchAdd()}>
                    新增测试用例（excel批量)
                </Button>
                <Button
                    className={"caseset-add-button-wrapper"}
                    icon={<PlusOutlined/>}
                    type={"primary"}
                    onClick={() => handleAdd()}>
                    新增测试用例
                </Button>
            </div>
            <AddTCSForm
                open={addFormOpen}
                onCreate={onCreate}
                onCancel={onCancel}>
            </AddTCSForm>
            <BatchUploadFormModal
                open={batchAddFormOpen}
                onCreate={onBatchCreate}
                onCancel={onBatchCancel}>
            </BatchUploadFormModal>

            <Table
                columns={columns}
                rowKey={currentId}
                // 在公司时用mock的数据
                dataSource={mockList}
                // 家里的正式数据
                // dataSource={rowData}
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
            <UpdateCaseSetDrawer
                editData={tcsInfo}
                drawerVisible={drawerVisible}
                handleCloseIn={handleCloseClick}
                handleCloseOut={handleCloseOut}
            />


        </>
    )
}

export default CaseSetList