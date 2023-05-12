import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { BASE_URL } from "./api/constant";
import { notification } from 'antd';
import addKeyToArray from "./utils/addKeyToArray";

export const AppContext = createContext();

export default function AppProvider({children}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [keyword, setKeyword] = useState("");

    //  If there is any changes such as update, create, delete
    //  => need to update the todo list.
    const [needUpdate, setNeedUpdate] = useState(0);
    const [isEditting, setIsEditting] = useState(false);
    const [edittingTodo, setEdittingTodo] = useState({});
    const inputTitle = useRef()

    const showModal = () => {
        setIsModalOpen(true);
        
      };

    // Get all todo
    useEffect(() => {
      axios.get(BASE_URL)
      .then(res => setTodos(addKeyToArray(res.data)))
      .catch(err => console.log(err));
    }, [needUpdate]);

    //handle create or update task
    const handleOk = (todo, handleSucess, handleError) => {
      if(todo.id == undefined || todo.id == null) {
        axios.post(BASE_URL, todo)
      .then(res => {
        handleSucess(res)
      })
      .catch(err => {
        console.log(err);
        handleError(err)
      })
      } else {
        axios.put(`${BASE_URL}/${todo.id}`, todo)
      .then(res => {
        handleSucess(res)
      })
      .catch(err => {
        console.log(err);
        handleError(err)
      })
      }    
    };
    

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    //Search todo with keyword
    useEffect(() => {
      if(keyword=="") return;
     
      axios.get(`${BASE_URL}/search/${keyword}`)
      .then(res => {
        if(res.status == 204){
          openNotification('topRight', `not found!`)
        } else {
          setTodos(addKeyToArray(res.data))
        }
      })
      .catch(err => console.log(err));
    }, [keyword]);

    

  const [api, contextHolder] = notification.useNotification();

  // Notify when create, edit, delete successully or fail
  const openNotification = (placement, desc) => {
    api.info({
      message: `MY TODO APP`,
      description: desc,
      placement,
      duration: 1.5
    });
  };

    return (
        <AppContext.Provider value={{
          todos,
          setTodos,
          isModalOpen, 
          setIsModalOpen, 
          showModal, 
          handleOk, 
          handleCancel, 
          openNotification, 
          needUpdate, 
          setNeedUpdate, 
          isEditting, 
          setIsEditting,
          edittingTodo,
          setEdittingTodo,
          keyword,
          setKeyword,
          inputTitle}}>
           {contextHolder}
            {children}
        </AppContext.Provider>
    )
}