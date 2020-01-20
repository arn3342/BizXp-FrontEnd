import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import Calendar from 'react-calendar';
import '../Clients/clients.css'
import moment from 'moment';
import '../Dashboard/dashboard.css'
class Clients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalClients: 0,
            clients: [
                {
                    clientName: 'Aousaf Rashid',
                    phone: '01611416466',
                    email: 'nabilrashid44@gmail.com',
                    address: '11/B, Khilgaon, Dhaka',
                    totalOrders: '115'
                }
            ]
        }
    }
    render() {
        return (
            <div id="content">
                <div id="content">
                    <div className="row leftSpace topSpace">
                        <h2 className="mb-4">Clients</h2>
                    </div>
                    <div className="row leftSpace">
                        <div className="boxContainer col-md-4">
                            <h4 className="mb-3">Total clients</h4>
                            <h4 className="fontBold">{this.state.totalClients}</h4>
                        </div>
                    </div>
                    <br></br>
                    {/* Add Product Section Starts here*/}
                    <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                        <div className="col-md-4 inline-fields">
                            <input id="dummyName" placeholder="Client Name" className="input-fields"></input>
                        </div>
                        <div className="col-md-3 inline-fields">
                            <input id="dummyQuantity" placeholder="Phone no." className="input-fields"></input>
                        </div>
                        <div className="col-md-4 inline-fields">
                            <input id="dummyBuyer" placeholder="Email" className="input-fields"></input>
                        </div>
                        <div className="col-md-4 inline-fields">
                            <input id="dummyPhone" placeholder="Address" className="input-fields"></input>
                        </div>
                        <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                            <button className="btn-Blue btn-full-width" onClick={() => this.AddDummyOrder()}>Add client</button>
                        </div>
                    </div>
                    {/* Add Product Section Ends  here*/}

                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <tbody>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Client Name<img className="sortIcon" /></th>
                                    <th>Phone Number</th>
                                    <th>Email<img className="sortIcon" alt="sortIcon" /></th>
                                    <th>Address<img className="sortIcon" alt="sortIcon" /></th>
                                    <th id="allOrderFields">Total orders<img className="sortIcon" alt="sortIcon" /></th>
                                    <th></th>
                                </tr>
                            </tbody>
                            <tbody id="dummyTableToAdd">
                                <tr />
                                <tr />
                                {this.state.clients && (this.state.clients.map((client, index) =>
                                    (<tr className="table-warning">
                                        <td>{client.clientName}</td>
                                        <td>{client.phone}</td>
                                        <td>{client.email}</td>
                                        <td>{client.address}</td>
                                        <td>{client.totalOrders}</td>
                                        <td><button className="btn-Blue-active-small">Show orders</button></td>
                                    </tr>)
                                ))}
                            </tbody>
                        </table>
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
export default Clients;