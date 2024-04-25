import React, {useEffect, useState} from 'react';
import {Button, Pagination, Space, Table, Tag, message, Modal, Tooltip} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {deleteProject, findInterfaceList} from "../../../API/Api";
import {ExclamationCircleOutlined, InfoCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {FindInterfaceByFilter, GetInterfaceList, GetProjectList} from "../../Store/Modules/ProjectStore";
import "./InterfaceList.scss"
import ProjectSelector from "./Component/ProjectSelector";
import Input from "antd/es/input/Input";

const {confirm} = Modal;

const InterfaceList = () => {
    const columns = [
        {
            title: '接口名',
            dataIndex: 'interfaceName',
            width: '10%',
        },
        {
            title: '接口地址',
            dataIndex: 'interfaceUrl',
            width: '12%'
        },

        // {
        //     title: '创建人',
        //     dataIndex: 'createUser',
        // },
        {
            title: '所属项目',
            dataIndex: 'projectName',
        },
        {
            title: '项目前缀url',
            dataIndex: 'projectUrl',
        },
        {
            title: (
                <div>
                    请求体参数

                    <Tooltip title="鼠标悬浮在单元格内可查看详情">
                        <InfoCircleOutlined className="interface-title-icon"/>

                    </Tooltip>
                </div>
            ),
            dataIndex: 'requestBody',
            width: '15%',
            ellipsis: {
                showTitle: false,
            },
            render: (requestBody) => (
                <Tooltip placement="topLeft" title={requestBody}>
                    {requestBody}
                </Tooltip>
            )
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
            title: '创建人',
            dataIndex: 'createUser',
            width: '8%'
        },
        {
            title: '操作',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEditClick(record)}>编辑</a>
                    <a onClick={() => handleDeleteClick(record)} style={{"color": "red"}}>删除</a>
                </Space>
            )
        }
    ];


    // 加载状态
    const [loading, setLoading] = useState(false);

    // 分页标记（表示当前渲染的数据是正常分页还是筛选查询）
    const [isFilter, setIsFilter] = useState(false);

    // 项目详情
    const [projectInfo, setProjectInfo] = useState({
        projectId: "",
        projectName: "",
        projectUrl: "",
        remark: "",
        projectGroup: "",
        projectOwner: "",
        projectLevel: "",
        version: 0
    })
    // 分页状态
    // const [pagination,setPagination] = useState({})

    // 当前页码
    const [currentPage, setCurrentPage] = useState(1);
    // 抽屉控制器
    const [drawerVisible, setDrawerVisible] = useState(false);
    // 暂存数据值用于抽屉表单的回显

    const dispatch = useDispatch()

    // 钩子函数，渲染完页面就访问一次列表页
    useEffect(() => {
        dispatch((GetProjectList(1, 5)))
        dispatch(GetInterfaceList(1, 10))
    }, [dispatch])

    // 编辑按钮回调(调用接口获取详情)
    const handleEditClick = async (record) => {
        const reqBody = {
            "projectId": record.projectId
        }
        const url = "http://localhost:8080/project/getProjectDetail";
        try {
            const res = await axios.post(url, reqBody);
            console.log(res.data.data)
            setProjectInfo(res.data.data)

        } catch (error) {
            console.error("Error:", error);
        }
        setDrawerVisible(true)
    }

    const handleOk = (projectId) => {
        // setIsModalOpen(false);
        deleteProject(projectId).then(res => {
            if (res.data.code === '0') {
                message.success(res.data.data);
                dispatch(GetInterfaceList(currentPage, 10));
            } else {
                message.error(res.data.errMsg)
            }
        })
    };

    // 删除按钮的回调
    const handleDeleteClick = (record) => {
        const currentProjectId = getCurrentProjectId(record)
        confirm({
            title: '删除项目',
            icon: <ExclamationCircleOutlined/>,
            content: '确认要删除当前项目么?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => handleOk(currentProjectId)
        })
    }


    // 分页回调
    const handlePagination = (currentPage) => {
        // 更新
        setCurrentPage(currentPage);
        // 根据当前页码，发起新的回调
        if (!isFilter) {
            dispatch(GetInterfaceList(currentPage)).then(
                setLoading(false)
            )
        } else {
            dispatch(FindInterfaceByFilter(currentPage,10,interfaceFindDTO.projectIds,
                interfaceFindDTO.interfaceUrl,interfaceFindDTO.interfaceName)).then(setLoading(false))
        }
    }

    // 编辑当前行
    const currentId = (record) => {
        return record.id
    }
    // 获得当前行的Id
    const getCurrentProjectId = (record) => {
        return record.projectId
    }

    // 从回调中拿到数据渲染列表
    const interfaceListData = useSelector(state => state.interfaceList)
    const resData = interfaceListData.interfaceList
    const rowData = resData.items;
    console.log("currentPage:", currentPage)

    // 搜索筛选框默认填充值
    const filledOptionsList = useSelector(state => state.projectList)
    const filledOptions = filledOptionsList.projectList.items

    // 搜索筛选框默认值,传递一个对象
    let filledMap = [];
    const getDefaultMap = (filledOptions) => {
        return filledOptions.map((item) => ({
            label: `${item.projectName}`,
            value: `${item.projectId}`,
        }));
    }


    if (filledOptions !== undefined) {
        filledMap = getDefaultMap(filledOptions);
    }// 使用函数返回值填充 filledMap 数组

    const findDTO = {
        interfaceUrl: "",
        interfaceName: "",
        projectId: "",
        projectIds: []
    }

    const [interfaceFindDTO,setInterfaceFindDTO] = useState(findDTO)
    // 接口所属项目名筛选框的状态值
    const [projectIds,setProjectIds] = useState([])

    // 监听接口名称的输入值
    const interfaceNameHandleChange = (e) =>{
        setInterfaceFindDTO({
            ...interfaceFindDTO,        // 保留其他属性
            interfaceName: e.target.value
        })
        // interfaceFindDTO.interfaceName = e.target.value
    }
    // 监听接口url的输入值
    const interfaceUrlHandleChange = (e) => {
        setInterfaceFindDTO({
            ...interfaceFindDTO,
            interfaceUrl: e.target.value
        })
        // interfaceFindDTO.interfaceUrl = e.target.value
    }

    // 监听筛选框的变化值，并拿到value
    useEffect(() => {
        console.log("projectId:",projectIds)
    },[projectIds]);

    const handleSelectorChange = (values) => {
        console.log(values)
        const tempValues = values.map((value) => value.value)
        setProjectIds(tempValues)
    }

    const getProjectIds = () => {
        if (projectIds.length !== 0) {
            return projectIds
        }
    }
    // 查询按钮的确认事件
    //todo:这里实际的传参是过滤条件，需要额外封装一下，其中，项目Id的列表目前写死
    const handleButtonClick = () => {
        console.log(projectIds)
        // setInterfaceFindDTO({
        //     ...interfaceFindDTO,
        //     projectIds: getProjectIds()
        // })
        interfaceFindDTO.projectIds = getProjectIds();
        console.log("dto:",interfaceFindDTO)
        dispatch(FindInterfaceByFilter(currentPage,10,interfaceFindDTO.projectIds,
            interfaceFindDTO.interfaceUrl,interfaceFindDTO.interfaceName)).then(() => {
            setIsFilter(true)
        });
    }



    return (
        <>
            <div style={{display: "flex", alignItems: "center"}}>
                <Input id="interfaceName" placeholder="请输入接口名" allowClear style={{width: "20%"}}
                onBlur={interfaceNameHandleChange}/>
                <Input id="interfaceUrl" placeholder="请输入接口地址" allowClear style={{width: "25%", marginLeft: "30px"}}
                onBlur={interfaceUrlHandleChange}/>
                {filledMap.length !== 0 && (
                    <div style={{width: "25%", marginLeft: "30px"}}>
                        <ProjectSelector defaultValue={filledMap} onChange={handleSelectorChange}/>
                    </div>
                )}
            </div>

            <div style={{marginBottom: "10px"}}>
                <Button type={"default"} className={"interface-top-clear-button"}>重置</Button>

                <Button type="primary" onClick={() => handleButtonClick()} className="interface-top-confirm-button">
                    查询
                </Button>
            </div>

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
                // pagination={<Page total={23}/>}
                loading={loading}
                // onChange={handleTableChange}
            />

            {/*<DetailDrawer*/}
            {/*    editData={projectInfo}*/}
            {/*    drawerVisible={drawerVisible}*/}
            {/*    handleCloseIn={handleCloseClick}*/}
            {/*    handleCloseOut={handleCloseOut}*/}
            {/*/>*/}
            {/*<MessageInfo*/}
            {/*    modalStatus={isModalOpen}*/}
            {/*    handleOk={handleOk}*/}
            {/*    handleCancel={handleCancel}*/}
            {/*/>*/}
        </>
    );
};
export default InterfaceList;