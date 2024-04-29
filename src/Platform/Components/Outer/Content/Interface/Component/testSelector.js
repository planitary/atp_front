import {Select} from "antd";

const TestSelector = ({value,onchange}) => {
    const handleSelectionChange = (e) => {
        console.log(e)
        onchange(e);
    };

    return(
        <Select value={value} onChange={handleSelectionChange}
                style={{width:'20%'}}
        options={[
            {
                value: 'jack',
                label: 'jack'
            },
            {
                value: 'petet',
                label: 'peter'
            }
        ]}>

        </Select>
    )

}

export default TestSelector