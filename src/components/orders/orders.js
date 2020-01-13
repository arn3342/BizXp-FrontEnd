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
                <h2 className="mb-4">Orders</h2>
                <button className="col-md-2 ml-auto btn-Blue"><FontAwesomeIcon icon={faPlus} style={{ fontSize: '14px', marginRight: '8px' }} />Add order</button>
            </div>
            <div className="row">
                <div className="boxContainer col-md-4">
                    <h4 className="mb-3">Total orders</h4>
                    <h4 className="fontBold">500</h4>
                </div>
            </div>
            {/* table starts here */}

            <div className='dataContainer row' style={{display: 'inherit'}}>
            <div className="headerContainer" style={{ marginTop: '20px' }}>
                <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                    <tbody>
                        <tr className="column-container" style={{ paddingTop: '8px' }}>
                            <th className="checkboxContainer">
                                <input type="checkbox" />
                                <span className="checkmark" style={{ margin: '-2px 15px 0px 5px' }}></span>
                            </th>
                            <th>Buyer Name<img className="sortIcon"/></th>
                            <th>Buyer Number</th>
                            <th>Product<img className="sortIcon"/></th>
                            <th>Quantity<img className="sortIcon"/></th>
                            <th>Paid<img className="sortIcon"/></th>
                            <th>Due<img className="sortIcon"/></th>
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