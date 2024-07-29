import {Button, Empty, Typography} from "antd";
import file from "../../../../../../Static/icons/empty-box-svgrepo-com.svg"



const EmptyPage = ({handlePage}) => {

    return (
        <span style={{marginBottom: "10px"}}>
        <Empty
            image={Empty.PRESENTED_IMAGE_DEFAULT}
            imageStyle={{
                height: 80,
                marginTop: 40
            }}
            description={
                <Typography.Text>
                    空空如也 点击下方按钮开始新增
                </Typography.Text>
            }
        >
            <Button type={"primary"} onClick={() => handlePage(1)}>新增步骤</Button>

        </Empty>
    </span>
    )
};

        export default EmptyPage