import { useState } from "react";
import axios from "axios";
import '../css/Modal.css';

const API_URL = process.env.REACT_APP_API_URL;

const Modal = ({ closeModal }) => {
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState('#B19CD9');

    const handleClick = (event) => {
      if (event.target.classList.contains('color-circle')) {
        const newColor = event.target.style.backgroundColor;
        setColor(newColor);
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (groupName.trim()) {
          try {
              await axios.post(`${API_URL}/api/group/createGroup`, {
                groupName,
                color
          });
          setGroupName("");
          closeModal();
      } catch (error) {
          console.error("Error creating new group:", error);
      }
      }
    };


  return (
    <div className="modal-backdrop" onClick={closeModal}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Create New group</h2>
        <div className='modal_div'>
            <p>Group Name</p>
            <input type="text" placeholder="Enter group name" value={groupName} onChange={(e)=> setGroupName(e.target.value)}/>
        </div>
        <div className='modal_div'>
            <p>Choose colour</p>
            <div className="color-options" onClick={handleClick}>
                <span className="color-circle" style={{ backgroundColor: '#B19CD9' }}></span>
                <span className="color-circle" style={{ backgroundColor: '#AC98AC' }}></span>
                <span className="color-circle" style={{ backgroundColor: '#8AACB8' }}></span>
                <span className="color-circle" style={{ backgroundColor: '#F5A623' }}></span>
                <span className="color-circle" style={{ backgroundColor: '#6495ED' }}></span>
                <span className="color-circle" style={{ backgroundColor: '#4169E1' }}></span>
            </div>
        </div>
        <button onClick={handleSubmit} className="create-button">Create</button>
    </div>
    </div>
  );
};

export default Modal;
