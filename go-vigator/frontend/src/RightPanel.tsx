import "./App.css";
import { FileCustomType } from "./App";
import { OpenFile, PushToHistory, DeleteFolder } from "../wailsjs/go/main/App";
import { useEffect, useRef, useState } from "react";
import FolderImage from "./FolderImage";
import DialogModal from "./DialogModal";

interface DisplayFolderFilesProps {
  files: FileCustomType[];
  currentPath: string;
  callUpdatePath: (newPath: string) => void;
  getFileInfo: () => void
}

function shortenLongString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  const ellipsis = "...";
  const truncatedLength = maxLength - ellipsis.length;

  return input.substring(0, truncatedLength) + ellipsis;
}

function RightPanel(props: DisplayFolderFilesProps) {

  const [name, setName] = useState("");
  const [vis, setVis] = useState(false);
  const [folderContext, setFolderContext] = useState(false);
  const [lPosition, setLPosition] = useState(0);
  const [tPosition, setTPosition] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);
  const dialogModal: any = useRef(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const [lastFolderContext, setlastFolderContext] = useState("");

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





  const closeContextMenu = (e: any) => {
    e.stopPropagation();
    closeFolderContextMenu(e);
    if (e.target.className == "New_File" || e.target.className == "New_Folder") {
      setDialogTitle(e.target.className);
      setOpenedModal(true);
    }
    if (e.target.className == "Refresh") {
      location.reload();
    }
    // console.log("Clicked  : ", e)

    setVis(false);
  };

  const closeModal = (e: any) => {
    e.preventDefault();
    setOpenedModal(false);
  }

  const openContextMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    closeFolderContextMenu(e);
    setLPosition(e.clientX)
    setTPosition(e.clientY)
    setVis(true)
  };

  const openFolderContextMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    closeContextMenu(e);
    setlastFolderContext(e.target.id);
    setLPosition(e.clientX)
    setTPosition(e.clientY)
    setFolderContext(true)
  };

  const closeFolderContextMenu = (e: any) => {
    e.stopPropagation();
    if (e.target.className === "Delete") {
      DeleteFolder(props.currentPath, lastFolderContext)
        .then((val: any) => {
          // console.log("returned on delete ", val);
          if (val) {
            props.getFileInfo()
          }
        })
        .catch((err: any) => console.log("Couldn't delete the folder", err))
    }
    if (e.target.className === "Rename") {
      setDialogTitle("Rename " + lastFolderContext)
      setOpenedModal(true);
    }
    setFolderContext(false);
  };



  return (
    <div className="right-panel" onContextMenu={openContextMenu} onClick={closeContextMenu}>

      <DialogModal closeModal={closeModal} openedModal={openedModal} getFileInfo={props.getFileInfo} setOpenedModal={setOpenedModal} Title={dialogTitle} path={props.currentPath}></DialogModal>
      {vis && <div className="contextmenu" style={{ left: `${lPosition}px`, top: `${tPosition}px` }}>
        <button className="New_File" onClick={closeContextMenu}><i className="fa-solid fa-share"></i>New File</button>
        <button className="New_Folder" onClick={closeContextMenu}><i className="fa-solid fa-share"></i>New Folder</button>
        <button className="Refresh" onClick={closeContextMenu}><i className="fa-solid fa-scissors"></i>Refresh</button>
      </div>}
      {folderContext && <div className="contextmenu" style={{ left: `${lPosition}px`, top: `${tPosition}px` }}>
        <button className="Delete" onClick={closeContextMenu}><i className="fa-solid fa-share"></i>Delete</button>
        <button className="Rename" onClick={closeContextMenu}><i className="fa-solid fa-share"></i>Rename</button>
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
                onContextMenu={openFolderContextMenu}
                onDoubleClick={() => {
                  OperationOnFileOrDirectory(item.Name, item.IsFile);
                }}
                onClick={(e) => {
                  // closeFolderContextMenu(e);
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
