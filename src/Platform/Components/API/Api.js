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

export {updateProject,deleteProject}