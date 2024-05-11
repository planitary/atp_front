import {Space, Table, Tag} from "antd";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const CaseSetList = () => {

    const handleEditClick = () => {

    }

    const handleDeleteClick = () => {

    }
    const columns = [
        {
            title: '集合名',
            dataIndex: 'CasesetName',
            width: '10%',
        },
        {
            title: '所屬項目',
            dataIndex: 'projectId',
            width: '10%',
        },
        {
            title: '權重',
            dataIndex: 'weight',
            width: '8%'
        },

        // {
        //     title: '创建人',
        //     dataIndex: 'createUser',
        // },
        {
            title: '參數提取列表',
            dataIndex: 'parameterList',
        },
        {
            title: '负责人',
            dataIndex: 'owner'
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
                    <a >编辑</a>
                    <a style={{"color": "red"}}>删除</a>
                </Space>
            )
        }
    ];

    const [currentPage,setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // 从回调中拿到数据渲染列表
    const projectListData = useSelector(state => state.projectList)
    const resData = projectListData.projectList
    const rowData = resData.items

    const dispatch = useDispatch()
    // 分页回调
    const handlePagination = (currentPage) => {
        // 更新
        setCurrentPage(currentPage);
        // 根据当前页码，发起新的回调
        // dispatch(GetProjectList(currentPage)).then(
        //     setLoading(false)
        // )
    }

    const currentId = (record) => {
        return record.id
    }

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
                // pagination={<Page total={23}/>}
                loading={loading}
                // onChange={handleTableChange}
            />
        </>
    )
}

export default CaseSetList