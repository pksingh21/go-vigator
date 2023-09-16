import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import Header from './Header';
function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div id="App">
            <div className="container">
                <Header/>
                <div className="content">
                    <LeftPanel/>
                    <RightPanel/>
                </div>
            </div>
        </div>
    )
}

export default App
