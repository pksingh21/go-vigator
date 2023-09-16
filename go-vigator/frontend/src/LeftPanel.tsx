import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';

function LeftPanel(props: { callUpdatePath: (e: any) => void }) {
    
    function UpdatePath(e: any) {
        console.log("New Path : ",e.target.innerText);

        if(e.target.innerText==="Home"){
            console.log("went")
            props.callUpdatePath("/home/ankit");
            return
        }
        props.callUpdatePath('/home/ankit/'+e.target.innerText);
    }

    return (
        <div className="left-panel">
            <ul className='mainFolders'>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Home</li>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Downloads</li>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Documents</li>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Music</li>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Video</li>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Pictures</li>
                <li onClick={UpdatePath}><img src={FolderImg} className='leftPanelIcon'></img>Trash</li>
            </ul>
        </div>
    )
}


export default LeftPanel
