import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';

function LeftPanel() {

    return (
        <div className="left-panel">
            <ul className='mainFolders'>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Home</a></li>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Downloads</a></li>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Documents</a></li>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Music</a></li>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Video</a></li>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Pictures</a></li>
            <li><a href="#"><img src={FolderImg} className='leftPanelIcon'></img>Trash</a></li>
            </ul>
        </div>
    )
}

export default LeftPanel
