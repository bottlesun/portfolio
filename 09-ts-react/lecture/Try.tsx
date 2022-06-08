import * as React from "react";
import {TryInfo} from "./Types";

const Try: React.FunctionComponent<{ tryInfo: TryInfo}> = ({tryInfo}) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}
export default Try;