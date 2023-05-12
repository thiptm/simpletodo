import React, { useContext, useRef } from 'react';
import { Modal, Input, DatePicker, Form, Button} from 'antd';
import { AppContext } from '../AppContext';
import convertDate from '../utils/convertDate';
import moment from 'moment/moment';

export default function TodoModal() {
    const {
      isModalOpen, 
      setIsModalOpen,
      handleOk, 
      handleCancel, 
      openNotification, 
      needUpdate, 
      setNeedUpdate, 
      isEditting, 
      setIsEditting,
      edittingTodo, 
      inputTitle } = useContext(AppContext);

    const handleSuccess = () => {
      if(isEditting) {
        openNotification('topRight', 'Edit todo successfully!');
      } else {
        openNotification('topRight', 'Create new todo successfully!');
      }
      setIsModalOpen(false);
      setNeedUpdate(needUpdate + 1);
    }

    const handleError = () => {
      console.log("err");
    }

    const handleFinish = (values) => {
      console.log("click");
      console.log(values);
      let newValue = {...values, deadline: convertDate(values.deadline)}
      if (isEditting) newValue = { ...newValue, id: edittingTodo.id }
      handleOk(newValue, handleSuccess, handleError);
      setIsEditting(false);
    }

    
  
    return (
      <>    
        <Modal 
          title={isEditting? "Edit todo" : "Add new todo"}
          open={isModalOpen} 
          onCancel={handleCancel} 
          cancelText="Cancel" 
          destroyOnClose
          footer = {[
            <Button 
              type="primary" 
              onClick={handleCancel}>
              Cancel
            </Button>,
            <Button 
              form="todoForm" 
              type="primary"
              htmlType="submit">
            {isEditting? "Save" : "Add"}
          </Button>
          ]}
          okType='primary'>

          <Form 
            id="todoForm"
            initialValues={isEditting? edittingTodo : {}}
            onFinish={handleFinish}
            >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the title!"
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Title" ref={inputTitle} />

            </Form.Item>
            <Form.Item
               name="deadline"
               rules={[
                {
                  required: true,
                  message: "Please enter the deadline!"
                }
              ]}
              hasFeedback
            >
              <DatePicker
                format="DD-MM-YYYY"
                className='mt-3'
                placeholder='Deadline'
                disabledDate={(current) => {
                  let customDate = moment().format("DD/MM/YYYY");
                  return current && current < moment(customDate, "DD/MM/YYYY");

                }}
                // disabledDate={(current) => {
                //   return current && current < dayjs().endOf('day');
                // }}
              />     
            </Form.Item>
          </Form>
        </Modal>
      
      </>
    );
}
