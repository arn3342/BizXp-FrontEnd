import React from 'react';
import OrderReport from '../PDF/OrderReport';
import { pdf } from '@react-pdf/renderer';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../orders/orders.css'
import '../../App.css'
import Calendar from 'react-calendar'
import moment from 'moment'
import image from '../../Images/PdfDemo.gif'
import './orderList.css'
import Axios from 'axios';
import { API_FOR_PROD, API_FOR_DEV } from '../../conString';

class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentArray: [],
            showAddOrders: true,
            ShowOrderList: false,
            startDate: new Date(),
            showStartCalendar: false,
            endDate: new Date(),
            showEndCalendar: false
        }
    }
    render() {

        // let productName = this.state.paymentArray.map((item,index)=>{
        //     let product = item.product.map((itemOfItem,i)=>{
        //         return ( <li>{itemOfItem}</li>)
        //     })
        // })

        // const productName = this.state.paymentArray.map((item)=>{           
        //     item.product.map((itemOfItem)=>{
        //     <li>{itemOfItem}</li>
        //     })
        // })
        // const productQuantity = this.state.paymentArray.map((item)=>{
        //     item.productQuantity.map((itemOfItem)=>{
        //     return(<li>{itemOfItem}</li>)
        //     })
        // })

        return (
            <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                <div className="row">
                    <div className="col-md-4">
                        <button id="showStartCalendar" className="btn-Blue" onClick={(e) => this.DisplayCalendar(e)} style={{ fontSize: '16px', padding: '0px 20px' }}>Start date: {moment(this.state.startDate).format("MM-DD-YYYY")}</button>
                        <div className="topSpace" style={{ display: this.state.showStartCalendar ? 'block' : 'none' }}>
                            <Calendar id="showStartCalendar" value={this.state.startDate}
                                //  onChange={(e) => {this.onChange()}}
                                onChange={(e) => { this.onChange(e, 'showStartCalendar'); this.DisplayCalendar('', 'showStartCalendar') }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <button id="showEndCalendar" className="btn-Blue" onClick={(e) => this.DisplayCalendar(e)} style={{ fontSize: '16px', padding: '0px 20px' }}>End date: {moment(this.state.endDate).format("MM-DD-YYYY")}</button>
                        <div className="topSpace" style={{ display: this.state.showEndCalendar ? 'block' : 'none' }}>
                            <Calendar id="showEndCalendar" value={this.state.startDate}
                                onChange={(e) => { this.onChange(e, 'showEndCalendar'); this.DisplayCalendar('', 'showEndCalendar') }}
                            />
                        </div>
                    </div>
                </div>
                <div className="headerContainer" style={{ marginTop: '20px' }}>
                    <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                        <tbody>
                            <tr className="column-container" style={{ paddingTop: '8px' }}>
                                <th id="allOrderFields">Order Date<img className="sortIcon" alt="sortIcon" /></th>
                                <th>Buyer Name<img className="sortIcon" /></th>
                                <th>Buyer Number</th>
                                <th>Product<img className="sortIcon" alt="sortIcon" /></th>
                                <th>Quantity<img className="sortIcon" alt="sortIcon" /></th>
                                <th id="allOrderFields">Paid<img className="sortIcon" alt="sortIcon" /></th>
                                <th id="allOrderFields">Due<img className="sortIcon" alt="sortIcon" /></th>
                                <th>Payment Status</th>
                            </tr>
                        </tbody>
                        <tbody id="dummyTableToAdd">
                            <tr />
                            <tr />
                            {this.state.paymentArray && (this.state.paymentArray.map((payment, index) =>
                                (<tr className="table-warning">
                                    <td>{moment(payment.created_date).format('MM-DD-YYYY')}</td>
                                    <td>Aousaf Rashid</td>
                                    <td>{payment.payee_ContactNo}</td>
                                    <td className="text-truncate" style={{ maxWidth: '150px' }}>{this.state.paymentArray[index].products && this.state.paymentArray[index].products.map((product) =>
                                        <li><span>{product.name}</span></li>
                                    )}</td>
                                    <td className="text-truncate" style={{ maxWidth: '150px' }}>{this.state.paymentArray[index].orders && this.state.paymentArray[index].orders.map((order) =>
                                        <li><span>{order.quantity}</span></li>
                                    )}</td>
                                    <td>{payment.actual_Payment}</td>
                                    <td>{payment.due_Amount}</td>
                                    <td> {this.state.paymentArray[index].is_settled == false ?
                                        <div>
                                            <span>Not settled</span>
                                            <button className="btn-Blue-active-small btn-sm" onClick={() => this.onAddPaymentClick()}
                                                style={{ fontSize: '15px', padding: '4px 10px' }} >Add Payment</button>
                                        </div> : <span>Settled</span>} </td>
                                </tr>)
                            ))}
                            {/* <tr className="table-warning">
                                <td>18-1-2020</td>
                                <td>Kamrul Hasan</td>
                                <td>01611416466</td>
                                <td>
                                    <ul>
                                        <li>Optima Battery</li>
                                        <li>Maxima Battery</li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>5</li>
                                        <li>2</li>
                                    </ul>
                                </td>
                                <td>20,000</td>
                                <td>5,000</td>
                                <td><button className="btn-Blue-active btn-sm" onClick={() => this.onAddPaymentClick()}
                                    style={{ fontSize: '15px' }} >Add Payment</button></td>
                                <td><a href="https://images.examples.com/wp-content/uploads/2017/05/Order-Receipt-Sample.jpg" type="button" target="_blank" className="btn btn-primary">Report</a></td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    async GetPaymentsOfShopInDateRange() {
        try {
            var payments = []
            var products = []
            const paymentResponse = await Axios.get( API_FOR_PROD + '/payment/GetPaymentsByDate?startdate=' + moment('1/25/2020').format('MM-DD-YYYY') + '&enddate=' + moment('1/29/2021').format('MM-DD-YYYY') + '&shopId=1');
            console.log('Retrieved payments in date range', paymentResponse.data[0])
            for (var i = 0; i < paymentResponse.data.length; i++) {
                var payment = paymentResponse.data[i];
                const orderResponse = await Axios.get( API_FOR_PROD + '/order/GetOrdersByPaymentId?paymentId=' + payment.payment_Id)
                var orders = orderResponse.data;
                console.log('Orders come here', orders)
                for(var i = 0; i < orders.length; i++){
                    var product_Id = orders[i].product_Id;
                    var quantity = orders[i].quantity;
                    console.log('product_Id', product_Id)
                    const productResponse = await Axios.get( API_FOR_PROD + '/product/GetProductById?id=' + product_Id);
                    console.log('getting product', productResponse.data)
                    var product = productResponse.data;
                    products.push(product);
                    //console.log('products', productResponse.data)
                    // for(var i = 0; i < products.length; i++){
                    //     var product = {
                    //         name: products[i].name,
                    //         quantity: quantity
                    //     }
                    //     console.log(product)
                    // }
                    // payment.products = products;
                }
                payment.orders = orders;
                payment.products = products
                payments.push(payment)
                this.setState({
                    paymentArray: payments
                })
                console.log('Payment comes at the end', payment)
                
            }
        } catch (error) {
            console.error(error);
        }
    }
    async GetOrdersFromPayments(paymnet_id) {
        try {
            const response = await Axios.get('' + paymnet_id);
            return response.data
        }
        catch (error) {
            console.log('Failed to get order from payment id', error)
        }
    }
    componentDidMount() {
        this.GetPaymentsOfShopInDateRange();
    }
    DisplayCalendar(e, keyName) {
        this.setState({
            showStartCalendar: false,
            showEndCalendar: false
        })
        if (e && e !== '') {
            if (this.state[e.target.id]) {
                this.setState({
                    [e.target.id]: false
                })
            }
            else {
                this.setState({
                    [e.target.id]: true
                })
            }
        }
        if (keyName && keyName !== '') {
            if (this.state[keyName]) {
                this.setState({
                    [keyName]: false
                })
            }
            else {
                this.setState({
                    [keyName]: true
                })
            }
        }
    }

    onChange(e, keyName) {
        console.log(e)
        if (keyName == 'showStartCalendar') {
            this.setState({
                startDate: e
            })
            var startdate = new Date(e);
            var enddate = new Date(this.state.endDate);
            if (startdate > enddate) {
                this.setState({
                    endDate: startdate
                })
            }
        }
        else {
            this.setState({
                endDate: e
            })
        }
    }
}
export default OrderList;