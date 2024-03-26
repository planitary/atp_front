import {createBrowserRouter} from "react-router-dom";
import PlatformApp from "../../Main/PlatformApp";
import ProjectList from "../Content/Project/ProjectList";
import Layout from "../../Layout/Layout";

const OuterRouter = createBrowserRouter([
    {
        path: '/',
        element: <PlatformApp/>,
        children:[
            {
                path: '/platform/projectList',
                element: <ProjectList/>,
            }

        ]
    }
])

export default OuterRouter