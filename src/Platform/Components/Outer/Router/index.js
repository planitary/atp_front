import {createBrowserRouter} from "react-router-dom";
import PlatformApp from "../../../PlatformApp";

const OuterRouter = createBrowserRouter([
    {
        path: '/ATPlatform',
        element: <PlatformApp/>,
        children:[
            {
                path: '/automationTest/project/projectList'
            }

        ]
    }
])