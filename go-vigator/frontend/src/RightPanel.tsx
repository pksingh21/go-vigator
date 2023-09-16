import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';''
import JpgImg from './assets/images/jpg-svgrepo-com.svg';
import TxtImg from "./assets/images/txt-svgrepo-com.svg";
import PdfImg from "./assets/images/pdf-svgrepo-com.svg"
import './App.css';
import { FileCustomType } from "./App";
import { wrap } from 'module';

interface DisplayFolderFilesProps {
    files: FileCustomType[];
    currentPath:string,
    callUpdatePath: (newPath:string) => void
}

function FolderImage(props: {filename:string}){

        if(props.filename.includes(".png") || props.filename.includes(".jpg")){
            return (<img src={JpgImg} id={props.filename} className='rightPanelIcon'></img>);
        }
        if(props.filename.includes(".txt") || props.filename[0]=="."){
            return (<img src={TxtImg} id={props.filename} className='rightPanelIcon'></img>);

        }
        if(props.filename.includes(".pdf")){
            return (<img src={PdfImg} id={props.filename} className='rightPanelIcon'></img>);

        }
        return (<img src={FolderImg} id={props.filename} className='rightPanelIcon'></img>);
    
}

function RightPanel(props: DisplayFolderFilesProps) {

    // props.files.map((item)=>{
    //     console.log(item.size)
    // })
    
    function GotoFolder(e: any){
        props.callUpdatePath(props.currentPath+'/'+e.target.id);
    }

    return (
        <div className="right-panel">
            <div className="FolderInfo">
                <div>{props.files && props.files.length} Folders</div>
                {/* <div>Size {props.files[0].size}</div> */}
            </div>
            <div className="file-list">
                {props.files && props.files.map(item => {
                    return (
                    <div onDoubleClick={GotoFolder} id={item.Name} key={item.Name} className='card'>
                        <FolderImage filename={item.Name}/>
                        <p id={item.Name} className='Filenames'>{item.Name}</p>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}

export default RightPanel
