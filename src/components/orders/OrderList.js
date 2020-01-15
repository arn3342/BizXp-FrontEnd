import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import NewOrder from './NewOrders';
var IsShowingOutOfStock = false;

var DummyOrders = []
class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddOrders: true,
            ShowOrderList: false
        }
    }
    render() {
        return (
            <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
            <div className="headerContainer" style={{ marginTop: '20px' }}>
                <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                    <tbody>
                        <tr className="column-container" style={{ paddingTop: '8px' }}>
                            <th id="allOrderFields">Order Date<img className="sortIcon" /></th>
                            <th>Buyer Name<img className="sortIcon" /></th>
                            <th>Buyer Number</th>
                            <th>Product<img className="sortIcon" /></th>
                            <th>Quantity<img className="sortIcon" /></th>
                            <th id="allOrderFields">Paid<img className="sortIcon" /></th>
                            <th id="allOrderFields">Due<img className="sortIcon" /></th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                <table id="tableData" className="table table-hover table-borderless">
                    <tbody id="dummyTableToAdd">
                        <tr />
                        <tr />
                        {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                            (<tr className="table-warning">
                                <td id="allOrderFields"></td>
                                <td>{order.buyer}</td>
                                <td>{order.buyerPhone}</td>
                                <td>{order.product}</td>
                                <td>{order.quantity}</td>
                                <td id="allOrderFields"></td>
                                <td id="allOrderFields"></td>
                                <td id="allOrderFields"><button className="btn-blue">Report</button></td>
                                {/* <td style={{ background: this.rowColor }}>
                            <div className="status-button">
                                {projectItem.projectionsRunStatus === 'error' && <img src={errorIcon} />}
                                {projectItem.projectionsRunStatus === 'done' && <img src={doneIcon} />}
                                {projectItem.projectionsRunStatus === 'inProgress' && <img src={progressIcon} />}
                                <span>{UppercaseFirst(projectItem.projectionsRunStatus)}</span>
                            </div>
                        </td> */}
                            </tr>)
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
export default OrderList;