import {Pagination} from "antd";

const Page = ({total}) => {
    console.log(total)
    return (
        <>
            <Pagination
                total={total}
                showTotal={(total) => `共 ${total} 页`}
                defaultPageSize={10}
                defaultCurrent={1}
            />
        </>
    )
}

export default Page