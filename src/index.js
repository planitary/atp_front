import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import PlatformApp from "./Platform/PlatformApp";
import {RouterProvider} from "react-router-dom";
import projectStore from "./Platform/Components/Outer/Content/Project/Store";

const root = createRoot(document.querySelector('#root'))

root.render(
    // <RouterProvider router={<PlatformApp/>}/>
    <Provider store={projectStore}>
        <PlatformApp/>
    </Provider>
)