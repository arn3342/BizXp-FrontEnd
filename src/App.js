import React, { Component } from 'react';
import './App.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inventory from './components/Inventory/inventory';
import Orders from './components/orders/orders';
import Reports from './components/reports/reports';
import PDFReport from './components/PDF/ReportDummy';
import model from '../src/Images/model.jpg'
import dashboardIcon from '../src/Images/dashboard_icon.png'
import inventoryIcon from '../src/Images/inventory_icon.png'
import orderIcon from '../src/Images/order_icon.png'
import clientIcon from '../src/Images/client_icon.png'
import Dashboard from './components/Dashboard/dashboard';
import Clients from './components/Clients/clients';
import warehouseicon from '../src/Images/warehouse_icon.png'
import shopicon from '../src/Images/shop_icon.png'

import { Provider } from 'react-redux';
import store from './store';
import Products from './components/Products/products';
import Shops from './components/Shops/shops';

import Invoice from './components/Invoice/invoice';

var IsCollapsed = false;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { showInventory: false, showOrders: false, showPayments: false, showDashboard: true, showClients: false, showProducts: false, showShops: false }
  }

  componentDidMount(){
    document.body.style.background = 'none'
  }
  render() {
    return (
        <div className="App">
        <div className="wrapper d-flex align-items-stretch">
        <div id="sidebar" className="col-md-2.5" style={{padding: 'opx', width: '300px'}}>
          <nav id="sidebar" className="full-height" style={{position: 'fixed'}}>
            <div className="custom-menu">
              <button type="button" id="sidebarCollapse" onClick={() => this.ExpandCollapseMenu()} className="btn btn-primary">
                {/* <i className="fa fa-bars"></i> */}
                <FontAwesomeIcon icon={faBars} style={{ fontSize: '14px', marginRight: '8px' }} />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </div>
            <div className="menuContainer full-height">
              <div className="logoContainer">
                <h4><a href="index.html" className="logo">Business<b>Expert</b></a></h4>
              </div>
              <div className="user-box row">
                <div className="col-md-2">
                  <img className="user-image-round inline-item" src={model} alt="User image" />
                </div>
                <div className="col-md-8 user-box-name">
                  <div>
                    <h4>Md.Alamin Hossain</h4>
                    Rangs Traders BD
                </div>
                </div>
              </div>
              <div className="p-4 full-height">
                <ul className="list-unstyled components mb-5 full-height">
                  <li className="active">
                    <img src={dashboardIcon}></img>
                    <a onClick={() => this.ShowDashboard()}>Dashboard</a>
                  </li>
                  <li>
                    <img src={shopicon}></img>
                    <a onClick={() => this.ShowShops()}>My shops</a>
                  </li>
                  <li>
                    <img src={inventoryIcon}></img>
                    <a onClick={() => this.ShowProducts()}>Products</a>
                  </li>
                  <li>
                    <img src={warehouseicon}></img>
                    <a onClick={() => this.ShowInventory()}>Inventory</a>
                  </li>
                  <li>
                    <img src={orderIcon}></img>
                    <a onClick={() => this.ShowOrders()}>Orders & Payments</a>
                  </li>
                  <li>
                    <img src={clientIcon}></img>
                    <a onClick={() => this.ShowClients()}>Clients</a>
                  </li>

                  {/* dummy */}
               
                  <li className="bottom-content">
                    {/* <img src={clientIcon}></img> */}
                    <a onClick={() => this.ShowClients()}>Support: +8801611416466</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="content" className="componentContainer p-md-3">
          {this.state.showInventory && <Inventory />}
          {this.state.showShops && <Shops/>}
          {this.state.showProducts && <Products/>}
          {this.state.showOrders && <Orders showPDF={this.showPDF} />}
          {this.state.showDashboard && <Dashboard />}
          {this.state.showClients && <Clients />}
          {/* {this.state.showInvoice && <Invoice/>} */}
        </div>
      </div>
        </div>
      
    );
  }

  showPDF = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showDashboard: false,
      showPDF: true
    })
  }
  ShowInvoice = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showDashboard: false,
      showPDF: false,
      showClients: false,
      showProducts: false,
      showShops: false,
      showInvoice: true
    })
  }
  ShowShops = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showDashboard: false,
      showPDF: false,
      showClients: false,
      showProducts: false,
      showShops: true,
      showInvoice: false
    })
  }

  ShowProducts = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showDashboard: false,
      showPDF: false,
      showClients: false,
      showProducts: true,
      showShops: false,
      showInvoice: false
    })
  }

  ShowInventory = () => {
    this.setState({
      showInventory: true,
      showOrders: false,
      showPayments: false,
      showDashboard: false,
      showPDF: false,
      showClients: false,
      showProducts: false,
      showShops: false,
      showInvoice: false
    })
  }

  ShowOrders = () => {
    this.setState({
      showInventory: false,
      showOrders: true,
      showPayments: false,
      showDashboard: false,
      showPDF: false,
      showClients: false,
      showProducts: false,
      showShops: false,
      showInvoice: false
    })
  }
  ShowClients = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showDashboard: false,
      showPDF: false,
      showClients: true,
      showProducts: false,
      showShops: false,
      showInvoice: false
    })
  }

  ShowPayments = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: true,
      showDashboard: false,
      showPDF: false,
      showClients: false,
      showProducts: false,
      showShops: false,
      showInvoice: false
    })
  }

  ShowDashboard = () => {
    this.setState({
      showInventory: false,
      showOrders: false,
      showPayments: false,
      showDashboard: true,
      showPDF: false,
      showClients: false,
      showProducts: false,
      showShops: false,
      showInvoice: false
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
