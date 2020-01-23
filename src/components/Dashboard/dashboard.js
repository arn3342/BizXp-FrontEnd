import React, { Component } from 'react';
import { faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import Calendar from 'react-calendar';
import moment from 'moment';
import '../Dashboard/dashboard.css'
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddOrders: true,
            ShowOrderList: false,
            ShowReport: false,
            startDate: new Date(),
            showStartCalendar: false,
            endDate: new Date(),
            showEndCalendar: false,
            summaryFrom: 'of ' + moment(new Date()).format('MM-DD-YYYY')
        }
    }
    render() {
        return (
            <div id="content">
                <div id="content">
                    <div className="row component-header-container">
                        <h2 className="component-header-title">Dashboard</h2>
                    </div>
                    <div className="row leftSpace pt-3">
                        <div id="dateContainer" className="col-md-3">
                            <h4>Start date</h4>
                            <button id="showStartCalendar" className="btn-Blue  btn-date" onClick={(e) => this.DisplayCalendar(e)} style={{ fontSize: '16px', padding: '0px 20px' }}>{moment(this.state.startDate).format("MM-DD-YYYY")}</button>
                            <div className="topSpace" style={{ display: this.state.showStartCalendar ? 'block' : 'none' }}>
                                <Calendar id="showStartCalendar" value={this.state.startDate}
                                    //  onChange={(e) => {this.onChange()}}
                                    onChange={(e) => { this.onChange(e, 'showStartCalendar'); this.DisplayCalendar('', 'showStartCalendar') }}
                                />
                            </div>
                        </div>
                        <div id="dateContainer" className="col-md-3">
                            <h4>End date</h4>
                            <button id="showEndCalendar" className="btn-Blue btn-date" onClick={(e) => this.DisplayCalendar(e)} style={{ fontSize: '16px', padding: '0px 20px' }}>{moment(this.state.endDate).format("MM-DD-YYYY")}</button>
                            <div className="topSpace" style={{ display: this.state.showEndCalendar ? 'block' : 'none' }}>
                                <Calendar id="showEndCalendar" value={this.state.startDate}
                                    onChange={(e) => { this.onChange(e, 'showEndCalendar'); this.DisplayCalendar('', 'showEndCalendar') }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="row leftSpace pt-4">
                        <h4>Showing summary {this.state.summaryFrom} </h4>
                    </div> */}
                    <div className="row leftSpace pt-2">
                        <div className="box-Container col-md-4">
                            <h4 className="mb-3 box-title">Total sales</h4>
                            <h4 className="fontBold box-content">0</h4>
                            <button className="box-button">Show Orders</button>
                        </div>
                        <div id="outOfStockBtn" className="box-Container col-md-3" style={{ marginLeft: '15px' }}>
                            <h4 id="" className="mb-3 box-title">Total profit</h4>
                            <h4 className="fontBold box-content">50,000 BDT</h4>
                        </div>
                        <div id="outOfStockBtn" className="box-Container col-md-4" style={{ marginLeft: '15px', background: '#ff3b3b' }}>
                            <h4 id="" className="mb-3 box-title">Total due</h4>
                            <h4 className="fontBold box-content">10,000 BDT</h4>
                            <button className="box-button" style={{color: '#ff3b3b'}}>Show due payments</button>
                        </div>
                    </div>
                    <div className="row leftSpace pt-5">
                        <h4 className="mb-4">Top 3 products</h4>
                    </div>
                    <div className="row leftSpace">
                        <div className="top-product-container col-md-3" style={{ marginLeft: '15px' }}>
                            <h4 id="" className="mb-3">Maxima Battery</h4>
                            <h4 className="fontBold">300 units sold</h4>
                            <div class="progress topSpace">
                                <div class="progress-bar bg-info" role="progressbar" style={{width: '100%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="top-product-container col-md-3" style={{ marginLeft: '15px' }}>
                            <h4 id="" className="mb-3">Passenger Battery</h4>
                            <h4 className="fontBold">200 units sold</h4>
                            <div class="progress topSpace">
                                <div class="progress-bar bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="top-product-container col-md-3" style={{ marginLeft: '15px' }}>
                            <h4 className="mb-3">Ultra Battery</h4>
                            <h4 className="fontBold">140 units sold</h4>
                            <div class="progress topSpace">
                                <div class="progress-bar bg-info" role="progressbar" style={{width: '65%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        );
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
            if (startdate >= enddate) {
                this.setState({
                    endDate: startdate,
                    summaryFrom: ' of ' + moment(startdate).format('MM-DD-YYYY')
                })
            }
            else {
                this.setState({
                    summaryFrom: ' from ' + moment(startdate).format('MM-DD-YYYY') + ' to ' + moment(enddate).format('MM-DD-YYYY')
                })
            }
        }
        else {
            this.setState({
                endDate: e,
                summaryFrom: ' from ' + moment(startdate).format('MM-DD-YYYY') + ' to ' + moment(e).format('MM-DD-YYYY')
            })
        }
    }
}
export default Dashboard;