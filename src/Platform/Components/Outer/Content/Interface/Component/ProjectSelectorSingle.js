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
    const handleChange = (newValue) => {
        setValue(newValue);
        props.onchange(newValue)
    };
    console.log("value:",value)
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
            }))}
        />
    );
};
const ProjectSelectorSingle = ({onchange}) => (
    <SearchInput
        placeholder="请输入项目名进行查询"
        style={{
            width: 200,
        }}
        onchange = {onchange}
    />
);
export default ProjectSelectorSingle;