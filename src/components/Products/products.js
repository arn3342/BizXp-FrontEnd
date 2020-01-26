import React, { Component, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../orders/orders.css'
import '../../App.css'
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import closeIcon from '../../Images/close_icon.png'
import Axios from 'axios';

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
class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dummyOrderArray: [
            ],
            showFinalizeModal: false,
            totalPrice: 0,
            totalDiscountPrice: 0,
            totalDue: 0,
            modalIsOpen: false
        }
    }
    render() {
        return (
            //#region 'Add New Order' component
            <div className="content">

                <div className="row component-header-container">
                    <h2 className="component-header-title">Products</h2>
                </div>

                <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="col-md-3 inline-fields">
                        <input placeholder="Product name" name="name" value={this.state.quantity} className="input-fields"></input>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <select name="category" className="input-fields">
                            <option value="volvo">Select category...</option>
                            <option value="Passenger Car Battery">Car Battery</option>
                            <option value="Optima Battery">AAA Battery</option>
                        </select>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <select name="vendor" className="input-fields">
                            <option value="volvo">Select vendor...</option>
                            {/* below has to be mapped */}
                            <option value="Passenger Car Battery">Rangs</option>
                            <option value="Optima Battery">Rahimafrooz</option>
                        </select>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input placeholder="Unit price(৳)" className="input-fields"></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input placeholder="Description" className="input-fields"></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddNewOrder()}>Add Product</button>
                    </div>
                </div>
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <tbody>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Product Name<img className="sortIcon" /></th>
                                    <th>Category</th>
                                    <th>Vendor<img className="sortIcon" /></th>
                                    <th>Unit price(৳)<img className="sortIcon" /></th>
                                    <th>Description<img className="sortIcon" /></th>
                                </tr>
                            </tbody>
                            <tbody id="dummyTableToAdd">
                                <tr />
                                <tr />
                                {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.buyer}</td>
                                        <td>{order.buyerPhone}</td>
                                        <td>{order.product}</td>
                                        <td>{order.quantity}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
                                    </tr>)
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* table ends here */}
            </div>
            //#endregion
        )
    }

    componentDidMount() {
        //this.state.products
    }

    AddNewOrder = () => {
        Axios.post('https://localhost:44304/api/order/createorder/')
    }
    openModal = () => {

        this.setState({ modalIsOpen: true });
        console.log(this.state.modalIsOpen)
        DummyOrders = [];
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#04be1a';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
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
        setTimeout(this.closeModal, 1300);

        this.setState({
            dummyOrderArray: [],
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
            var discountPercentage = document.getElementById('discountInput').value;
            var discount = this.state.totalPrice - Math.round((this.state.totalPrice / 100) * discountPercentage)

            this.setState({
                totalDiscountPrice: discount
            })
            document.getElementById('discountDiv').classList.remove('hidden-div')
        }
        else {
            document.getElementById('discountDiv').classList.add('hidden-div')
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
            this.EnableElements();
            return 0;
        }
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }

    EnableElements = () => {
        document.getElementById('dummyBuyer').disabled = false;
    }

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
export default Products;