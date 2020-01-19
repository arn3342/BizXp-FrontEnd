import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import Calendar from 'react-calendar';
import moment from 'moment';
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
                    <div className="row leftSpace topSpace">
                        <h2 className="mb-4" onClick={() => this.addDummyProduct()}>Dashboard</h2>
                    </div>
                    <div className="row leftSpace">
                        <div className="col-md-3">
                            <button id="showStartCalendar" className="btn-Blue" onClick={(e) => this.DisplayCalendar(e)} style={{ fontSize: '16px', padding: '0px 20px' }}>Start date: {moment(this.state.startDate).format("MM-DD-YYYY")}</button>
                            <div className="topSpace" style={{ display: this.state.showStartCalendar ? 'block' : 'none' }}>
                                <Calendar id="showStartCalendar" value={this.state.startDate}
                                    //  onChange={(e) => {this.onChange()}}
                                    onChange={(e) => { this.onChange(e, 'showStartCalendar'); this.DisplayCalendar('', 'showStartCalendar') }}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button id="showEndCalendar" className="btn-Blue" onClick={(e) => this.DisplayCalendar(e)} style={{ fontSize: '16px', padding: '0px 20px' }}>End date: {moment(this.state.endDate).format("MM-DD-YYYY")}</button>
                            <div className="topSpace" style={{ display: this.state.showEndCalendar ? 'block' : 'none' }}>
                                <Calendar id="showEndCalendar" value={this.state.startDate}
                                    onChange={(e) => { this.onChange(e, 'showEndCalendar'); this.DisplayCalendar('', 'showEndCalendar') }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row leftSpace pt-4">
                        <h4>Showing summary {this.state.summaryFrom}</h4>
                    </div>
                    <div className="row leftSpace pt-2">
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