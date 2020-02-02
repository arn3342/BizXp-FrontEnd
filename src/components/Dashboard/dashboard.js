import React, { Component } from 'react';
import { faPlus, faCalendar, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import Calendar from 'react-calendar';
import moment from 'moment';
import '../Dashboard/dashboard.css'
import Axios from 'axios';
import { API_FOR_PROD } from '../../conString';
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
            summaryFrom: 'of ' + moment(new Date()).format('MM-DD-YYYY'),
            shopId: 1
        }
    }
    render() {
        return (
            <div id="content">
                <div className="row leftSpace pt-4">
                    <div className="box-Container col-md-3">
                        <h4 className="mb-3">Sales today</h4>
                        <div className="row box-contents-div p-3">
                            <div className="contents col-md-2 pt-1">
                                <span style={{ color: '#15e87b' }}>
                                    <FontAwesomeIcon className="icon" icon={faArrowUp} />
                                </span>
                            </div>
                            <div className="contents-2 col-md-9">
                                <h3>$2,909</h3>
                            </div>
                        </div>
                        <div className="progress topSpace">
                            <div className="progress-bar" role="progressbar" style={{ width: '55%', backgroundColor: '#15e87b' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="box-Container col-md-3 leftSpace-wide">
                        <h4 className="mb-3">Sales this month</h4>
                        <div className="row box-contents-div p-3">
                            <div className="contents col-md-2 pt-1">
                                <span style={{ color: '#15e87b' }}>
                                    <FontAwesomeIcon className="icon" icon={faArrowUp} />
                                </span>
                            </div>
                            <div className="contents-2 col-md-9">
                                <h3>$2,909</h3>
                            </div>
                        </div>
                        <div className="progress  topSpace">
                            <div className="progress-bar" role="progressbar" style={{ width: '55%', backgroundColor: '#15e87b' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        {/* <button className="box-button-narrow">Show Orders</button> */}
                    </div>

                    <div className="box-Container col-md-3 leftSpace-wide">
                        <h4 className="mb-3">Sales this year</h4>
                        <div className="row box-contents-div p-3">
                            <div className="contents col-md-2 pt-1">
                                <span style={{ color: '#15e87b' }}>
                                    <FontAwesomeIcon className="icon" icon={faArrowUp} />
                                </span>
                            </div>
                            <div className="contents-2 col-md-9">
                                <h3>$2,909</h3>
                            </div>
                        </div>
                        <div className="progress  topSpace">
                            <div className="progress-bar" role="progressbar" style={{ width: '55%', backgroundColor: '#15e87b' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        {/* <button className="box-button-narrow">Show Orders</button> */}
                    </div>

                </div>
                <div className="row leftSpace pt-5">
                    <h4 className="mb-4">Top 3 products</h4>
                </div>
                <div className="row leftSpace">
                    <div className="top-product-container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3">Maxima Battery</h4>
                        <h4 className="fontBold">300 units sold</h4>
                        <div className="progress topSpace">
                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '100%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="top-product-container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3">Passenger Battery</h4>
                        <h4 className="fontBold">200 units sold</h4>
                        <div className="progress topSpace">
                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '80%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="top-product-container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 className="mb-3">Ultra Battery</h4>
                        <h4 className="fontBold">140 units sold</h4>
                        <div className="progress topSpace">
                            <div className="progress-bar bg-info" role="progressbar" style={{ width: '65%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

    async GetSellAndProfit() {
        const profitSellResponse = await Axios.get(API_FOR_PROD + '/dashboard/GetDashboard?shopId=' + this.state.shopId + '&startdate=' + moment(new Date()).format('1/28/2020') + '&enddate=' + moment(new Date()).format('1/28/2021'))
        console.log(profitSellResponse)
    }

    componentDidMount() {
        this.GetSellAndProfit();
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