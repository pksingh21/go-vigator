import { MouseEventHandler, useState } from "react";
import FolderImg from "./assets/images/windows11-folder-default.svg";
import DownloadImg from "./assets/images/Downloads.ico";
import DesktopImg from "./assets/images/Desktop.ico";
import MusicImg from "./assets/images/Music.ico";
import VidoesImg from "./assets/images/Videos.ico";
import PictureImg from "./assets/images/Photos.ico";
import DocumentsImg from "./assets/images/Documents.ico";
import { GetUser } from "../wailsjs/go/main/App"

import "./App.css";

function LeftPanel(props: { callUpdatePath: (e: string) => void }) {
  function UpdatePath(path: string) {
    if (path == "Home") props.callUpdatePath("C:/");
    else props.callUpdatePath(path);
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

  function IconFetch(name: string) {
    if (name == "Downloads") {
      return DownloadImg;
    }
    if (name == "Home") {
      return DesktopImg
    }
    if (name == "Music") {
      return MusicImg;
    }
    if (name == "Pictures") {
      return PictureImg;
    }
    if (name == "Desktop") {
      return DesktopImg;
    }
    if (name == "Documents") {
      return DocumentsImg;
    }
    if (name == "Videos") {
      return VidoesImg
    }

  }

  let user = "";
  GetUser().then((val: string) => {
    if (val != "error") {
      user = val;
    }
  }).catch();

  return (
    <div className="left-panel">
      <ul className="mainFolders">
        {leftPanelElement.map((element, index) => {
          return (
            <li
              key={element}
              onClick={(e) => {
                e.preventDefault();

                // UpdatePath(element);
                if (element == "Downloads") {
                  return UpdatePath(user + "\\Downloads\\");
                }
                if (element == "Home") {
                  return UpdatePath(user + "");
                }
                if (element == "Music") {
                  return UpdatePath(user + "\\Music\\");
                }
                if (element == "Pictures") {
                  return UpdatePath(user + "\\Gallery\\");
                }
                if (element == "Desktop") {
                  return UpdatePath(user + "\\Desktop\\");
                }
                if (element == "Documents") {
                  return UpdatePath(user + "\\Documents\\");
                }
                if (element == "Videos") {
                  return UpdatePath("C:\\Videos\\");
                }
              }}
            >
              <img src={IconFetch(element)} className="leftPanelIcon"></img>
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftPanel;
