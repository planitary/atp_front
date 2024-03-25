import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {GetPagination, GetProjectList, getProjectList} from "./Store/Modules/ProjectStore";
import _ from "lodash";
import dayjs from "dayjs";
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
    }
];
const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});


const ProjectList = () => {
    const [loading, setLoading] = useState(false);
    const tableParams = GetPagination();

    const dispatch = useDispatch()
    // 钩子函数，渲染完页面就访问一次列表页
    useEffect((setLoading) => {
        dispatch(GetProjectList(setLoading))

    },[dispatch])


    // 从回调中拿到数据渲染列表
    const projectListData = useSelector(state => state.projectList)
    const rowData = projectListData.projectList.items
    // const data = projectListData.map((item) => item.items)
    // 结果转化为数组
    const datas = Array.isArray(rowData) ? rowData:[]
    // console.log(datas.map((data) => data.id))
    return (
        <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={rowData}
            pagination={tableParams}
            loading={loading}
            // onChange={handleTableChange}
        />
    );
};
export default ProjectList;