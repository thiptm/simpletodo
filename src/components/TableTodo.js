import React, { useContext, useRef } from 'react'
import { Modal, Table } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/constant';
import { AppContext } from '../AppContext';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

export default function TableTodo() {
    const [selectionType, setSelectionType] = useState('checkbox');
    // const [todos, setTodos] = useState([]);
    const {
      todos, 
      needUpdate, 
      setNeedUpdate,
      setIsModalOpen, 
      openNotification, 
      setIsEditting,
      edittingTodo,
      setEdittingTodo} = useContext(AppContext);


    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Deadline',
        dataIndex: 'deadline',
      },
      {
        title: 'Actions',
        dataIndex: '',
        render: (record) => {
          return (
            <>
              <EditOutlined 
                className=' bg-teal-300 p-2 rounded'
                onClick={() => onEditTodo(record)}/>
              <DeleteOutlined 
                onClick={() => onDeleteTodo(record.id)}
                className='ml-5 bg-rose-300 p-2 rounded'/>
            </>
          )
        }
      },
    ];

    const onDeleteTodo = (id) => {
      Modal.confirm({
        title: `Are you sure you want to delete todo id ${id}`,
        okText: "Yes",
        onOk: () => {
          handleDeleteTodo(id);
        }
      })
    }

    const onEditTodo = (todo) => {
      console.log(todo);
      setEdittingTodo({...todo, deadline: dayjs(todo.deadline, "DD-MM-YYYY")})
      console.log(edittingTodo);
      setIsEditting(true);
      setIsModalOpen(true);
    }

    const handleDeleteTodo = (id) => {
      axios.delete(BASE_URL+ "/" + id)
      .then(res =>  {
        openNotification('topRight', res.data)
        setNeedUpdate(needUpdate + 1);
      } )
      .catch(err => openNotification('topRight', err.data)); 
    }

    return (
      <div>
        <Table
          className='todoTable'
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={todos}
          rowKey={todos.id}
          pagination={{defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['2', '5', '10', '20']}}
        />
      </div>
    );
}
