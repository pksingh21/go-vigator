import {useState} from 'react';
import  FolderImg  from './assets/images/folder-svgrepo-com.svg';
import './App.css';

function Header() {

    return (
        <div className="header">
            <div className='fbbuttons'>
                <button>&lt;</button>
                <button>&gt;</button>
            </div>
            <div className='path'>
                <input type='text' placeholder='/cur/home'></input>
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
