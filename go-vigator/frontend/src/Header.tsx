import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';
import path from 'path';

function Header(props: {path: string, callUpdatePath: (newPath:string) => void}) {

    function updatePath(e: React.ChangeEvent<HTMLInputElement>){
        props.callUpdatePath(e.target.value);
    }
    
    return (
        <div className="header">
            <div className='fbbuttons'>
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
            <div className='path'>
                <input type='text' placeholder={props.path} value={props.path} onChange={updatePath}></input>
            </div>
            <div className='dropdown'>
                <select>
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                </select>
            </div>
        </div>
    )
}

export default Header
