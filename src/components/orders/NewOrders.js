import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
import FinalizeOrder from './FinalizeOrder';
import NumberFormat from 'react-number-format';
var IsShowingOutOfStock = false;

var DummyOrders = []
class NewOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dummyOrderArray: [],
            showFinalizeModal: false,
            totalPrice: 0,
            totalDiscountPrice: 0
        }
    }
    render() {
        return (
            //#region 'Add New Order' component
            <div className="content">
                <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="col-md-4 inline-fields">
                        <select id="dummyProduct" name="products" className="input-fields">
                            <option value="volvo">Select product...</option>
                            <option value="Passenger Car Battery">Passenger Car Battery</option>
                            <option value="Optima Battery">Optima Battery</option>
                            <option value="Maxima Battery">Maxima Battery</option>
                            <option value="audi">Other products will be shown here....</option>
                        </select>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <input id="dummyQuantity" placeholder="Quantity" className="input-fields"></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input id="dummyBuyer" placeholder="Buyer Name" className="input-fields"></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input id="dummyPhone" placeholder="Buyer Phone No." className="input-fields"></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddDummyOrder()}>Add Order</button>
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
                                    <th></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                        <table id="tableData" className="table table-hover table-borderless">
                            <tbody id="dummyTableToAdd">
                                <tr />
                                <tr />
                                {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.buyer}</td>
                                        <td>{order.buyerPhone}</td>
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        {/* <td style={{ background: this.rowColor }}>
                                    <div className="status-button">
                                        {projectItem.projectionsRunStatus === 'error' && <img src={errorIcon} />}
                                        {projectItem.projectionsRunStatus === 'done' && <img src={doneIcon} />}
                                        {projectItem.projectionsRunStatus === 'inProgress' && <img src={progressIcon} />}
                                        <span>{UppercaseFirst(projectItem.projectionsRunStatus)}</span>
                                    </div>
                                </td> */}
                                    </tr>)
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* table ends here */}

                <div id="finalizeOrderContainer" className="bottom-div div-shadow">
                    {/* <div className='col-md-2 inline-fields' style={{ float: 'right' }}> */}
                    <div className="col-sm-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <label id="dummyQuantity" className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Total price: <b style={{ fontSize: '18px' }}><NumberFormat id="totalSellingPrice" value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <div id="discountDiv" className="col-sm-2 inline-fields" style={{ marginRight: '20px', float: 'left', display: 'none' }}>
                        <label id="dummyQuantity" className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Discount price: <b style={{ fontSize: '18px' }}><NumberFormat id="totalDiscountPrice" value={this.state.discountPrice} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <div className="col-md-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <input id="discountInput" placeholder="Discount" className="input-fields" onChange={(e) => this.CalculateDiscount(e)}></input>
                    </div>
                    <div className="col-md-3 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <input id="dummyQuantity" placeholder="Paid amount" className="input-fields"></input>
                    </div>
                    <div className="col-sm-3 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <label id="dummyQuantity" className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Due: </label>
                    </div>
                    <button className="btn-Blue-active rightSpace" onClick={() => this.ShowFinalizeModal()} style={{ width: '150px' }}>Finalize</button>
                    {/* </div> */}
                </div>
                {this.state.showFinalizeModal && <FinalizeOrder />}
            </div>
            //#endregion
        )
    }
    SclaeTableHeader(index) {
        try {
            var columnHeaders = document.getElementById("columnHeaders");
            var columnCells = document.getElementById("tableData");
            for (var i = 0; i < columnHeaders.rows[0].cells.length; i++) {
                var col = columnHeaders.rows[0].cells[i];
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
            }
        }
        catch (error) { console.log(error) }
    }

    ShowFinalizeModal() {
        console.log('Modal Shown')
        this.setState({
            showFinalizeModal: true
        })
    }

    CalculateTotalPrice(){

    }
    CalculateDiscount(e) {
        var discountPercent = e.target.value;
        
        if(discountPercent != '' && discountPercent){
            console.log('Discount comes here: ' + discountPercent)
            var discountPercentage = document.getElementById('discountInput').value;
            var discount = Math.round((this.state.totalPrice / 100) * discountPercentage)

            this.setState({
                totalDiscountPrice: discount
            })
            document.getElementById('discountDiv').style = 'display: '
        }
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }
    AddDummyOrder = () => {
        document.getElementById('dummyBuyer').setAttribute('disabled', true);
        var order = {};
        order.product = document.getElementById('dummyProduct').value;
        order.quantity = document.getElementById('dummyQuantity').value;
        order.buyer = document.getElementById('dummyBuyer').value;
        order.buyerPhone = document.getElementById('dummyPhone').value;
        order.price = 10000;

        DummyOrders.push(order);
        this.setState({
            dummyOrderArray: DummyOrders,
            totalPrice: DummyOrders.map(data => data.price).reduce((a, b) => a + b)
        })
    }
}
export default NewOrder;