import { useState } from "react";
import FolderImg from "./assets/images/folder-svgrepo-com.svg";
import "./App.css";
import path from "path";
import { GoBackward, GoForward } from "../wailsjs/go/main/App";
function Header(props: {
  path: string;
  callUpdatePath: (newPath: string) => void;
}) {
  function updatePath(e: React.ChangeEvent<HTMLInputElement>) {
    props.callUpdatePath(e.target.value);
  }
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="header">
      <div className="fbbuttons">
        <button
          onClick={() => {
            GoBackward()
              .then((path: string) => {
                props.callUpdatePath(path);
              })
              .catch((err) => window.alert(err));
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => {
            GoForward()
              .then((path: string) => {
                props.callUpdatePath(path);
              })
              .catch((err) => window.alert(err));
          }}
        >
          &gt;
        </button>
      </div>
      <div className="path">
        <input
          type="text"
          placeholder={props.path}
          value={props.path}
          onChange={updatePath}
        ></input>
      </div>
      <div className="dropdown">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        ></input>
      </div>
    </div>
  );
}

export default Header;
