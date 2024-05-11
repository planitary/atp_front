import {createBrowserRouter} from "react-router-dom";
import PlatformApp from "../../Main/PlatformApp";
import ProjectList from "../Content/Project/ProjectList";
import CaseSetList from "../Content/Caseset/CaseSetList"
import Layout from "../../Layout/Layout";
import InterfaceList from "../Content/Interface/InterfaceList";

const OuterRouter = createBrowserRouter([
    {
        path: '/',
        element: <PlatformApp/>,
        children:[
            {
                path: '/platform/projectList',
                element: <ProjectList/>,
            },
            {
                path: '/platform/interfaceList',
                element: <InterfaceList/>
            },
            {
                path: '/platform/casesetList',
                element: <CaseSetList/>
            }
        ]
    }
])

export default OuterRouter