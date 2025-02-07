import { useState } from 'react';
import exit from '../assets/cross.png'
import setting from '../assets/setting.png'

export default function Modal() {
    const [modal, setModal] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const root = document.getElementById('root');

    if(root)
    root.className = darkMode ? "root-dark": "";

    function toggleModal() {
        setModal(prev => !prev);
    }

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setDarkMode(event.target.checked);
    };

    return (
        
        <> 
        <img id="chart" src={setting} onClick={toggleModal}/>
        {modal && 
        <>

            <div className="modal-settings">
                <div className="overlay-settings">
                    <div className="modal-content-settings">
                        <div className="appearance">
                            <h3>Appearance</h3>
                            <hr />
                                <div className="darkMode">
                                    <h4>Dark Mode</h4>
                                    <label className="switch">
                                        <input type="checkbox" checked={darkMode} onChange={handleCheckboxChange}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                                {/* <div className="backgroundChange">
                                    <h4>Background Image</h4>
                                    <input type="file" accept="image/*"/>
                                </div> */}
                        </div>
                        <img src={exit} id="exitButton" onClick={toggleModal}/>
                    </div>
                </div>
            </div></>}
        </>
        
    )
}