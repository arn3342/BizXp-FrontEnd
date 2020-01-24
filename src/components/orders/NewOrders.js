import React, { Component, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../orders/orders.css'
import '../../App.css'
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import closeIcon from '../../Images/close_icon.png'

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
            modalIsOpen: false
        }
    }
    render() {
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
                    <h2 ref={subtitle => this.subtitle = subtitle}>Success</h2>
                    <div><h4>New order added successfully</h4></div>
                </Modal>

                {/* Modal ends here */}

                <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="col-md-4 inline-fields">
                        <select id="dummyProduct" name="products" className="input-fields">
                            <option value="volvo">Select product...</option>
                            {/* below has to be mapped */}
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

                <div id="finalizeOrderContainer" className="bottom-div div-shadow">
                    {/* <div className='col-md-2 inline-fields' style={{ float: 'right' }}> */}
                    <div className="col-sm-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <label id="dummyQuantity" className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Total price: <b style={{ fontSize: '18px' }}><NumberFormat id="totalSellingPrice" value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <div id="discountDiv" className="col-sm-2 inline-fields hidden-div" style={{ marginRight: '20px', float: 'left' }}>
                        <label id="dummyQuantity" className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Discount price: <b style={{ fontSize: '18px' }}><NumberFormat id="totalDiscountPrice" value={this.state.totalDiscountPrice} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <div className="col-md-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <input id="discountInput" placeholder="Discount" className="input-fields" onChange={(e) => this.CalculateDiscount(e)}></input>
                    </div>
                    <div className="col-md-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <input id="dummyQuantity" placeholder="Paid amount" className="input-fields" onChange={(e) => this.CalculateDue(e)}></input>
                    </div>
                    <div className="col-sm-2 inline-fields" style={{ marginRight: '20px', float: 'left' }}>
                        <label id="dummyQuantity" className="input-fields" style={{ border: 'none', textAlign: 'left' }}>Due: <b style={{ fontSize: '18px' }}><NumberFormat id="totalDiscountPrice" value={this.state.totalDue} displayType={'text'} thousandSeparator={true} prefix={'৳'} /></b></label>
                    </div>
                    <button className="btn-Blue-active rightSpace" onClick={() => this.ConfirmOrder()} style={{ width: '150px' }}>Finalize</button>
                    {/* </div> */}
                </div>

            </div>
            //#endregion
        )
    }

    componentDidMount(){
        //this.state.products
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
export default NewOrder;