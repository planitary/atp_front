import React, { useState } from 'react';
import {Empty, Select, Spin} from 'antd';
import debounce from 'lodash/debounce';
import { getInterfaceByName } from "../../../../../API/Api";

const { Option } = Select;

const SearchSelect = ({ fetchOptions ,handleData}) => {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false);

    const fetchOptionsDebounced = debounce(async (value) => {
        if (!value) {
            setOptions([]);
            return;
        }

        setFetching(true);
        try {
            const data = await fetchOptions(value);
            setOptions(data);
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            setFetching(false);
        }
    }, 800);

    return (
        <Select
            showSearch
            placeholder="输入接口名进行查询"
            notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
            filterOption={false}
            onSearch={fetchOptionsDebounced}
            style={{ width: "100%" }}
            onChange={() => handleData(options)}

        >
            {options.map(option => (
                <Option key={option.id} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

const InterfaceSelector = ({ projectId ,handleData}) => {


    const fetchOptions = async (search) => {
        const response = await getInterfaceByName(search, projectId);
        if (response.data.code === '0') {
            return response.data.data.map(item => ({
                value: item.interfaceName,  // 使用接口返回的唯一标识作为 value
                label: item.interfaceName,
                id: item.interfaceId,// 使用接口返回的名称作为 label
                url: item.interfaceUrl,
                requestBody: item.requestBody
            }));

        }
        return [];
    };

    return (
        <div style={{ width: "100%" }}>
            <SearchSelect fetchOptions={fetchOptions} handleData={handleData} />
        </div>
    );
};

export default InterfaceSelector;
