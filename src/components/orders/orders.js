import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
var IsShowingOutOfStock = false;
function Orders() {
    return (
        <div id="content">
            <div className="row leftSpace topSpace">
                <h2 className="mb-4">Orders & Payments</h2>
            </div>
            <div className="row leftSpace">
                {/* <div className="col-md-2">
                    <button className="btn-Blue btn-full-width" onClick={()=> ShowNewOrderFields()}><FontAwesomeIcon icon={faPlus} style={{ fontSize: '14px', marginRight: '8px' }} />Add order</button>
                </div> */}
                <nav id="nav-menu-container" style={{ display: 'inline-block' }}>
                    <ul id="header-nav" className="nav-menu">
                        <li onClick={(e) => { setActiveTabColor(e); ShowAddOrders(e) }}><a className="tab-active">New Order</a></li>
                        <li onClick={(e) => { setActiveTabColor(e); ShowOrderList(e); }}><a>All Orders & Payments</a></li>
                    </ul>
                </nav>
            </div>
            {/* table starts here */}

            <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                <div className="col-md-4 inline-fields">
                    <select name="products" className="input-fields">
                        <option value="volvo">Select product...</option>
                        <option value="volvo">Passenger Car Battery</option>
                        <option value="saab">Optima Battery</option>
                        <option value="fiat">Maxima Battery</option>
                        <option value="audi">Other products will be shown here....</option>
                    </select>
                </div>
                <div className="col-md-3 inline-fields">
                    <input placeholder="Quantity" className="input-fields"></input>
                </div>
                <div className="col-md-4 inline-fields">
                    <input placeholder="Buyer Name" className="input-fields"></input>
                </div>
                <div className="col-md-4 inline-fields">
                    <input placeholder="Buyer Phone No." className="input-fields"></input>
                </div>
                <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                    <button className="btn-Blue btn-full-width" onClick={() => AddDummyOrder()}>Add Order</button>
                </div>
            </div>
            <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                <div className="headerContainer" style={{ marginTop: '20px' }}>
                    <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                        <tbody>
                            <tr className="column-container" style={{ paddingTop: '8px' }}>
                                <th>Buyer Name<img className="sortIcon" /></th>
                                <th>Buyer Number</th>
                                <th>Product<img className="sortIcon" /></th>
                                <th>Quantity<img className="sortIcon" /></th>
                                <th id="allOrderFields" className="fields-hidden">Paid<img className="sortIcon" /></th>
                                <th id="allOrderFields" className="fields-hidden">Due<img className="sortIcon" /></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                    <table id="tableData" className="table table-hover table-borderless">
                        <tbody id="dummyTableToAdd">
                            <tr />
                            <tr />
                            {projectObject && (projectObject.map((projectItem, index) =>
                                (<tr className="table-warning" key={projectItem.procoreNumber}>
                                    {this.SetRowColor(index)}
                                    <td className="checkboxContainer" style={{ width: '60px', background: this.rowColor }}>
                                        <input type="checkbox" value='true'
                                            // style={{pointerEvents: "none"}}
                                            disabled={(projectItem.projectionsRunStatus || '').toLowerCase() == "inprogress"}
                                            checked={this.state.ProcoreNumbers.indexOf(projectItem.procoreNumber) > -1}
                                            onChange={(event) => this.handleChange(event, projectItem.procoreNumber)} />
                                        <span className="checkmark"></span>
                                    </td>
                                    <td style={{ minWidth: "200px", background: this.rowColor }}>{projectItem.procoreNumber}</td>
                                    <td style={{ background: this.rowColor }}>{projectItem.name}</td>
                                    <td style={{ background: this.rowColor }}>{moment(projectItem.lastProjectionsModified).format("MM-DD-YYYY hh:mm")}</td>
                                    <td style={{ background: this.rowColor }}>
                                        <div className="status-button">
                                            {projectItem.projectionsRunStatus === 'error' && <img src={errorIcon} />}
                                            {projectItem.projectionsRunStatus === 'done' && <img src={doneIcon} />}
                                            {projectItem.projectionsRunStatus === 'inProgress' && <img src={progressIcon} />}
                                            <span>{UppercaseFirst(projectItem.projectionsRunStatus)}</span>
                                        </div>
                                    </td>
                                </tr>)
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* table ends here */}
            <div id="finalizeOrderContainer" className="bottom-div div-shadow">
                {/* <div className='col-md-2 inline-fields' style={{ float: 'right' }}> */}
                <button className="btn-Blue-active rightSpace" style={{ width: '150px' }}>Finalize</button>
                {/* </div> */}
            </div>
        </div >
    )
}
function ShowAddOrders(e) {
    document.getElementById('addOrderFieldsContainer').style = 'display: inherit';
    document.getElementById('finalizeOrderContainer').style = 'display: ';
    document.querySelectorAll('[id=allOrderFields]').forEach(element => element.className = 'fields-hidden');
}

function setActiveTabColor(e) {
    var navCChild = document.getElementById('header-nav').children;
    for (var i = 0; i < navCChild.length; i++) {
        var child = navCChild[i].getElementsByTagName('A')[0];
        child.className = "";
        console.log(child)
    }
    e.target.classList.add('tab-active')
}

function ShowOrderList() {
    document.getElementById('addOrderFieldsContainer').style = 'display: none';
    document.getElementById('finalizeOrderContainer').style = 'display: none';
    document.querySelectorAll('[id=allOrderFields]').forEach(element => element.className = 'fields-visible');
}
function AddDummyOrder() {
    var tr = document.createElement('tr');
}

export default Orders;