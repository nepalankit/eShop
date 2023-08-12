import React from 'react'
import {useState,useEffect} from 'react'
import {Table,Form,Button, Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/loader'
import { toast } from 'react-toastify'
import { useProfileMutation } from '../slices/usersApiSlice'
import {LinkContainer} from 'react-router-bootstrap'
import {setCredentials} from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'

import{FaTimes} from 'react-icons/fa'
const ProfileScreen = () => {
    const [name,setName]=useState(' ')
    const [email,setEmail]=useState(' ')
    const [password,setPassword]=useState(' ')
    const [confirmPassword,setConfirmPassword]=useState(' ')
    
    
    
    const {userInfo}=useSelector((state)=>state.auth)
    
  
  
    const [updateProfile,{isLoading:loadingUpdateProfile}]=useProfileMutation()
  
  const{data:orders,isLoading,error}=useGetMyOrdersQuery()
    
  
  
  const dispatch=useDispatch();
        useEffect(()=>{
                if(userInfo)
                {
                    setName(userInfo.name)
                    setEmail(userInfo.email)
                }

        },[userInfo,userInfo.name,userInfo.email])

        const submitHandler=(async(e)=>{
            e.preventDefault()
           if(password !=confirmPassword)
           {
            toast.error("Passwords do not match")
           }
           else{
                    try{
                            const res= await updateProfile({_id:userInfo._id,name,email,password}).unwrap()
                            dispatch(setCredentials(res))
                            toast.success('Profile Updated Successfully')
                    }
                    catch(err)
                    {
                        toast.error(err?.data?.message || err.message)
                    }
                    
           }
        })

  return (
   <Row>
    <Col md={3}>
   <h2>User Profile</h2>
   <Form onSubmit={submitHandler}>
    <Form.Group controlId='name'  className='my-2'>
        <Form.Label>Name</Form.Label>
    <Form.Control

    type='name'
    placeholder='Enter your Name'
    value={name}
    onChange={(e)=>setName(e.target.value)} >
        
    </Form.Control>
    
    </Form.Group>
    <Form.Group controlId='email'  className='my-2'>
        <Form.Label>email</Form.Label>
    <Form.Control

    type='email'
    placeholder='Enter your email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)} >

    </Form.Control>
    
    </Form.Group>
    <Form.Group controlId='password'  className='my-2'>
        <Form.Label>password</Form.Label>
    <Form.Control

    type='password'
    placeholder='Enter your password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)} >

    </Form.Control>
    
    </Form.Group>
    <Form.Group controlId='confirmPassword'  className='my-2'>
        <Form.Label>confirmPassword</Form.Label>
    <Form.Control

    type='password'
    placeholder='confirmPassword'
    value={confirmPassword}
    onChange={(e)=>setConfirmPassword(e.target.value)} >

    </Form.Control>
    
    </Form.Group>
    <Button variant='dark' type='submit' className='my-2'>
        update
    </Button>
    {loadingUpdateProfile && <Loader /> }

   </Form>
    </Col>
    <Col md={9}>
<h2>My Orders</h2>
{isLoading ? (
<Loader />
):error ? (<Message variant='danger'>
{error?.data?.message || error.error}
</Message>) :(
    <Table striped hover responsive className='table-sm'>
        <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>Total</th>
                <th>PAID</th>
                <th>DELIVERED</th>
            
                <th></th>

            </tr>
        </thead>
        <tbody>
            {orders.map((order)=>(
                <tr key={order._id}>
                    <td>{order._id}</td>
                    
                    <td>{order.createdAt.substring(0,10)}</td>
                <td>${order.totalPrice}</td>
                <td>

                    {order.isPaid  ?(
                        order.paidAt.substring(0,10)
                    ):(
                        <FaTimes style={{color:'red'}} />
                    )}
                    </td>
                <td>

                    {order.isDelivered  ?(
                        order.deliveredAt.substring(0,10)
                    ):(
                        <FaTimes style={{color:'red'}} />
                    )}
                    </td>
                    <td>
                        <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                                Details
                            </Button>
                        </LinkContainer>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
)
}
    </Col>
   </Row>
  )
}

export default ProfileScreen
