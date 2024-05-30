import axios from "axios";

const projectInfo = {
    projectId: "",
    projectName: "",
    projectUrl: "",
    remark: "",
    projectGroup: "",
    projectOwner: "",
    projectLevel: "",
    version: 0
}


// 更新项目
async function updateProject(projectInfo) {
    const url = 'http://localhost:8080/project/updateProject'
    console.log("projectInfo", projectInfo);
    let res = "";
    try {
        res = await axios.post(url, projectInfo);
        console.log("res:", res.data);
    } catch (error) {
        res = error.response
        console.log("Error:", res);
    }
    return res;
}

// 更新接口
async function updateInterface(interfaceDto) {
    const url = 'http://localhost:8080/interface/updateInterfaceV2'
    let res = "";
    try {
        res = await axios.post(url, interfaceDto);
        console.log("res:", res.data);
    } catch (error) {
        res = error.response
        console.log("error:", res);
    }
    return res;
}


async function addProject(project) {
    const url = "http://localhost:8080/project/addProject"
    let res = "";
    try {
        res = await axios.post(url, project);
    } catch (error) {
        res = error.response;
    }
    return res
}

async function addInterface(interfaceDTO) {
    const url = "http://localhost:8080/interface/addInterface"
    let res = "";
    try {
        res = await axios.post(url, interfaceDTO);
    } catch (error) {
        res = error.response;
    }
    return res
}

async function deleteProject(projectId) {
    const url = "http://localhost:8080/project/deleteProject"
    const reqBody = {
        projectId: projectId
    }
    let res = "";
    try {
        res = await axios.post(url, reqBody);
    } catch (error) {
        res = error.response
    }
    return res;
}

async function findInterfaceList() {
    const url = "http://localhost:8080/interface/interfaceList"
    const reqBody = {
        projectIds: ["6065028530065030", "42572254526"]
    }
    let res = "";
    try {
        res = await axios.post(url, reqBody);
    } catch (error) {
        res = error.response
    }
    return res;
}

async function getProject(projectLikeName, projectUrl, projectId) {
    const reqBody = {
        pageNo: 1,
        pageSize: 20,
        projectName: projectLikeName,
        projectUrl: projectUrl,
        projectId: projectId
        // 查询参数
    };
    const url = "http://localhost:8080/project/projectList";
    let res = "";
    try {
        res = await axios.post(url, reqBody);
    } catch (error) {
        res = error.response
    }
    return res;
}

// 获取用例集合详情
async function getCaseSetDetail(setId) {
    const params = {
        setId: setId
    };
    const url = "http://localhost:8080/caseSet/getCaseSetDetail";
    let res = "";
    try {
        res = await axios.get(url, { params }); // 注意这里是 `params`
    } catch (error) {
        if (error.response) {
            // 请求已经发出，但服务器返回了状态码在 2xx 之外
            res = error.response;
        } else if (error.request) {
            // 请求已经发出，但没有收到响应
            res = { message: "No response received", request: error.request };
        } else {
            // 其他错误
            res = { message: error.message };
        }
    }
    return res;
}

export {updateProject, deleteProject, addProject, findInterfaceList, updateInterface, addInterface, getProject
,getCaseSetDetail}