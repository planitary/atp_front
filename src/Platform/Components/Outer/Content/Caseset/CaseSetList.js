import {Space, Table, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetCaseSetList, GetInterfaceList, GetProjectList} from "../../Store/Modules/ProjectStore";
import {InfoCircleOutlined} from "@ant-design/icons";

const CaseSetList = () => {

    const handleEditClick = () => {

    }

    const handleDeleteClick = () => {

    }
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
            render: (parameterList) => (
                <Tooltip placement="topLeft" title={parameterList}>
                    {parameterList}
                </Tooltip>
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
        {
            title: (
                <div>
                    参数提取列表
                    <Tooltip title="鼠标悬浮在单元格内可查看详情">
                        <InfoCircleOutlined className="interface-title-icon"/>

                    </Tooltip>
                </div>),

            dataIndex: 'parameterList',
            width: '12%',
            ellipsis: {
                showTitle: false
            },
            render: (parameterList) => (
                <Tooltip placement="topLeft" title={parameterList}>
                    {parameterList}
                </Tooltip>
            )
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
                    <a>编辑</a>
                    <a style={{"color": "red"}}>删除</a>
                </Space>
            )
        }
    ];


    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch((GetCaseSetList(1, 10)))
    }, [dispatch])

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
        </>
    )
}

export default CaseSetList