import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';

function RightPanel() {

    return (
        <div className="right-panel">
            <div className="FolderInfo">
                <div>16 Folders</div>
                <div>Size 5Mb</div>
            </div>
            <div className="file-list">
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
                <div className='card'>
                    <img src={FolderImg} className='rightPanelIcon'></img>
                        file.txt
                </div>
            
            </div>
        </div>
    )
}

export default RightPanel
