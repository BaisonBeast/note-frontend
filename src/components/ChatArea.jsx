import React from 'react'
import "../css/ChatArea.css";
import { FaLock } from "react-icons/fa6";

const ChatArea = () => {
  return (
    <div className='chatarea'>
        <div className='chatarea_container'>
                <img src='/user.png' alt='users graphic' />
                <div className='chatarea_heading'><h2>Pocket Notes</h2></div>
                <div className='chatarea_para'>
                    <p>Send and receive messages without keeping your phone online.</p>
                    <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
                </div>
            <div className='chatarea_encry'>
                <FaLock />
                <p>end-to-end encrypted</p>
            </div>
        </div>
    </div>
  )
}

export default ChatArea