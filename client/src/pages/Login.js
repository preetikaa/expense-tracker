import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
const Login = () => {
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const {data} = await axios.post('/users/login', values)
            setLoading(false)
            message.success("Login successful")
            localStorage.setItem('user', JSON.stringify({...data.user, password:""}))
            navigate('/')
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
            <h1>Login Form</h1>
            <Form.Item label="Email" name='email'>
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Password" name='password'>
                <Input type='password'/>
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <Link to='/register'>Not a user? Register here</Link>
                <button className='btn btn-primary'>Login</button>
            </div>
        </Form>
      </div>
    </>
  )
};

export default Login;
