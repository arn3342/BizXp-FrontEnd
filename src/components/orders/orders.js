import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import NewOrder from './NewOrders';
import OrderList from './OrderList';
import Alert from '../Alert/alert';
var IsShowingOutOfStock = false;

var DummyOrders = []
class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddOrders: true,
            ShowOrderList: false
        }
    }
    render() {
        return (
            <div id="content">
                <div className="row leftSpace topSpace">
                    <h2 className="mb-4">Orders & Payments</h2>
                </div>
                <div className="row leftSpace">
                    {/* <div className="col-md-2">
                    <button className="btn-Blue btn-full-width" onClick={()=> ShowNewOrderFields()}><FontAwesomeIcon icon={faPlus} style={{ fontSize: '14px', marginRight: '8px' }} />Add order</button>
                </div> */}
                    <nav id="nav-menu-container" style={{ display: 'inline-block' }}>
                        <ul id="header-nav" className="nav-menu">
                            <li onClick={(e) => { this.setActiveTabColor(e); this.ShowAddOrders(e) }}><a className="tab-active">New Order</a></li>
                            <li onClick={(e) => { this.setActiveTabColor(e); this.ShowOrderList(e); }}><a>All Orders & Payments</a></li>
                        </ul>
                    </nav>
                </div>
                {/* table starts here */}
                {this.state.showAddOrders && <NewOrder/>}
                {this.state.ShowOrderList && <OrderList/>}
            </div >
        );
    }
    SclaeTableHeader(index) {
        try {
            var columnHeaders = document.getElementById("columnHeaders");
            var columnCells = document.getElementById("tableData");
            for (var i = 0; i < columnHeaders.rows[0].cells.length; i++) {
                var col = columnHeaders.rows[0].cells[i];
                console.log(col.offsetWidth)
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
                console.log("New column width: " + columnCells.rows[2].cells[i].width)
            }
        }
        catch (error) { console.log(error) }
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }
    ShowAddOrders = (e) => {
        // document.getElementById('addOrderFieldsContainer').style = 'display: inherit';
        // document.getElementById('finalizeOrderContainer').style = 'display: ';
        // document.querySelectorAll('[id=allOrderFields]').forEach(element => element.className = 'fields-hidden');
        this.setState({
            showAddOrders: true,
            ShowOrderList: false
        })
    }

    ShowOrderList = () => {
        // document.getElementById('addOrderFieldsContainer').style = 'display: none';
        // document.getElementById('finalizeOrderContainer').style = 'display: none';
        // document.querySelectorAll('[id=allOrderFields]').forEach(element => element.className = 'fields-visible');
        this.setState({
            showAddOrders: false,
            ShowOrderList: true
        })
    }

    setActiveTabColor = (e) => {
        var navCChild = document.getElementById('header-nav').children;
        for (var i = 0; i < navCChild.length; i++) {
            var child = navCChild[i].getElementsByTagName('A')[0];
            child.className = "";
            console.log(child)
        }
        e.target.classList.add('tab-active')
    }
    AddDummyOrder = () => {
        document.getElementById('dummyBuyer').setAttribute('disabled', true);
        var order = {};
        order.product = document.getElementById('dummyProduct').value;
        order.quantity = document.getElementById('dummyQuantity').value;
        order.buyer = document.getElementById('dummyBuyer').value;
        order.buyerPhone = document.getElementById('dummyPhone').value;

        DummyOrders.push(order);

        this.setState({
            dummyOrderArray: DummyOrders
        })
    }
}
export default Orders;