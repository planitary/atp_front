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
    console.log("projectInfo",projectInfo);
    let res = "";
    try {
        res = await axios.post(url,projectInfo);
        console.log("res:",res.data);
    }catch (error){
        res = error.response
        console.log("Error:",res);
    }
    return res;
}

// 更新接口
async function updateInterface(interfaceDto){
    const url = 'http://localhost:8080/interface/updateInterfaceV2'
    let res = "";
    try {
        res = await axios.post(url,interfaceDto);
        console.log("res:",res.data);
    }catch (error){
        res = error.response
        console.log("error:",res);
    }
    return res;
}



async function addProject(project){
    const url = "http://localhost:8080/project/addProject"
    let res = "";
    try {
        res = await axios.post(url,project);
    }catch (error){
        res = error.response;
    }
    return res
}

async function addInterface(interfaceDTO){
    const url = "http://localhost:8080/interface/addInterface"
    let res = "";
    try {
        res = await axios.post(url,interfaceDTO);
    }catch (error){
        res = error.response;
    }
    return res
}

async function deleteProject(projectId){
    const url = "http://localhost:8080/project/deleteProject"
    const reqBody = {
        projectId: projectId
    }
    let res = "";
    try {
        res = await axios.post(url,reqBody);
    }catch (error){
        res = error.response
    }
    return res;
}

async function findInterfaceList(){
    const url = "http://localhost:8080/interface/interfaceList"
    const reqBody = {
        projectIds: ["6065028530065030","42572254526"]
    }
    let res = "";
    try {
        res = await axios.post(url,reqBody);
    }catch (error){
        res = error.response
    }
    return res;
}

export {updateProject,deleteProject,addProject,findInterfaceList,updateInterface,addInterface}