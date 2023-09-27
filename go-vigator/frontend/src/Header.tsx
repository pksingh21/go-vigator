import { useState } from "react";
import FolderImg from "./assets/images/folder-svgrepo-com.svg";
import "./App.css";
import path from "path";
import { SearchResponse } from "./App";

import {
  GoBackward,
  GoForward,
  ExecuteSearchQueryWrapper,
} from "../wailsjs/go/main/App";

import Search from "antd/es/input/Search";

function Header(props: {
  path: string;
  callUpdatePath: (newPath: string) => void
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>
  setResult: React.Dispatch<React.SetStateAction<SearchResponse[]>>
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
          &#8592;
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
          &#8594;
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
      <div className="search">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            ExecuteSearchQueryWrapper(searchQuery, props.path)
              .then((result) => {
                console.log(result, "search results");
                props.setIsSearched(true);
                props.setResult(result)
                setSearchQuery("");
              })
              .catch((err) => window.alert(err));
          }}
        >
          <input type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        </form>
      </div>
    </div>
  );
}

export default Header;
