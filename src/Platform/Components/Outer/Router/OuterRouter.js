import {createBrowserRouter} from "react-router-dom";
import PlatformApp from "../../Main/PlatformApp";
import ProjectList from "../Content/Project/ProjectList";
import CaseSetList from "../Content/Caseset/CaseSetList"
import Layout from "../../Layout/Layout";
import InterfaceList from "../Content/Interface/InterfaceList";
import CaseSetExecute from "../Content/Caseset/CaseSetExecute";
import AddTCSFormV2 from "../Content/Caseset/Component/TCSProgress/AddTCSFormV2";
import ProgressPage from "../Content/Caseset/Component/TCSProgress/ProgressPage";
import EmptyPage from "../Content/Caseset/Component/TCSProgress/EmptyPage";
import TCSExecuteResultPage from "../Content/Caseset/Component/TCSExcute/TCSExecuteReultPage";

const OuterRouter = createBrowserRouter([
    {
        path: '/',
        element: <PlatformApp/>,
        children:[
            {
                path: '/platform/project/projectList',
                element: <ProjectList/>,
            },
            {
                path: '/platform/interface/interfaceList',
                element: <InterfaceList/>
            },
            {
                path: '/platform/caseset/casesetList',
                element: <CaseSetList/>
            },
            {
                path: '/platform/caseset/casesetExecute',
                element: <CaseSetExecute/>
            },
            {
                path: '/platform/caseset/editProgress',
                element:<AddTCSFormV2/>
            },
            {
                path: '/platform/caseset/emptyProgressPage',
                element:<EmptyPage/>
            },
            {
                path: '/platform/caseset/progressList',
                element:<ProjectList/>
            },
            {
                path: '/platform/caseset/casesetExecute/exeResult',
                element:<TCSExecuteResultPage />
            }
        ]
    },
])

export default OuterRouter