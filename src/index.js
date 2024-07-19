import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import PlatformApp from "./Platform/Components/Main/PlatformApp";
import {RouterProvider} from "react-router-dom";
import projectStore from "./Platform/Components/Outer/Store";
import OuterRouter from "./Platform/Components/Outer/Router/OuterRouter";
import InnerRouter from "./Platform/Components/Outer/Router/InnerRouter";

const root = createRoot(document.querySelector('#root'))

root.render(
    // <RouterProvider router={<PlatformApp/>}/>
    <Provider store={projectStore}>
        <RouterProvider router={OuterRouter}/>
        {/*<RouterProvider router={InnerRouter}/>*/}
        {/*<PlatformApp/>*/}
    </Provider>
)