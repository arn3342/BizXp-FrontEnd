import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'

var IsShowingOutOfStock = false;
function Orders() {
    return (
        <div id="content">
            <div className="row">
                <h2 className="mb-4">Orders & Payments</h2>

            </div>
            <div className="row">
                {/* <div className="col-md-2">
                    <button className="btn-Blue btn-full-width" onClick={()=> ShowNewOrderFields()}><FontAwesomeIcon icon={faPlus} style={{ fontSize: '14px', marginRight: '8px' }} />Add order</button>
                </div> */}
                <nav id="nav-menu-container" style={{display: 'inline-block'}}>
                    <ul class="nav-menu">
                        <li><a href="index.html">Add Orders</a></li>
                        <li><a href="#services">All Orders</a></li>
                    </ul>
                </nav>
            </div>
            {/* table starts here */}

            <div id="addProductFieldsContainer" className='row field-container' style={{ display: 'none' }}>
                <div className="col-md-4 inline-fields">
                    <label>Product</label>
                    <input className="input-fields"></input>
                </div>
                <div className="col-md-4 inline-fields">
                    <label>Quantity</label>
                    <input className="input-fields"></input>
                </div>
                <div className="col-md-4 inline-fields">
                    <label>Buyer Name</label>
                    <input className="input-fields"></input>
                </div>
                <div className="col-md-4 inline-fields">
                    <label>Buyer Phone</label>
                    <input className="input-fields"></input>
                </div>

                <div className='row col-md-2' style={{ display: 'inherit', marginTop: '15px' }}>
                    <button className="btn-Blue btn-full-width">Save</button>
                </div>
            </div>
            <div className='dataContainer row' style={{ display: 'inherit' }}>
                <div className="headerContainer" style={{ marginTop: '20px' }}>
                    <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                        <tbody>
                            <tr className="column-container" style={{ paddingTop: '8px' }}>
                                <th>Buyer Name<img className="sortIcon" /></th>
                                <th>Buyer Number</th>
                                <th>Product<img className="sortIcon" /></th>
                                <th>Quantity<img className="sortIcon" /></th>
                                <th>Paid<img className="sortIcon" /></th>
                                <th>Due<img className="sortIcon" /></th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                <table id="tableData" className="table table-hover table-borderless">
                    <tbody>
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
            </div> */}
            </div>
            {/* table ends here */}
        </div >
    )
}
function ShowNewOrderFields() {
    document.getElementById('addProductFieldsContainer').style = "display: inherit"
}
function ShowOutOfStock() {
    var outOfStockBtn = document.getElementById('outOfStockBtn');
    if (!IsShowingOutOfStock) {
        IsShowingOutOfStock = true;
        outOfStockBtn.classList.add('outOfStockBtn-Selected');
    }
    else {
        IsShowingOutOfStock = false;
        outOfStockBtn.classList.remove('outOfStockBtn-Selected');
    }
}
export default Orders;