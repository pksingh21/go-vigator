import { useState } from "react";
import logo from "./assets/images/logo-universal.png";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App";
import { GetFiles } from "../wailsjs/go/main/App";
interface File {
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
  const [name, setName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);
  const updateFiles = (result: File[]) => setFiles(result);
  function greet() {
    Greet(name).then(updateResultText);
  }
  function getFileInfo() {
    GetFiles(name).then(updateFiles);
    console.log(files);
  }
  return (
    <div id="App">
      <img src={logo} id="logo" alt="logo" />
      <div id="result" className="result">
        {resultText}
      </div>
      <div id="input" className="input-box">
        <input
          id="name"
          className="input"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
        />
        <button className="btn" onClick={getFileInfo}>
          Greet
        </button>
        {files.map((file) => (
          <div>{file.Name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
