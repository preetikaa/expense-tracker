import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

const Register = () => {
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            await axios.post('/users/register', values)
            message.success('Registration successful')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }

    // prevent login user
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('/')
        }
    },[navigate]);
    
  return (
    <>
      <div className="register-page">
        {loading && <Spinner/>}
        <Form layout='vertical' onFinish={handleSubmit}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name='name'>
                <Input />
            </Form.Item>
            <Form.Item label="Email" name='email'>
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name='password'>
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to='/login'>Already registered? Login here</Link>
                <button className='btn btn-primary'>Register</button>
            </div>
        </Form>
      </div>
    </>
  )
};

export default Register;
