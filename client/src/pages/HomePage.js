import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table} from 'antd'
import  axios  from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons'

const HomePage = () => {
  const[showModal, setshowModal] = useState(false)
  const[loading, setLoading] = useState(false)
  const[allTrans, setallTrans] = useState([])
  const[freq, setFreq] = useState('7')
  const[editable, setEditable] = useState(null)
  //table data
  const columns = [
    {
      title: 'Date',
      dataIndex:'date',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title: 'Amount',
      dataIndex:'amount',
    },
    {
      title: 'Type',
      dataIndex:'type',
    },
    {
      title: 'Category',
      dataIndex:'category',
    },
    {
      title: 'Reference',
      dataIndex:'reference',
    },
    {
      title: 'Actions',
      render: (text,record) => (
        <div>
          <EditOutlined onClick={()=>{
            setEditable(record)
            setshowModal(true)
          }}/>
          <DeleteOutlined className="mx-4" onClick={()=>{handleDelete(record)}}/>
        </div>

      ) 
    }
  ]


  useEffect(()=>{
    const getAlltrans = async()=>{
      try {
        const user = JSON.parse(localStorage.getItem('user')) 
        setLoading(true)
        const res = await axios.post('/transactions/get-transaction', {userid: user._id,freq})
        setLoading(false)
  
        //adding unique keys
        const transactionsWithKeys = res.data.map((item, index) => ({
          ...item,
          key: item._id || index, 
        }));
        setallTrans(transactionsWithKeys)
        console.log(transactionsWithKeys);
        
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue")
      }
    }
    getAlltrans()
  },[freq])

  //delete handler
  const handleDelete = async(record) => {
      try {
        setLoading(true)
        await axios.post('/transactions/delete-transaction', {transactionsWithKeys:record._id})
        setLoading(false)
        message.success("Transaction Deleted")
      } catch (error) {
        setLoading(false)
        console.log(error);
        message.error('Unable to delete')
      }
  }

  //form handle
  const handleSubmit = async(values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      
      if(editable){
        await axios.post('/transactions/edit-transaction', { 
          payload: {
              ...values,
              userId:user._id
        },
        transactionsWithKeys: editable._id
      })
        setLoading(false)
        message.success('Updated successful')
      } 
      else {
        await axios.post('/transactions/add-transaction', { ...values, userid:user._id})
        setLoading(false)
        message.success('Transaction added successfully')
      }
      setshowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false)
      message.error("Failed to add")
    }
  }
  
  return (
    <div>
        <Layout>
          {loading && <Spinner/>}
            <div className="filters">
              <div>
                <h6>Select Frequency</h6>
                <Select value={freq} onChange={(values)=>setFreq(values)}>
                  <Select.Option value='7'>Last 1 week</Select.Option>
                  <Select.Option value='31'>Last 1 month</Select.Option>
                  <Select.Option value='365'>Last 1 year</Select.Option>
                </Select>
              </div>
              <div>
                <button className="btn btn-primary" onClick={() => setshowModal(true) }>
                  Add New
                </button>
              </div>
            </div>
            <div className="content">
              <Table columns={columns} dataSource={allTrans}/>
            </div>
            <Modal title={editable ? 'Edit Transaction':'Add Transaction'}
            open={showModal} 
            onCancel={() => setshowModal(false)}
            footer={false}>
              <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
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
