import { create } from 'zustand'

const useGroupStore = create((set) => ({
    messages: {},
    groupList: [],
    addMessage: (newMessage) => set((state) => ({
        messages: {
            ...state.messages,
            messages: [...state.messages.messages, newMessage]
        }
    })),
    addGroup: (group) => set((state) => ({ groupList: [...state.groupList, group] })),
    setMessages: (messages) => set(() => ({ messages })),
    setGroupList: (groupList) => set(() => ({ groupList })),
}));

export default useGroupStore;  