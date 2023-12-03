/**
 * FileSelectionScreen.js
 * This component renders a popup screen for file selection and deletion. It allows users to select
 * a file to open or delete from the provided file list.
 * 
 * Props:
 * - isFileSelectOpen: Boolean indicating if the popup is open.
 * - setisFileSelectOpen: Function to set the state for opening/closing the popup.
 * - handleFileSelection: Function to handle the event when a file is selected.
 * - handleFileHiding: Function to handle the event when a file is requested to be deleted.
 * - fileList: Array of file objects to be displayed.
 * 
 * Uses LanguageContext for internationalization, enabling the display of text in different languages.
 */

import '../css/button.css'
import '../css/input.css'
import '../css/popup.css'
import '../css/form.css'
import Popup from "reactjs-popup";
import { LanguageContext } from "../contexts/languagecontext";
import { useContext } from "react";

const FileSelectionScreen = ({ isFileSelectOpen, setisFileSelectOpen, handleFileSelection, handleFileHiding, fileList }) => {
    const { translations } = useContext(LanguageContext);

    return (
        <Popup
            open={isFileSelectOpen}
            closeOnDocumentClick={false}
            overlayStyle={{ background: 'rgba(0,0,0,0.8)' }}
        >
            <div className='editornavbar-popup' id="content-file-select" role="dialog" aria-label="choose file window">
                <button className='close-button' onClick={() => setisFileSelectOpen(false)}>X</button>
                <div className="popup-container">
                    <h2 tabIndex="0" >{translations?.editorNavbar.chooseFile}</h2>
                    <div className='editornavbar-fileSelection'>
                        { fileList.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="center-th" tabIndex="0">{translations?.editorNavbar.fileName}</th>
                                        <th className="center-th" tabIndex="0">{translations?.editorNavbar.createdAt}</th>
                                        <th className="center-th" tabIndex="0">{translations?.editorNavbar.lastEdited}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fileList.map((file, index) => (
                                        <tr key={file.filename} className={`file-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                            <td tabIndex="0" className="file-open-td" onClick={() => handleFileSelection(file)}>
                                                {translations?.editorNavbar.open}
                                            </td>
                                            <td tabIndex="0" className="left-td">{file.filename}</td>
                                            <td tabIndex="0" className="center-td">{file.created}</td>
                                            <td tabIndex="0" className="right-td">{file.last_updated}</td>
                                            <td tabIndex="0" className="file-hide-td" onClick={() => handleFileHiding(file)}>
                                                {translations?.editorNavbar.delete}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default FileSelectionScreen;
