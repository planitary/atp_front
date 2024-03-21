import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import PlatformApp from "./Platform/PlatformApp";

const root = createRoot(document.querySelector('#root'))

root.render(
    <PlatformApp/>
)