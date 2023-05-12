import './App.css';
import { Tabs, Button, Input, Space } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import TodoList from './pages/TodoList';
import DoingList from './pages/DoingList';
import DoneList from './pages/DoneList';
import TodoModal from './modals/TodoModal';
import AppProvider, { AppContext } from './AppContext';

function App() {
  const { Search } = Input;
  const [tabList, setTabList] = useState([
    {tab: <span><InfoCircleOutlined />Todo</span>, key: '1', content: <TodoList/>},
    {tab: <span><ClockCircleOutlined />Doing</span>, key: '2', content: <DoingList/>},
    {tab: <span><CheckCircleOutlined />Done</span>, key: '3', content: <DoneList/>}
  ]);
  const {setIsEditting} = useContext(AppContext);
  const {showModal, handleSearch, keyword, setKeyword} = useContext(AppContext);


  const onCreateTodo = () => {
    setIsEditting(false);
    showModal();
  }

  const onSearch = (value) => {
    if(value.trim() == "") {
      return;
    } 
    setKeyword(value.trim())    
  }

  return (
    <div className='todoTabs container mx-auto pt-10'>
      <Space className='mb-5' direction='horizontal'>
        <Button 
          icon={<PlusOutlined />}
          className='bg-primary h-10'  
          type="primary" 
          onClick={onCreateTodo}>
          New todo
        </Button>

        <Search
          className='ml-3'
          placeholder="Search todo"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />

      </Space>
    <TodoModal/>
      <Tabs type='card'
        onTabClick={(key) => console.log(key)}
        items={tabList.map((tabPane) => {
          return {
            label: tabPane.tab,
            key: tabPane.key,
            children: <div>{tabPane.content}</div>
          }
        })}
      />
    </div>
  )
}

export default App;


