import React from 'react';
import { connect } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../orders/orders.css';
import closeIcon from '../../Images/close_icon.png'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Inventory/inventory.css'
import '../orders/orders.css'
import moment from 'moment';

import { addProduct } from '../../actions/inventoryActions';
import Axios from 'axios';

var DummyOrders = [
    {
        product: 'Maxima Battery',
        quantity: '500',
        buyingPrice: '3000',
        SellingPrice: '4000',
        StockAddeed: '1-17-2020'
    },
    {
        product: 'Passenger Battery',
        quantity: '100',
        buyingPrice: '4000',
        SellingPrice: '6000',
        StockAddeed: '1-17-2020'
    },
    {
        product: 'Maxima Battery',
        quantity: '200',
        buyingPrice: '2000',
        SellingPrice: '3500',
        StockAddeed: '1-17-2020'
    }

]
var IsShowingOutOfStock = false;
class Invoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            product: {
                productName: "",
                productQuantity: "",
                productBuyingPrice: "",
                productSellingPrice: "",
                dummyStateSet: false,
                totalProducts: DummyOrders.length,
                totalOutOfStock: 0

            },
            dummyOrderArray: DummyOrders,

            productName: '',
            productQuantity: '',
            productBuyingPrice: '',
            productSellingPrice: '',
            dummyStateSet: false,
            totalProducts: DummyOrders.length,
            totalOutOfStock: 0
        }
    }

    render() {
        let totalPrice = 0;
        this.props.dummyOrderArray.map((order, index) => {
            totalPrice = totalPrice + parseInt(order.price);
        })
        return (
            <div id="content">
                <div className='container-fluid'>
                    <br />
                    <div className='row'>
                        <div className='col-sm-6'>
                            <h2>Purchased By</h2>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'>Buyer Name</label>
                            </div>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'>Buyer Phone</label>
                            </div>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'>Buyer Phone</label>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <h2>Purchased From</h2>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'><b>Organaization Name</b></label>
                            </div>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'>mail@mail.com</label>
                            </div>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'>0171625267</label>
                            </div>
                            <div className='form-group row'>
                                <label className='control-label col-sm-12'>Address Goes Here</label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <h2>Order Summary</h2>
                        </div>

                        <br />
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <thead>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Product<img className="sortIcon" /></th>
                                    <th>Quantity<img className="sortIcon" /></th>
                                    <th>Price<img className="sortIcon" /></th>
                                </tr>
                            </thead>
                            <tbody id="dummyTableToAdd">
                                {this.state.dummyOrderArray && (this.props.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                    </tr>)
                                ))}
                                <tr style={{ borderTop: 'solid 1px #000' }}>
                                    <td>Total Price</td>
                                    <td></td>
                                    <td>{totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }


}



export default Invoice;