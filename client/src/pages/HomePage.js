import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Form, Input, message, Modal, Select, Table } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTrans, setAllTrans] = useState([]);
  const [freq, setFreq] = useState("all");
  const [editable, setEditable] = useState(null);

  // Table columns
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined className="mx-4" onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];

  
  useEffect(() => {
    const getAlltrans = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            
            const res = await axios.get(`/transactions/get-transaction`, {
                params: { userid: user._id, freq },
            });

            setLoading(false);

            // Ensure each transaction has a unique key for React
            const transactionsWithKeys = res.data.map((item, index) => ({
                ...item,
                key: item._id || index,
            }));
            setAllTrans(transactionsWithKeys);
            } catch (error) {
              console.log(error);
              message.error("Fetch Issue");
            }
        };
      getAlltrans();
  }, [freq]);
 
  const handleDelete = async (record) => {
    try {
        setLoading(true);
        await axios.delete(`/transactions/delete-transaction/${record._id}`); 
        setLoading(false);
        message.success("Transaction Deleted");
    } catch (error) {
        setLoading(false);
        console.log(error);
        message.error("Unable to delete");
    }
  };
  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (editable) {
        await axios.put(`/transactions/edit-transaction/${editable._id}`, values); 
        message.success("Updated successfully");
      } else {
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction added successfully");
      }
      
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      message.error("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={freq} onChange={(value) => setFreq(value)}>
            <Select.Option value="all">All transactions</Select.Option>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="31">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
          </Select>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        <Table columns={columns} dataSource={allTrans} />
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Amount is required" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Type is required" }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Category is required" }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is required" }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
