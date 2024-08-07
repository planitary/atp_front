import React, { useState } from 'react';
import { Select ,message} from 'antd';
import { getInterfaceByName } from "../../../../../API/Api";
let timeout;
let currentValue;


const fetch = (value, callback,projectId) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const getValues = () => {
        getInterfaceByName(value,projectId)
            .then((d) => {
                if (currentValue === value) {
                    const result = d.data.data;
                    console.log(result)
                    if (result.length === 0)
                        // message.error("当前项目不存在此接口!").then(currentValue === "")
                        console.log(1)
                    else {
                        const data = result.map((item) => ({
                            value: item.interfaceName,
                            text: item.interfaceName,
                            ...item  // 将item的其他属性也包括进来
                        }));
                        callback(data);
                    }
                }
            });
    };
    if (value) {
        timeout = setTimeout(getValues, 300);
    } else {
        callback([]);
    }
};

const SearchInput = (props) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const handleSearch = (newValue) => {
        fetch(newValue, setData,props.projectId);
    };
    const handleChange = (newValue) => {
        setValue(newValue);
        const selectedOption = data.find(item => item.value === newValue);
        props.onChange(selectedOption);
    };
    return (
        <Select
            onBlur={props.onBlur}
            showSearch
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
        />
    );
};

const InterfaceSelectorSingle = ({ onChange, onBlur,projectId }) => (
    <SearchInput
        placeholder="请输入接口名进行查询"
        style={{ width: 150 }}
        onChange={onChange}
        onBlur={onBlur}
        projectId={projectId}
    />
);

export default InterfaceSelectorSingle;
