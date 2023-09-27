import { SearchResponse } from "./App";
import FolderImage from "./FolderImage";

function RightSearch(props: { path: string, result: SearchResponse[], setIsSearched: React.Dispatch<React.SetStateAction<boolean>> }) {

    return <>
        <div className="Right">
            <div className="close">
                <div>
                    <div>{props.result.length} Files</div>
                    <div>Searched For "<i style={{ fontSize: "small" }}>{props.result.length && props.result[0].Source}</i>"</div>
                    <div>Inside "<i style={{ fontSize: "small" }}>{props.path}</i>"</div>
                </div>
                <button onClick={() => { props.setIsSearched(false) }}>close</button>
            </div>
            <div className="RightSearch">
                {props.result.map((val: SearchResponse) => {
                    return <div className="fileRow">
                        <FolderImage className="serachFileIcon" filename={val.Target} />
                        <div style={{ textAlign: "left" }}>{val.Target.substring(1)}</div>
                    </div>;
                })}
            </div>
        </div >

    </>;
}

export default RightSearch;

// (props.path[props.path.length - 1] == "\\" ? props.path.substring(0, props.path.length - 1) : props.path) + 