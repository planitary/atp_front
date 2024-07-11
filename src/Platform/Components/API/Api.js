import axios from "axios";


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

// 更新集合
async function updateCaseSet(TCSDto) {
    const url = 'http://localhost:8080/caseSet/updateCaseSet'
    let res = "";
    try {
        res = await axios.post(url, TCSDto);
        console.log("res:", res.data);
    } catch (error) {
        res = error.response;
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

// 插入用例
async function addTCS(TCSInfo){
    const url = "http://localhost:8080/caseSet/insertCaseSet"
    let res = "";
    try {
        res = await axios.post(url,TCSInfo);
    }catch (error){
        res = error.response;
    }
    return res;
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

async function deleteInterface(interfaceId){
    const url = "http://localhost:8080/interface/deleteInterfaceById"
    const reqBody = {
        interfaceId: interfaceId
    }
    let res = "";
    try {
        res = await axios.post(url,reqBody);
    }catch (error){
        res = error.response
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
        res = await axios.get(url, {params}); // 注意这里是 `params`
    } catch (error) {
        if (error.response) {
            // 请求已经发出，但服务器返回了状态码在 2xx 之外
            res = error.response;
        } else if (error.request) {
            // 请求已经发出，但没有收到响应
            res = {message: "No response received", request: error.request};
        } else {
            // 其他错误
            res = {message: error.message};
        }
    }
    return res;
}

// 通过名称获取接口
async function getInterfaceByName(interfaceName,projectId) {
    const reqBody = {
        interfaceName: interfaceName,
        projectId: projectId
    }
    const url = 'http://localhost:8080/interface/getInterfaceDetailByName';
    let res = "";
    try {
        res = await axios.post(url, reqBody);
    } catch (error) {
        res = error.response
    }
    return res;
}

// 批量添加接口
async function batchAddInterface(interfaceInfoList){
    const url = 'http://localhost:8080/interface/batchAddInterface';
    let res = "";
    try {
        res = await axios.post(url,interfaceInfoList);
    }catch (error){
        res = error.response
    }
    return res;

}

// 下载批量新增用例集合模板
async function getTCSTemplate() {
    let res = "";
    try {
        res = await axios.post('http://localhost:8080/exe/excel/getTestCaseTemplate',{},{responseType:'blob'});
        // 创建一个URL指向Blob对象
        const url = window.URL.createObjectURL(new Blob([res.data]));
        // 创建一个隐藏的<a>元素，并设置其href属性为刚创建的URL。
        const link = document.createElement('a');
        link.href = url;
        // 设置下载的文件名
        // 提取文件名（可以根据后端返回的头信息或其他方式）
        const contentDisposition = res.headers['content-disposition'];
        console.log("contentDisposition",contentDisposition)
        let fileName = '';
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch && fileNameMatch[1]) {
                fileName = fileNameMatch[1];
            }
        }else {
            fileName = "TestCase" + Date.now() +".xlsx"
        }


        link.setAttribute('download', fileName); // 设置下载文件的名字
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error){
        res = error.response
    }
    return res;
}

// 下载通用模板
async function getTCSTemplateCommon(bizCode) {
    const reqBody = {
        bizCode: bizCode,
    };
    console.log(bizCode);
    let res = ""
    try {
        res = await axios.post("http://localhost:8080/exe/excel/getTestCaseTemplateCommon", reqBody, { responseType: 'blob' });

        // 创建一个URL指向Blob对象
        const url = window.URL.createObjectURL(new Blob([res.data]));

        // 创建一个隐藏的<a>元素，并设置其href属性为刚创建的URL
        const link = document.createElement('a');
        link.href = url;

        // 提取文件名
        const contentDisposition = res.headers['content-disposition'];
        console.log("contentDisposition", contentDisposition);

        let fileName = 'default.xlsx';
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch && fileNameMatch[1]) {
                fileName = fileNameMatch[1];
            }
         }else {
            let prefix = ''
            if (bizCode === 'EX001'){
                prefix = 'BATCH_ADD_INTERFACE'
            }
            else if (bizCode === 'EX002'){
                prefix = 'BATCH_ADD_TCS'
            }
            else if (bizCode === 'EX003'){
                prefix = 'BATCH_ADD_PROJECT'
            }
            fileName = prefix + "_" + Date.now() +".xlsx"
        }

        link.setAttribute('download', fileName); // 设置下载文件的名字
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error){
        res = error.response
    }
    return res;
}


export {
    updateProject, deleteProject, addProject, findInterfaceList, updateInterface, addInterface, getProject
    , getCaseSetDetail, updateCaseSet, getInterfaceByName,getTCSTemplateCommon,addTCS,batchAddInterface,deleteInterface
}