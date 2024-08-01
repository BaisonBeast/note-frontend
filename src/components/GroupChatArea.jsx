import React, {useEffect, useState} from 'react'
import '../css/GroupChatArea.css';
import { IoSend } from "react-icons/io5";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import useGroupStore from '../store/useStore.js';

const API_URL = process.env.REACT_APP_API_URL;
let socket;

const GroupChatArea = () => {
    const [text, setText] = useState('');
    const { groupId } = useParams();
    const { messages, addMessage, setMessages} = useGroupStore();

    useEffect(() => {
        fetchMessages();
        if(!socket)
            socket = io(API_URL);
        socket.emit('joinGroup', groupId);
        socket.on('receiveMessage', (message) => {
            addMessage(message)
        });
    
        return () => {
            socket.off('receiveMessage');
            socket.emit('leaveChat', groupId);
        };
    }, [groupId]);

    const fetchMessages = async () => {
        try {
            const fetchedMessages = await axios.get(`${API_URL}/api/messages/${groupId}`);
            setMessages(fetchedMessages.data);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSend = async(e) => {
        e.preventDefault();
        if (text.trim()) {
        const messageData = {
            groupId,
            message: text,
        };

        try {
            setText('');
            await axios.post(`${API_URL}/api/messages/newMessage`, messageData);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    };

    function getInitials(name) {
        if(!name)return;
        const words = name.trim().split(/\s+/);
        if (words.length === 1) {
            return words[0].charAt(0).toUpperCase();
        }
        if (words.length > 2) {
            return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        }
        return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    }

  return (
    <div className='groupChatArea'>
        <header className='groupChatArea_header'>
            <div className='groupChatArea_userProfile' style={{background: `${messages.color}`}}><h2>{getInitials(messages.name)}</h2></div>
            <div className='groupChatArea_userName'>{messages.name}</div>
        </header>
        <main className='groupChatArea_main'>
            {
                messages?.messages?.map((message, id) => {
                    return (
                        <div className='groupChatArea_chat' key={id}>
                            <p className=''>{message.message}</p>
                            <p className='groupChatArea_chat-Date'>{moment(message.time).format('Do MMMM YYYY ∘ h:mm A')}</p>
                        </div>
                    )
                })
            }
        </main>
        <footer className='groupChatArea_footer'>
            <textarea
                value={text}
                onChange={handleChange}
                placeholder="Here's the sample text for sample work"
                className="groupChatArea-textarea"
            />
            <div 
                onClick={handleSend} 
                disabled={!text.trim()} 
                className={`groupChatArea_send-button ${!text.trim() && 'disabled'}`}
            >
                <IoSend color='black'/>
            </div>
        </footer>
    </div>
  )
}

export default GroupChatArea