import Layout from "../components/Layout/Layout";
import { useState } from "react";
import { Form, Input, Modal, Select} from 'antd'

const HomePage = () => {
  const[showModal, setshowModal] = useState(false)
  //form handle
  const handleSubmit = (values) => {
    console.log(values);
  }
  
  return (
    <div>
        <Layout>
            <div className="filters">
              <div>range filters</div>
              <div>
                <button className="btn btn-primary" onClick={() => setshowModal(true) }>
                  Add New
                </button>
              </div>
            </div>
            <div className="content"></div>
            <Modal title='Add Transaction' 
            open={showModal} 
            onCancel={() => setshowModal(false)}
            footer={false}>
              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label='Amount' name='amount'>
                  <Input type="text"/>
                </Form.Item>
                <Form.Item label='Type' name='type'>
                  <Select>
                    <Select.Option value='income'>Income</Select.Option>
                    <Select.Option value='expense'>Expense</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Category' name='category'>
                  <Select>
                    <Select.Option value='salary'>Salary</Select.Option>
                    <Select.Option value='tip'>Tip</Select.Option>
                    <Select.Option value='project'>Project</Select.Option>
                    <Select.Option value='food'>Food</Select.Option>
                    <Select.Option value='movie'>Movie</Select.Option>
                    <Select.Option value='bills'>Bills</Select.Option>
                    <Select.Option value='medical'>Medical</Select.Option>
                    <Select.Option value='fees'>Fees</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Date' name='date'>
                  <Input type="date"/>
                </Form.Item>
                <Form.Item label='Reference' name='reference'>
                  <Input type="text"/>
                </Form.Item>
                <Form.Item label='Description' name='description'>
                  <Input type="text"/>
                </Form.Item>
                <div className="d-flex justify-content-end">
                  <button type='submit' className="btn btn-primary">Save</button>
                </div>
              </Form>
            </Modal>
        </Layout>
    </div>
  )
};

export default HomePage;
