import './App.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import GroupChatArea from './components/GroupChatArea';
import PageNotFound from './pages/PageNotFound';
import Modal from './components/Modal';
import { Route, Routes } from 'react-router-dom';

const AppLayout = ({ children, openModal }) => (
  <div className="app">
    <Sidebar openModal={openModal} />
    {children}
  </div>
);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && <Modal closeModal={closeModal} />}
      <Routes>
        <Route 
          path="/" 
          element={<AppLayout openModal={openModal}>
                      <ChatArea />
                   </AppLayout>} 
        />
        <Route 
          path="/:groupId" 
          element={<AppLayout openModal={openModal}>
                      <GroupChatArea />
                   </AppLayout>} 
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
