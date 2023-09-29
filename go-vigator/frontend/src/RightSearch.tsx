import { SearchResponse } from "./App";
import FolderImage from "./FolderImage";
import { OpenFile } from "../wailsjs/go/main/App";

function removeConsecutiveBackslashes(inputString: string): string {
  return inputString.replace(/\\+/g, "\\");
}

function RightSearch(props: {
  path: string;
  result: SearchResponse[];
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function OperationOnFileOrDirectory(currentName: string) {
    let fullPath = props.path + "\\" + currentName;
    // fullPath = removeConsecutiveBackslashes(fullPath)
    console.log(removeConsecutiveBackslashes(fullPath));
    // remove the last character from the path
    if (fullPath[fullPath.length - 1] == "\\") {
      fullPath = fullPath.slice(0, -1);
    }
    OpenFile(fullPath)
      .then(() => console.log("opened"))
      .catch((err) => window.alert(err));
  }

  return (
    <>
      <div className="Right">
        <div className="close">
          <div>
            <div>{props.result.length} Files</div>
            <div>
              Searched For "
              <i style={{ fontSize: "small" }}>
                {props.result.length && props.result[0].Source}
              </i>
            </div>
            <div>
              Inside "<i style={{ fontSize: "small" }}>{props.path}</i>"
            </div>
          </div>
          <button
            onClick={() => {
              props.setIsSearched(false);
            }}
          >
            close
          </button>
        </div>
        <div className="RightSearch">
          {props.result.map((val: SearchResponse, key) => {
            return (
              <div
                className="fileRow"
                key={`${key}`}
                onDoubleClick={() => {
                  OperationOnFileOrDirectory(val.Target.substring(1));
                }}
              >
                <FolderImage
                  className="serachFileIcon"
                  filename={val.Target}
                  currentpath={props.path}
                />
                <div style={{ textAlign: "left" }}>
                  {val.Target.substring(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RightSearch;

// (props.path[props.path.length - 1] == "\\" ? props.path.substring(0, props.path.length - 1) : props.path) +
