import React, {useEffect, useState} from 'react';
import {Button, Pagination, Space, Table} from 'antd';
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {GetPagination, GetProjectList} from "./Store/Modules/ProjectStore";
import _ from "lodash";
import dayjs from "dayjs";
import Page from "../../../Pagination/Page";
import DetailDrawer from "./Component/DetailDrawer";
import axios from "axios";

const ProjectList = () => {
    const columns = [
        {
            title: '项目名',
            dataIndex: 'projectName',
            width: '15%',
        },
        {
            title: '项目前缀',
            dataIndex: 'projectUrl',
            width: '10%',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            width: '15%'
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
        // {
        //     title: '创建人',
        //     dataIndex: 'createUser',
        // },
        {
            title: '所属组',
            dataIndex: 'projectGroup',
        },
        {
            title: '负责人',
            dataIndex: 'projectOwner'
        },
        {
            title: '操作',
            key: 'operation',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEditClick(record)}>编辑</a>
                    <a style={{"color": "red"}}>删除</a>
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
        version: 0
    })
    // 分页状态
    // const [pagination,setPagination] = useState({})
    // 抽屉控制器
    const [drawerVisible, setDrawerVisible] = useState(false);
    // 暂存数据值用于抽屉表单的回显
    const [editData, setEditData] = useState(null)

    const dispatch = useDispatch()

    // 钩子函数，渲染完页面就访问一次列表页
    useEffect(() => {
        dispatch(GetProjectList(1, 10))

    }, [dispatch])

    // 编辑按钮回调(调用接口获取详情)
    const handleEditClick = async (record) => {
        const reqBody = {
            "projectId": record.projectId
        }
        const url = "http://localhost:8080/project/getProjectDetail";
        try {
            const res = await axios.post(url, reqBody);
            setProjectInfo(res.data.data)
        } catch (error) {
            console.error("Error:", error);
        }
        setDrawerVisible(true)
    }

    // 抽屉关闭事件回调
    const handleCloseClick = () => {
        setDrawerVisible(false);
        setEditData(null);
    }

    // 分页回调
    const handlePagination = (currentPage) => {
        // 更新
        console.log("currentPage", currentPage)
        // 根据当前页码，发起新的回调
        dispatch(GetProjectList(currentPage))
    }

    // 编辑当前行
    const currentId = (record) => {
        return record.id
    }

    // 获得当前行的projctId
    const currentProjectId = (record) => {
        return record.projectId
    }

    // 从回调中拿到数据渲染列表
    const projectListData = useSelector(state => state.projectList)
    const resData = projectListData.projectList
    const rowData = resData.items
    // const data = projectListData.map((item) => item.items)
    // 结果转化为数组
    // console.log(datas.map((data) => data.id))
    // console.log("resData", resData)

    return (
        <>
            <Table
                columns={columns}
                rowKey={currentId}
                dataSource={rowData}
                pagination={{
                    pageSize: resData.pageSize,
                    total: resData.totalCounts,
                    showTotal: (total) => `共 ${total} 条`,
                    onChange: handlePagination
                }}
                // pagination={<Page total={23}/>}
                loading={loading}
                // onChange={handleTableChange}
            />

            <DetailDrawer
                editData={projectInfo}
                drawerVisible={drawerVisible}
                handleClose={handleCloseClick}
            />
        </>
    );
};
export default ProjectList;