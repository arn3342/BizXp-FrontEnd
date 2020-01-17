import React from 'react';
import OrderReport from '../PDF/OrderReport';
import FileSaver from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../orders/orders.css'
import '../../App.css'
import Calendar from 'react-calendar'
import moment from 'moment'

class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dummyOrderArray: [],
            showAddOrders: true,
            ShowOrderList: false,
            startDate: new Date(),
            showStartCalendar: false,
            endDate: new Date(),
            showEndCalendar: false
        }
    }
    render() {
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
                            {/* {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                (<tr className="table-warning">
                                    <td>{order.orderDate}</td>
                                    <td>{order.buyer}</td>
                                    <td>{order.buyerPhone}</td>
                                    <td>{order.product}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.paid}</td>
                                    <td>{order.due}</td>
                                    <td><button className="btn-blue">Report</button></td>
                                </tr>)
                            ))} */}
                            <tr className="table-warning">
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
                                <td><button className="btn-blue" onClick={()=>this.pdfDownload()}>Report</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    pdfDownload = () =>
    {
        console.log("inside the pdfDownload");
        var data = pdf(<OrderReport/>).toBlob();
        console.log(data);
        data.then(function(value)
        {
            console.log(value)
            FileSaver.saveAs(value,'OrderReport.pdf');
        })

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