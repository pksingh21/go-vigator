import { useEffect, useState } from "react";
<<<<<<< HEAD
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { GetFiles } from "../wailsjs/go/main/App";
import { GetCurrentDirectory } from "../wailsjs/go/main/App";
import DisplayFolderFiles from "./DisplayFolderFiles";
import { Spin } from "antd";
export interface FileCustomType {
  isDirectory: boolean;
  isFile: boolean;
  Name: string;
  Owner: string;
  Group: string;
  latestTime: string;
  size: string;
}
function App() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇"
  );
  const [currentPath, setCurrentPath] = useState(""); // Get current directory (initial)
  const [files, setFiles] = useState<FileCustomType[]>([]);
  const updateName = (e: string) => setCurrentPath(e);
  const updateResultText = (result: string) => setResultText(result);
  const updateFiles = (result: FileCustomType[]) => setFiles(result);
  function greet() {
    Greet(currentPath).then(updateResultText);
  }
  function getFileInfo() {
    GetFiles(currentPath).then(updateFiles);
  }
  useEffect(() => {
    // GetCurrentDirectory().then(updateName);
    updateName("/home/pks/");
  }, []);
  useEffect(() => {
    // GetCurrentDirectory().then(updateName);
    getFileInfo();
  }, [currentPath]);
  return (
    <div id="App">
      {files ? (
        <DisplayFolderFiles files={files} currentPath={currentPath} />
      ) : (
        <Spin />
      )}
    </div>
  );
}

=======
import { GetFiles, PushToHistory } from "../wailsjs/go/main/App";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import Header from "./Header";
export interface FileCustomType {
  IsDirectory: boolean;
  IsFile: boolean;
  Name: string;
  Owner: string;
  Group: string;
  LatestTime: string;
  Size: string;
}

function App() {
  const [resultText, setResultText] = useState(
    "Please enter your name below 👇"
  );
  const [currentPath, setCurrentPath] = useState(""); // Get current directory (initial)
  const [files, setFiles] = useState<FileCustomType[]>([]);
  const updateName = (e: string) => setCurrentPath(e);
  const updateResultText = (result: string) => setResultText(result);
  const updateFiles = (result: FileCustomType[]) => {
    console.log(result, "result");
    setFiles(result);
  };

  function getFileInfo() {
    GetFiles(currentPath).then((result) => updateFiles(result));
  }

  function UpdatePath(newPath: string) {
    setCurrentPath(newPath);
    // getFileInfo();
  }

  useEffect(() => {
    // GetCurrentDirectory().then(updateName);
    updateName("/home/pks/");
    PushToHistory("/home/pks/");
  }, []);
  useEffect(() => {
    getFileInfo();
  }, [currentPath]);

  return (
    <div id="App">
      <div className="container">
        <Header path={currentPath} callUpdatePath={UpdatePath} />
        <div className="content">
          <LeftPanel callUpdatePath={UpdatePath} />
          <RightPanel
            files={files}
            currentPath={currentPath}
            callUpdatePath={UpdatePath}
          />
        </div>
      </div>
    </div>
  );
}

>>>>>>> ankitpatel
export default App;
