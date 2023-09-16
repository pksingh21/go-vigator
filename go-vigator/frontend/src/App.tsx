import { useEffect, useState } from "react";
import logo from "./assets/images/logo-universal.png";
// import "./App.css";
import { GetFiles } from "../wailsjs/go/main/App";
import { GetCurrentDirectory } from "../wailsjs/go/main/App";
import DisplayFolderFiles from "./DisplayFolderFiles";
import { Spin } from "antd";

import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import Header from './Header';
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
    const updateFiles = (result: FileCustomType[]) =>{
        console.log(result);
        setFiles(result);
    }
    
    function getFileInfo() {
        GetFiles(currentPath).then(updateFiles);
        console.log("FIles",files);
    }

    function UpdatePath(newPath:string){
      console.log("Path : ",newPath);
      setCurrentPath(newPath);
      getFileInfo();
    }

    useEffect(() => {
      // GetCurrentDirectory().then(updateName);
      updateName("/home/ankit/");
    }, []);
    useEffect(() => {
      getFileInfo();
    }, [currentPath]);

    console.log("Out files",files,currentPath)


    return (
        <div id="App">
            <div className="container">
                <Header path={currentPath} callUpdatePath={UpdatePath}/>
                <div className="content">
                    <LeftPanel callUpdatePath={UpdatePath}/>
                    <RightPanel files={files} currentPath={currentPath} callUpdatePath={UpdatePath} />
                </div>
            </div>
        </div>
    )

    // return (
    //     <div id="App">
    //       {files ? (
    //         <DisplayFolderFiles files={files} currentPath={currentPath} />
    //       ) : (
    //         <Spin />
    //       )}
    //     </div>
    //   );
}

export default App;
