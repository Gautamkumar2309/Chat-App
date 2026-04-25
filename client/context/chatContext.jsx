import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import toast from "react-hot-toast";


export const chatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [message, setMessages] = useState([]);
    const [usres, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    const { socket, axios} = useContext(AuthContext);

    //function to get all users for sidebar
    const getUsers = async () =>{
        try{
            await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        }catch (error){
            toast.error(error.message)
        }
    }
    //function to get message for selected user
    const getMessages = async (userld)=>{
        try{
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    //function to send message to selected user
    const sendMessage = async (messageData) =>{
        try{
            const{ data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success){
                setMessages((prevMessages)=> [...prevMessages, data.newMessages])
            }else{
                toast.error(data.message);
            }
        }catch {error}{
            toast.error(error.message);
        }
    }

    //function to subscripe to message for selected user
    const subscribeToMessage = async () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage)=>{
            if(selectedUser && newMessage.senderID === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=>[...prevMessages, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages, [newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
                    [newMessage.senderId] + 1 : 1
                }))
            }
        })
    }
    //function to unsubscribe from messages
    const unsubscribeFromMessages = () =>{
        if(socket) socket.off("newMessage");
    }
    useEffect(()=>{
        subscribeToMessage();
        return ()=> unsubscribeFromMessages();
    },[socket, selectedUser])

    const value = {
        messages, users, selectedUser, getUsers, setMessages,sendMessage,
        setSelectedUser,unseenMessages, setUnseenMessages
    }

    return(
    <chatContext.Provider value={vlaue}>
        { children }
    </chatContext.Provider>

    )
}