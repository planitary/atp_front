import {createBrowserRouter, Route, Router} from "react-router-dom";
import PlatformApp from "../../Main/PlatformApp";
import ProjectList from "../Content/Project/ProjectList";
import CaseSetList from "../Content/Caseset/CaseSetList"
import Layout from "../../Layout/Layout";
import InterfaceList from "../Content/Interface/InterfaceList";
import CaseSetExecute from "../Content/Caseset/CaseSetExecute";
import {Switch} from "antd";
import AddTCSFormV2 from "../Content/Caseset/Component/TCSList/AddTCSFormV2";

const InnerRouter = () => {
    return (
        <Router >
            <Switch>
                <Route path="/platform/caseset/casesetExecute/edit" component={AddTCSFormV2}/>
            </Switch>
        </Router>
    )
}

export default InnerRouter