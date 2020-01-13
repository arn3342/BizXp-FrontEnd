import React from 'react';
import logo from './logo.svg';
import './App.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inventory from './components/Inventory/inventory';
var IsCollapsed = false;
function App() {
  
  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar">
        <div className="custom-menu">
          <button type="button" id="sidebarCollapse" onClick={()=> ExpandCollapseMenu()} className="btn btn-primary">
            {/* <i className="fa fa-bars"></i> */}
            <FontAwesomeIcon icon={faBars} style={{fontSize:'14px', marginRight: '8px'}}/>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
        <div className="p-4 pt-5 menuContainer">
          <h1><a href="index.html" className="logo">BizXP</a></h1>
          <ul className="list-unstyled components mb-5">
            <li className="active">
              <a href="#">Inventory</a>
            </li>
            <li>
              <a href="#">Payments</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">Reports</a>
            </li>
          </ul>
        </div>
      </nav>
      <div id="content" className="p-4 p-md-5 pt-5">
        <Inventory/>
      </div>
    </div>
  );
}

function ExpandCollapseMenu(){
  var SideBar = document.getElementById('sidebar');
  if(!IsCollapsed){
    IsCollapsed = true;
    SideBar.className = 'active'
  }
  else{
    IsCollapsed = false;
    SideBar.className = ''
  }
}
export default App;
