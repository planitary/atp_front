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
        console.log("Error:",error);
    }
    return res;
}

export {updateProject}