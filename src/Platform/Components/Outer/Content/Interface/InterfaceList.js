import React, {useEffect, useState} from 'react';
import {Button, Pagination, Space, Table, Tag, message, Modal, Tooltip} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {deleteProject} from "../../../API/Api";
import {ExclamationCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {GetInterfaceList} from "../../Store/Modules/ProjectStore";
import "./InterfaceList.scss"
import ProjectSelector from "./Component/ProjectSelector";

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
        // {
        //     title: '项目级别',
        //     dataIndex: 'projectLevel',
        //     render: (_, record) => (
        //         <>
        //             <Tag color={getTagColor(record.projectLevel)} bordered={false}>
        //                 {getTagText(record.projectLevel)}
        //             </Tag>
        //         </>
        //     )
        // },
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

    // 标签动态映射(颜色)
    const getTagColor = (level) => {
        switch (level) {
            case '1':
                return 'red';
            case '2':
                return 'orange';
            case '3':
                return 'blue';
            case '4':
                return 'lime';
            default:
                return "blue"
        }
    }
    // 标签动态映射(文本)
    const getTagText = (level) => {
        switch (level) {
            case '1':
                return '最高';
            case '2':
                return '高';
            case '3':
                return '中';
            case '4':
                return '低';
            default :
                return '中'
        }
    }

    // 外部点击×或者取消的关闭回调
    const handleCloseOut = () => {
        setDrawerVisible(false);
    }

    // 抽屉关闭事件回调
    const handleCloseClick = () => {
        setDrawerVisible(false);
        // 关闭后重新请求列表
        dispatch(GetInterfaceList(currentPage, 10));
    }

    // 分页回调
    const handlePagination = (currentPage) => {
        // 更新
        setCurrentPage(currentPage);
        // 根据当前页码，发起新的回调
        dispatch(GetInterfaceList(currentPage)).then(
            setLoading(false)
        )
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
    console.log(interfaceListData)
    const resData = interfaceListData.interfaceList
    const rowData = resData.items
    // const data = projectListData.map((item) => item.items)
    // 结果转化为数组
    // console.log(datas.map((data) => data.id))
    // console.log("resData", resData)
    // console.log("resData", resData)
    console.log("currentPage:", currentPage)
    return (
        <>
            <div>
              <span>
                  <ProjectSelector/>

              </span>
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