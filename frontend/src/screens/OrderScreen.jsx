import {Link,useParams} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import Message  from "../components/Message"
import Loader from "../components/loader"
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice'
import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { usePayOrderMutation,useGetPayPalClientIdQuery } from '../slices/orderApiSlice'

import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const OrderScreen = () => {
    const {id:orderId}=useParams()
    
    const{data:order,refetch,isLoading,error}=useGetOrderDetailsQuery(orderId) //passsing order id from url
    
    
    
    
    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation();
    
    const[{isPending},paypalDispatch]=usePayPalScriptReducer();

    const {data:paypal,isLoading:loadingPayPal,error:errorPayPal}=useGetPayPalClientIdQuery()

    const {userInfo}=useSelector((state)=>state.auth)

useEffect(()=>{
if(!errorPayPal && !loadingPayPal && paypal.clientId )
{
    const loadPayPalScript =async() =>{

        paypalDispatch({
            type:'resetOptions',
            value :{
                'clientId':paypal.clientId,
                currency:'USD',
            }
        });
        paypalDispatch({type:'setLoadingStatus',value:'pending'})
    }
    if(order && !order.isPaid){
        if(!window.paypal){
            loadPayPalScript();
        }
    }
}
},[order,paypal,paypalDispatch,loadingPayPal,errorPayPal])
 
function onApprove(data,actions){ //paypal button
    return actions.order.capture().then(async function(details){

        try{
                await payOrder({orderId,details});
                refetch(); //once paid refetch unpaid to paid
            toast.success('Payment successful')
            }
        catch(err)
        {
            toast.error(err?.data?.message || err.message)
        }
    })
}
async function onApproveTest(){
    await payOrder({orderId,details:{payer:{}}});
    refetch(); //once paid refetch unpaid to paid
toast.success('Payment successful')
}
function onError(err){
    toast.error(err.message)
}
function createOrder(data,actions){
    return actions.order.create({
        purchase_units:[
            {
                amount:{
                    value:order.totalPrice,
                }
            }
        ]
    }).then((orderId)=>{
        return orderId
    })
}

  return isLoading ?<Loader /> :error ?<Message variant='danger'/>
  :(
    <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
            
            <ListGroup variant='flush'>
                <ListGroup.Item>
                   <h2>Shipping</h2>
                   <p>
                    <strong>
                        Name:
                        </strong>
                        {order.user.name}
                        </p> 
                        <p>
                            <strong>Email:</strong>{order.user.email}
                        </p>
                        <p>
                            <strong>
                                Address:
                            </strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city} {' '}
                            ,{order.shippingAddress.postalCode}, 
                            {' '}{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ?(
                            <Message variant='success'>
                                Delivered on {order.deliveredAt}
                            </Message>
                        ):(
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                        <strong> Method:</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.map((item,index) =>(
                        <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={4}>
                                        {item.name}
                                    </Col>
                                    <Col md={4}>
                            {item.qty} x ${item.price}=${item.price*item.qty}

                                    </Col>
                                </Row>
                            </ListGroup.Item>
                    ))}
                </ListGroup.Item>
            </ListGroup>
            </Col> 

            <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
            <h2>    Order Summary</h2>

                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                       <Col>Items
                       </Col> 
                       <Col>
                       ${order.itemsPrice}
                       </Col>
                    </Row>
                    <Row>
                       <Col>Shipping
                       </Col> 
                       <Col>
                       ${order.shippingPrice}
                       </Col>
                    </Row>
                    <Row>
                       <Col>Tax
                       </Col> 
                       <Col>
                       ${order.taxPrice}
                       </Col>
                    </Row>
                    <Row>
                       <Col>Total
                       </Col> 
                       <Col>
                       ${order.totalPrice}
                       </Col>
                    </Row>


                </ListGroup.Item>
                
                {!order.isPaid &&(
                    <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {isPending ? <Loader /> :(
                             <div>
                            {/* //     <Button onClick={onApproveTest} variant='dark' style={{marginBottom:'10px'}}>
                            //         Test Pay Order
                            //     </Button> */}
                                 <div>
                                <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                                ></PayPalButtons>
                            </div>
                            </div>
                        )}
                    </ListGroup.Item>
                )}
                
                
                </ListGroup>

        </Card>
            </Col>
    </Row>
    </>
  )
  
}

export default OrderScreen