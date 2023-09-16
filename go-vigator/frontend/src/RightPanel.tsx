import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';
import { FileCustomType } from "./App";
import { wrap } from 'module';

interface DisplayFolderFilesProps {
    files: FileCustomType[];
    currentPath:string,
    callUpdatePath: (newPath:string) => void
}

function RightPanel(props: DisplayFolderFilesProps) {

    // props.files.map((item)=>{
    //     console.log(item.size)
    // })
    
    function GotoFolder(e: any){
        console.log("New Path : ",e.target.id);
        props.callUpdatePath(props.currentPath+'/'+e.target.id);
    }

    return (
        <div className="right-panel">
            <div className="FolderInfo">
                <div>{props.files && props.files.length} Folders</div>
                <div>Size 5Mb</div>
            </div>
            <div className="file-list">
                {props.files && props.files.map(item => {
                    return (
                    <div onDoubleClick={GotoFolder} id={item.Name} key={item.Name} className='card'>
                        <img src={FolderImg} id={item.Name} className='rightPanelIcon'></img>
                        <p id={item.Name} className='Filenames'>{item.Name}</p>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}

export default RightPanel
