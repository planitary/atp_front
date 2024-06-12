import React, { useState } from 'react';
import { Select } from 'antd';
import {getProject} from "../../../../API/Api";
let timeout;
let currentValue;
const fetch = (value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const getValues = () => {
        getProject(value,'','')
            .then((d) => {
                if (currentValue === value) {
                    const result = d.data.items;
                    console.log(result)
                    const data = result.map((item) => ({
                        value: item.projectName,
                        text: item.projectName,
                        id: item.projectId
                    }));
                    callback(data);
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
        fetch(newValue, setData);
    };
    // Ant Design 的 Select 组件 onChange 方法默认只传递选中项的 value。
    // 但可以通过 options 的 value 和 label 属性传递额外的信息
    const handleChange = (value,option) => {
        console.log(option)
        setValue(value);
        props.onchange(option)
    };
    return (
        <Select
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
                id: d.id
            }))}
        />
    );
};
const ProjectSelectorSingle = ({onchange,width}) => (
    <SearchInput
        placeholder="请输入项目名进行查询"
        style={{
            width: width
        }}
        onchange = {onchange}
    />
);
export default ProjectSelectorSingle;