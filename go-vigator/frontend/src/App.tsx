import { useEffect, useState } from "react";
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

export default App;
