import React, {useEffect, useState} from 'react';
import {Pagination, Space, Table} from 'antd';
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {GetPagination, GetProjectList} from "./Store/Modules/ProjectStore";
import _ from "lodash";
import dayjs from "dayjs";
import Page from "../../../Pagination/Page";

const columns = [
    {
        title: '项目名',
        dataIndex: 'projectName',
        width: '20%',
    },
    {
        title: '项目前缀',
        dataIndex: 'projectUrl',
        width: '20%',
    },
    {
        title: '备注',
        dataIndex: 'remark'
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
    },
    {
        title: '操作',
        key: 'operation',
        render: () => (
            <Space size="middle">
                <a>编辑</a>
                <a style={{"color": "red"}}>删除</a>
            </Space>
        )
    }
];


const ProjectList = () => {
    const [loading, setLoading] = useState(false);
    // 分页状态
    // const [pagination,setPagination] = useState({})

    const dispatch = useDispatch()
    // 钩子函数，渲染完页面就访问一次列表页
    useEffect(() => {
        dispatch(GetProjectList(1,10))

    }, [dispatch])


    // 从回调中拿到数据渲染列表
    const projectListData = useSelector(state => state.projectList)
    const resData = projectListData.projectList
    const rowData = resData.items
    // const data = projectListData.map((item) => item.items)
    // 结果转化为数组
    // console.log(datas.map((data) => data.id))
    // console.log("resData", resData)

    // 分页回调
    const handlePagination= (currentPage) => {
        // 更新
        console.log("currentPage",currentPage)
        // 根据当前页码，发起新的回调
        dispatch(GetProjectList(currentPage))
    }

    return (
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={rowData}
                pagination={{
                    pageSize: resData.pageSize,
                    total: resData.totalCounts,
                    showTotal:(total) => `共 ${total} 条`,
                    onChange: handlePagination
                }}
                // pagination={<Page total={23}/>}
                loading={loading}
                // onChange={handleTableChange}
            />
    );
};
export default ProjectList;