import FolderImg from "./assets/images/windows11-folder-default.svg";
("");
import JpgImg from "./assets/images/photo.png";
import TxtImg from "./assets/images/txt.png";
import PdfImg from "./assets/images/pdf.png";
import ExeImg from "./assets/images/exe.png";

import "./App.css";
import { FileCustomType } from "./App";
import { OpenFile, PushToHistory } from "../wailsjs/go/main/App";
import { useEffect, useRef, useState } from "react";
interface DisplayFolderFilesProps {
  files: FileCustomType[];
  currentPath: string;
  callUpdatePath: (newPath: string) => void;
}

function FolderImage(props: { filename: string }) {
  if (props.filename.includes(".png") || props.filename.includes(".jpg")) {
    return (
      <img src={JpgImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  if (props.filename.includes(".txt") || props.filename[0] == ".") {
    return (
      <img src={TxtImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  if (props.filename.includes(".pdf")) {
    return (
      <img src={PdfImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  if (props.filename.includes(".exe")) {
    return (
      <img src={ExeImg} id={props.filename} className="rightPanelIcon"></img>
    );
  }
  return (
    <img src={FolderImg} id={props.filename} className="rightPanelIcon"></img>
  );
}

function RightPanel(props: DisplayFolderFilesProps) {

  function OperationOnFileOrDirectory(currentName: string, file: boolean) {
    const fullPath = props.currentPath + currentName + "/";
    if (!file) {
      props.callUpdatePath(fullPath);
      PushToHistory(fullPath);
    } else
      OpenFile(fullPath)
        .then(() => console.log("opened"))
        .catch((err) => window.alert(err));
  }

  function shortenLongString(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
      return input;
    }

    const ellipsis = "...";
    const truncatedLength = maxLength - ellipsis.length;

    return input.substring(0, truncatedLength) + ellipsis;
  }

  const [name, setName] = useState("");
  const [vis, setVis] = useState(false);
  // const cntMenuRef = useRef(null);
  const [lPosition, setLPosition] = useState(0);
  const [tPosition, setTPosition] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);


  useEffect(() => {
    if (openedModal) {
      dialogModal.current?.showModal();
    } else {
      console.log("ran ")
      dialogModal.current?.close();
    }
  }, [openedModal])

  const closeContextMenu = (e: any) => {
    e.stopPropagation();
    if (e.target.className == "contextMenuClick")
      setOpenedModal(true);
    console.log("Clicked  : ", e)
    setVis(false);
  };

  const closeModal = (e: any) => {
    e.preventDefault();
    console.log("close kar bhai ")
    setOpenedModal(false);
  }

  const openContextMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setLPosition(e.clientX)
    setTPosition(e.clientY)

    // body.appendChild(contextMenu);
    setVis(true)
  };

  // if (vis) {
  //   window.addEventListener("click", closeContextMenu);
  // }

  const dialogModal: any = useRef(null);

  return (
    <div className="right-panel" onContextMenu={openContextMenu} onClick={closeContextMenu}>
      {openedModal && <dialog className="dialogModal" ref={dialogModal}>
        <form style={{ display: "flex" }}>
          <div className="labelModal">
            <div>Filename</div>
            <div onClick={closeModal}>X</div>
          </div>
          <input type="text" id="FileName"></input>
        </form>
      </dialog>}
      {vis && <div className="contextmenu" style={{ left: `${lPosition}px`, top: `${tPosition}px` }}>
        <button className="contextMenuClick" onClick={closeContextMenu}><i className="fa-solid fa-share"></i>New File</button>
        <button className="contextMenuClick" onClick={closeContextMenu}><i className="fa-solid fa-share"></i>New Folder</button>
        <button className="contextMenuClick" onClick={closeContextMenu}><i className="fa-solid fa-scissors"></i>Refresh</button>
      </div>}
      <div className="FolderInfo">
        <div>{props.files && props.files.length} Folders</div>
        {/* <div>Size {props.files[0].size}</div> */}
      </div>
      <div className="file-list">
        {props.files &&
          props.files.map((item) => {
            return (
              <div
                onDoubleClick={() => {
                  OperationOnFileOrDirectory(item.Name, item.IsFile);
                }}
                onClick={() => {
                  setName(item.Name);
                  console.log("on click clicked", item.Name);
                }}
                id={item.Name}
                key={item.Name}
                className="card"
              >
                <FolderImage filename={item.Name} />
                <p id={item.Name} className="Filenames">
                  {shortenLongString(item.Name, 11)}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RightPanel;
