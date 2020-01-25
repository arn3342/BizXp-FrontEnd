import React, { Component, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../orders/orders.css'
import '../../App.css'
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import closeIcon from '../../Images/close_icon.png'
import Axios from 'axios';
import Invoice from '../Invoice/invoice'
var DummyOrders = []


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')
class NewOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dummyOrderArray: [
            ],
            showFinalizeModal: false,
            totalPrice: 0,
            totalDiscountPrice: 0,
            totalDue: 0,
            modalIsOpen: false,
            quantity: '',
            product: '',
            buyerName: '',
            buyerPhone: '',
            buyerAddress: '',
            confirmClicked: false,
        }
    }
    render() {
        let totalPrice = 0;
        this.state.dummyOrderArray.map((order, index) => {
            totalPrice = totalPrice + parseInt(order.price);
        })
        return (
            //#region 'Add New Order' component
            <div className="content">

                {/* Modal starts here */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">

                    {/* <Invoice dummyOrderArray={this.state.dummyOrderArray}/> */}
                    {/* Main modal starts here */}
                    <h2 ref={subtitle => this.subtitle = subtitle}>Confirm Order?</h2>
                    {!this.state.confirmClicked && <div><h4>Order Details</h4></div>}
                    <br />
                    <div style={{ display: !this.state.confirmClicked ? 'block' : 'none' }}>
                        <div className="container-fluid">
                            <div className="col-sm-12 row form-group">
                                <input placeholder="Buyer Name" onChange={(e) => this.onChange(e)} name="buyerName" value={this.state.buyerName}
                                    className="input-fields col-sm-3"></input>
                                <input placeholder="Buyer Phone" onChange={(e) => this.onChange(e)} name="buyerPhone" value={this.state.buyerPhone}
                                    className="input-fields col-sm-3"></input>
                                <input placeholder="Buyer Address" onChange={(e) => this.onChange(e)} name="buyerAddress" value={this.state.buyerAddress}
                                    className="input-fields col-sm-3"></input>
                            </div>
                        </div>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <thead>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Product<img className="sortIcon" /></th>
                                    <th>Quantity<img className="sortIcon" /></th>
                                    <th>Price<img className="sortIcon" /></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="dummyTableToAdd">
                                {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.price}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>

                                    </tr>)
                                ))}
                                <tr style={{ borderTop: 'solid 1px #000' }}>
                                    <td>Total Price</td>
                                    <td></td>
                                    <td>{totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <div className="container-fluid">
                            <div className="col-md-4 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                                <input placeholder="Discount(%)" className="input-fields" onChange={(e) => this.CalculateDiscount(e)}></input>
                            </div>
                            <div className="col-md-6 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                                <label>Total price(after discount):  <br /><b>{this.state.totalDiscountPrice}</b></label>
                            </div>

                        </div>
                        <div className="container-fluid">
                            <div className="col-md-4 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                                <input placeholder="Paid" className="input-fields" onChange={(e) => this.CalculateDue(e)}></input>
                            </div>
                            <div className="col-md-6 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                                <label>Total due(after payment):  <br /><b>{this.state.totalDue}</b></label>
                            </div>

                        </div>
                    </div>
                    <div className='col-md-4 ml-auto'>
                        {!this.state.confirmClicked ? <button className="btn-Blue btn-full-width" onClick={() => this.onConfirmClick()}>Confirm</button> :
                            <div>

                            </div>
                        }

                    </div>
                    {this.state.confirmClicked && <Invoice dummyOrderArray={this.state.dummyOrderArray}
                        buyerName={this.state.buyerName} buyerPhone={this.state.buyerPhone} buyerAddress={this.state.buyerAddress} />}
                </Modal>

                {/* Modal ends here */}

                <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="col-md-4 inline-fields">
                        <select id="dummyProduct" onChange={(e) => this.onChange(e)} name="product"
                            value={this.state.product} className="input-fields" >
                            <option value="volvo">Select product...</option>
                            {/* below has to be mapped */}
                            <option value="Passenger Car Battery">Passenger Car Battery</option>
                            <option value="Optima Battery">Optima Battery</option>
                            <option value="Maxima Battery">Maxima Battery</option>
                            <option value="audi">Other products will be shown here....</option>

                        </select>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <input placeholder="Quantity" onChange={(e) => this.onChange(e)} name="quantity" value={this.state.quantity} className="input-fields"></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddNewOrder()}>Add Order</button>
                    </div>
                </div>
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <tbody>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Product<img className="sortIcon" /></th>
                                    <th>Quantity<img className="sortIcon" /></th>
                                    <th></th>
                                </tr>
                            </tbody>
                            <tbody id="dummyTableToAdd">
                                <tr />
                                <tr />
                                {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
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
                    <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                        <table id="tableData" className="table table-hover table-borderless">

                        </table>
                    </div>
                </div>
                {/* table ends here */}

                <div id="finalizeOrderContainer row" className="bottom-div div-shadow">
                    {/* <div className='col-md-2 inline-fields' style={{ float: 'right' }}> */}
                    {/* <div className="col-sm-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <label className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Total price: <b style={{ fontSize: '18px' }}><NumberFormat id="totalSellingPrice" value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <div id="discountDiv" className="col-sm-2 inline-fields hidden-div" style={{ marginRight: '20px', float: 'left' }}>
                        <label className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Discount price: <b style={{ fontSize: '18px' }}><NumberFormat id="totalDiscountPrice" value={this.state.totalDiscountPrice} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <div className="col-md-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <input placeholder="Discount" className="input-fields" onChange={(e) => this.CalculateDiscount(e)}></input>
                    </div>
                    <div className="col-md-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <input placeholder="Paid amount" className="input-fields" onChange={(e) => this.CalculateDue(e)}></input>
                    </div>
                    <div className="col-sm-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <label className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Due: <b style={{ fontSize: '18px' }}><NumberFormat id="totalDiscountPrice" value={this.state.totalDue} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div> */}
                    <button className="btn-Blue-active col-md-4 ml-auto" onClick={() => this.ConfirmOrder()} style={{ width: '150px' }}>Confirm order</button>
                    {/* </div> */}
                </div>

            </div>
            //#endregion
        )
    }

    componentDidMount() {
        //this.state.products
    }

    onChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    AddNewOrder = () => {
        let order = {
            product: this.state.product,
            quantity: this.state.quantity,
            price: 50
        }
        DummyOrders.push(order);
        this.setState({
            dummyOrderArray: DummyOrders,
            product: 'volvo',
            quantity: ''
        })
        // Axios.post('https://localhost:44304/api/order/createorder/', )
    }
    openModal = () => {
        console.log(this.state.dummyOrderArray);
        this.setState({ modalIsOpen: true });
        console.log(this.state.modalIsOpen)
    }

    onConfirmClick = () => {
        console.log(this.state);
        this.setState({
            confirmClicked: !this.state.confirmClicked
        })
    }

    onShowInvoiceClick = () => {
        this.setState({
            confirmClicked: !this.state.confirmClicked
        })
    }
    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#04be1a';
        this.subtitle.style.width = '700px';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, confirmClicked: false });
    }
    SclaeTableHeader(index) {
        try {
            var columnHeaders = document.getElementById("columnHeaders");
            var columnCells = document.getElementById("tableData");
            for (var i = 0; i < columnHeaders.rows[0].cells.length; i++) {
                var col = columnHeaders.rows[0].cells[i];
                console.log("Header Column Width:" + col.offsetWidth)
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
                console.log("Row column width: " + columnCells.rows[2].cells[i].width)
            }
        }
        catch (error) { console.log(error) }
    }

    removeOrder(index) {
        DummyOrders.splice(index, 1);
        this.CalculateTotalPrice();
    }
    ConfirmOrder() {
        this.openModal();
        // setTimeout(this.closeModal, 1300);

        this.setState({
            showFinalizeModal: false,
            totalPrice: 0,
            totalDiscountPrice: 0,
            totalDue: 0
        })
    }

    CalculateDue(e) {
        var paidAmount = e.target.value;

        if (paidAmount != '' && paidAmount) {
            if (this.state.totalDiscountPrice && this.state.totalDiscountPrice != 0 && this.state.totalDiscountPrice != '') {
                var dueAmount = this.state.totalDiscountPrice - paidAmount;
                this.setState({
                    totalDue: dueAmount
                })
            }
            else {
                var dueAmount = this.state.totalPrice - paidAmount;
                this.setState({
                    totalDue: dueAmount
                })
            }
        }
    }
    CalculateDiscount(e) {
        var discountPercent = e.target.value;

        if (discountPercent != '' && discountPercent) {
            //var discountPercentage = document.getElementById('discountInput').value;
            var discount = this.state.totalPrice - Math.round((this.state.totalPrice / 100) * discountPercent)

            this.setState({
                totalDiscountPrice: discount
            })

        }
        else {

        }
    }

    CalculateTotalPrice() {
        this.setState({
            dummyOrderArray: DummyOrders
        })
        if (DummyOrders.length != 0) {
            this.setState({
                totalPrice: DummyOrders.map(data => data.price).reduce((a, b) => a + b)
            })
            return 1;
        }
        else {
            this.setState({
                totalPrice: 0
            })
            // this.EnableElements();
            return 0;
        }
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }

    // EnableElements = () => {
    //     document.getElementById('dummyBuyer').disabled = false;
    // }

    SclaeTableHeader() {
        try {
            var columnHeaders = document.getElementById("columnHeaders");
            var columnCells = document.getElementById("tableData");
            for (var i = 0; i < columnHeaders.rows[0].cells.length; i++) {
                var col = columnHeaders.rows[0].cells[i];
                console.log(col.offsetWidth)
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
                console.log("New column width: " + columnCells.rows[2].cells[i].width)
            }
        }
        catch (error) { console.log(error) }
    }
    componentDidUpdate() {
        //this.SclaeTableHeader();
    }

}
export default NewOrder;