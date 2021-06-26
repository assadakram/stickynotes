import {ConfirmationModel} from "../../utils/interfaces";
import React from "react";
import Popup from 'reactjs-popup';

const ConfirmationModal: React.FC<ConfirmationModel> = ({ visible, setVisible, title, message, buttonHandler }) => {
    return (
        <Popup className="confirmation" open={visible} closeOnDocumentClick onClose={() => setVisible(false)}>
        <div className="flex items-center justify-center py-8 px-4 w-full h-full">
            <div className="rounded-md text-center p-6 dark:bg-gray-800 bg-white">
                <h1 className="dark:text-gray-100 text-gray-800 font-bold text-lg">
                    {title}
                </h1>
                <p className="py-4 text-base font-medium  dark:text-gray-100 text-gray-800">
                    {message}
                </p>
                <div className="sm:flex justify-center items-center pt-6">
                    <button className="mr-2 my-2 bg-white hover transition duration-150 ease-in-out hover:border-gray-900 hover:text-gray-900 rounded border border-gray-800 text-gray-800 px-8 py-3 text-sm" onClick={() => buttonHandler(false)} >No</button>
                    <button className="mx-2 my-2 bg-black text-white transition duration-150 ease-in-out hover rounded border border-gray-800 px-8 py-3 text-sm" onClick={() => buttonHandler(true)} >Yes</button>
                </div>
            </div>
        </div>
        </Popup>
    );
};

export default ConfirmationModal;