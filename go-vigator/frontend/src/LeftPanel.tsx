import { MouseEventHandler, useState } from "react";
import FolderImg from "./assets/images/folder-svgrepo-com.svg";
import "./App.css";

function LeftPanel(props: { callUpdatePath: (e: string) => void }) {
  function UpdatePath(path: string) {
    if (path == "Home") props.callUpdatePath("C:/");
    else props.callUpdatePath("C:/" + path);
  }
  const leftPanelElement = [
    "Home",
    "Downloads",
    "Documents",
    "Music",
    "Videos",
    "Pictures",
    "Desktop",
  ];
  return (
    <div className="left-panel">
      <ul className="mainFolders">
        {leftPanelElement.map((element, index) => {
          return (
            <li
              onClick={(e) => {
                e.preventDefault();
                UpdatePath(element);
              }}
            >
              <img src={FolderImg} className="leftPanelIcon"></img>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftPanel;
