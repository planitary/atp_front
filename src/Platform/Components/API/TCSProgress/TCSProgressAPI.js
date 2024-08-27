// 添加用例集合步骤
import axios from "axios";
import {List} from "antd";
import article from "../../../../Test/page/Article";

async function addTCSProgress(progressList,setId,projectInfo) {
    const url = "http://localhost:8080/caseset/progress/addProgress";
    let res = "";
    const progressInfoList = {
        progressList: progressList,
        setId: setId,
        projectInfo: projectInfo
    };
    try {
        res = await axios.post(url, progressInfoList);
    }catch (error){
        if (error.response){
            res = error.response;
        }else if (error.request){
            res = {
                message: "No Response received",
                request: error.request
            };
        }else {
            res = {
                message: error.message
            }
        }
    }
    return res;
}
export {addTCSProgress}