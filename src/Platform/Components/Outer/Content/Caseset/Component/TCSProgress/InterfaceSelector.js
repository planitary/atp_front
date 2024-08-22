import React, { useState } from 'react';
import {Empty, Select, Spin} from 'antd';
import debounce from 'lodash/debounce';
import { getInterfaceByName } from "../../../../../API/Api";

const { Option } = Select;

const SearchSelect = ({ fetchOptions ,handleData,initValue}) => {
    console.log(initValue)
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
            defaultValue={initValue.interfaceName}
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

const InterfaceSelector = ({ projectId ,handleData,initValue}) => {

    const fetchOptions = async (search) => {
        const response = await getInterfaceByName(search, projectId);
        if (response.data.code === '0') {
            return response.data.data.map(item => ({
                value: item.interfaceName,
                label: item.interfaceName,
                id: item.interfaceId,
                url: item.interfaceUrl,
                requestBody: item.requestBody
            }));

        }
        return [];
    };

    return (
        <div style={{ width: "100%" }}>
            <SearchSelect fetchOptions={fetchOptions} handleData={handleData} initValue={initValue}/>
        </div>
    );
};

export default InterfaceSelector;
