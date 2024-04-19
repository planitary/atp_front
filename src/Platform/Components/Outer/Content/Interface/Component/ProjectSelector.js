import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import '../InterfaceList.scss'
import axios from "axios";
import {value} from "lodash/seq";
import {useSelector} from "react-redux";
import {Option} from "antd/es/mentions";

function DebounceSelect({ fetchOptions, defaultValue,debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([{label: 1,value:2},{}]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            className="interface-top-selector"
            labelInValue
            filterOption={false}

            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}



// Usage of DebounceSelect

async function fetchUserList(projectName) {
    console.log('fetching user', projectName);
    const reqBody = {
        pageNo: 1,
        pageSize: 10,
        projectName: projectName
    };
    const url = "http://localhost:8080/project/projectList";
    try {
        const res = await axios.post(url,reqBody);
        return res.data.items.map((project) => ({
            label: `${project.projectName}`,
            value: `${project.projectId},`
        }));
    }catch (error){
        console.error("fetching projectList error!")
        return [];
    }
}
const ProjectSelector = ({defaultValue}) => {
    const [value, setValue] = useState([]);
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="搜索并选择项目名"
            fetchOptions={fetchUserList}
            defaultValue={defaultValue}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            style={{
                width: '100%',
            }}
        />
    );
};
export default ProjectSelector;