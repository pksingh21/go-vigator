import { useEffect, useState } from "react";
import { GetFiles, PushToHistory } from "../wailsjs/go/main/App";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import Header from "./Header";
import RightSearch from "./RightSearch";

export interface FileCustomType {
  IsDirectory: boolean;
  IsFile: boolean;
  Name: string;
  Owner: string;
  Group: string;
  LatestTime: string;
  Size: string;
}

export interface SearchResponse {
  Distance: number
  OriginalIndex: number
  Source: string
  Target: string
}

function App() {
  const [currentPath, setCurrentPath] = useState(""); // Get current directory (initial)
  const [files, setFiles] = useState<FileCustomType[]>([]);
  const updateName = (e: string) => setCurrentPath(e);
  const [isSearched, setIsSearched] = useState(false);
  const [result, setResult] = useState<SearchResponse[]>([]);

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
    updateName("C:\\");
    PushToHistory("C:\\");
  }, []);
  useEffect(() => {
    getFileInfo();
  }, [currentPath]);



  return (
    <div id="App">
      <div className="container">
        <Header path={currentPath} setIsSearched={setIsSearched} setResult={setResult} callUpdatePath={UpdatePath} />
        <div className="content">
          <LeftPanel callUpdatePath={UpdatePath} />
          {!isSearched && <RightPanel
            getFileInfo={getFileInfo}
            files={files}
            currentPath={currentPath}
            callUpdatePath={UpdatePath}
          />}
          {isSearched && <RightSearch path={currentPath} setIsSearched={setIsSearched} result={result} />}
        </div>
      </div>
    </div>
  );
}

export default App;
