import React, { Component } from 'react';
import './App.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inventory from './components/Inventory/inventory';
import Orders from './components/orders/orders';
import Reports from './components/reports/reports';
import PDFReport from './components/PDF/ReportDummy';

var IsCollapsed = false;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { showInventory: true, showOrders: false, showPayments: false, showReports: false,showPDF:false }
  }
  render() {
    return (
      <div className="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
          <div className="custom-menu">
            <button type="button" id="sidebarCollapse" onClick={() => this.ExpandCollapseMenu()} className="btn btn-primary">
              {/* <i className="fa fa-bars"></i> */}
              <FontAwesomeIcon icon={faBars} style={{ fontSize: '14px', marginRight: '8px' }} />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
          <div className="p-4 pt-5 menuContainer">
            <h1><a href="index.html" className="logo">BizXP</a></h1>
            <ul className="list-unstyled components mb-5">
              <li className="active">
                <a onClick={() => this.ShowInventory()}>Inventory</a>
              </li>
              <li>
                <a onClick={() => this.ShowOrders()}>Orders & Payments</a>
              </li>
              <li>
                <a onClick={() => this.ShowReports()}>Reports</a>
              </li>
            </ul>
          </div>
        </nav>
        <div id="content" className="componentContainer p-md-3">          
          {this.state.showInventory && <Inventory />}
          {this.state.showOrders && <Orders showPDF={this.showPDF}/>}
          {this.state.showReports && <Reports/>}
          {this.state.showPDF && <PDFReport />}
        </div>
      </div>
    );
  }
  
  showPDF=()=>
  {
      this.setState({
        showInventory: false,
        showOrders: false,
        showPayments: false,
        showReports: false,
        showPDF:true
      })
  }
  ShowInventory = () => {
    this.setState({
      showInventory: true,
      showOrders: false,
      showPayments: false,
      showReports: false,
      showPDF:false
    })
  }

  ShowOrders = () => {
    this.setState({
      showInventory: false,
      showOrders: true,
      showPayments: false,
      showReports: false,
      showPDF:false
    })
  }

  ShowPayments = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: true,
      showReports: false,
      showPDF:false
    })
  }

  ShowReports = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showReports: true,
      showPDF:false
    })

  }

  ExpandCollapseMenu = () => {
    var SideBar = document.getElementById('sidebar');
    if (!IsCollapsed) {
      IsCollapsed = true;
      SideBar.className = 'active'
    }
    else {
      IsCollapsed = false;
      SideBar.className = ''
    }
  }
}
export default App;
