import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddOrders: true,
            ShowOrderList: false,
            ShowReport: false,
        }
    }
    render() {
        return (
            <div id="content">
                <div id="content">
                    <div className="row leftSpace topSpace">
                        <h2 className="mb-4" onClick={() => this.addDummyProduct()}>Dashboard</h2>
                    </div>
                    <div className="row leftSpace">
                        <div className="boxContainer col-md-3">
                            <h4 className="mb-3">Total sales</h4>
                            <h4 className="fontBold">0</h4>
                        </div>
                        <div id="outOfStockBtn" className="boxContainer col-md-3" style={{ marginLeft: '15px' }}>
                            <h4 id="" className="mb-3">Total profit</h4>
                            <h4 className="fontBold">0</h4>
                        </div>
                        <div id="outOfStockBtn" className="boxContainer col-md-3" style={{ marginLeft: '15px' }}>
                            <h4 id="" className="mb-3">Due pending</h4>
                            <h4 className="fontBold">0</h4>
                        </div>
                    </div>
                    <div className="row leftSpace pt-3">
                        <h4 className="mb-4" onClick={() => this.addDummyProduct()}>Top 3 products</h4>
                    </div>
                </div>
            </div >
        );
    }
}
export default Dashboard;