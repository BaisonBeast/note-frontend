import React, {useEffect} from 'react'
import '../css/Sidebar.css';
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios';
import useGroupStore from '../store/useStore';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
let socket;

const Sidebar = ({openModal}) => {
    const { groupList, setGroupList, addGroup} = useGroupStore();

    useEffect(()=> {
        fetchAllGroupList();
        if(!socket)
            socket = io(API_URL);
        socket.on('cratedGroup', (message) => {
            addGroup(message);
        });
        return () => {
            socket.off('crateGroup');
        };
    }, []);

    const fetchAllGroupList = async () => {
        const data = await axios.get(`${API_URL}/api/group/getAllGroups`);
        setGroupList(data.data);
    }

    function getInitials(name) {
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
    <div className='sidebar'>
        <div className='sidebar_container'>
            <div className='sidebar_heading'>
                <h1>Pocket Notes</h1>
            </div>
            <div className='sidebar_users'>
                {
                    groupList.map((group, id) => {
                        return (
                            <Link to={`/${group.groupId}`} key={id} style={{ textDecoration: 'none' }}>
                                <div className='sidebar_user'>
                                    <div className='sidebar_userProfile' style={{background: `${group.color}`}}><h2>{getInitials(group.groupName)}</h2></div>
                                    <div className='sidebar_userName'>{group.groupName}</div>
                                </div>
                            </Link>
                        )
                    })
                }
                <div className='siderbar_users_add' onClick={openModal}><FaPlusCircle size={60} color='#16008B'/></div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar;