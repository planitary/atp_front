import React from "react";
import {ReactComponent as RedisMulti} from "../icons/RedisMulti.svg";


const icons = {
    RedisMulti,
};
// 封裝svg為組件

const CustomSvgIcon = ({name, ...props}) => {
    const IconComponent = icons[name];
    if (!IconComponent){
        return <span>Icon not found</span>
    }
    return <IconComponent {...props} />
}

export default CustomSvgIcon