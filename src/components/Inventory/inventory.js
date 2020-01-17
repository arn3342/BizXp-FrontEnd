import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../orders/orders.css';
import closeIcon from '../../Images/close_icon.png'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Inventory/inventory.css'
import '../orders/orders.css'
import moment from 'moment';

var DummyOrders = [
    {
        productName: 'Maxima Battery',
        quantity: '500',
        buyingPrice: '3000',
        SellingPrice: '4000',
        StockAddeed: '1-17-2020'
    },
    {
        productName: 'Passenger Battery',
        quantity: '100',
        buyingPrice: '4000',
        SellingPrice: '6000',
        StockAddeed: '1-17-2020'
    },
    {
        productName: 'Maxima Battery',
        quantity: '200',
        buyingPrice: '2000',
        SellingPrice: '3500',
        StockAddeed: '1-17-2020'
    }

]
var IsShowingOutOfStock = false;
class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyOrderArray: DummyOrders,
            dummyStateSet: false
        }
    }

    AddDummyOrder = () => {
        var order = {};
        order.productName = document.getElementById('dummyName').value;
        order.quantity = document.getElementById('dummyQuantity').value;
        order.buyingPrice = document.getElementById('dummyBuyer').value;
        order.SellingPrice = document.getElementById('dummyPhone').value;
        order.StockAddeed = moment(new Date()).format("MM-DD-YYYY")


        DummyOrders.push(order);
        this.CalculateTotalPrice();
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
    removeOrder(index) {
        DummyOrders.splice(index, 1);
        this.CalculateTotalPrice();
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
                console.log("Header Column Width:" + col.offsetWidth)
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
                console.log("Row column width: " + columnCells.rows[2].cells[i].width)
            }
        }
        catch (error) { console.log(error) }
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }

    addDummyProduct() {
        if (!this.state.dummyStateSet) {
            var dummyArray = []
            var dummyProduct = {
                productName: 'Maxima Battery',
                quantity: '500',
                buyingPrice: '3000',
                SellingPrice: '4000',
                StockAddeed: '17.1.2020'
            }
            dummyArray.push(dummyProduct)
            this.setState({
                dummyOrderArray: dummyArray,
                dummyStateSet: true
            })
        }
    }
    render() {
        return (
            <div id="content">
                <div className="row">
                    <h2 className="mb-4 ml-4" onClick={() => this.addDummyProduct()}>Inventory</h2>
                </div>
                <div className="row">
                    <div className="boxContainer col-md-4 ml-4">
                        <h4 className="mb-3">Total products</h4>
                        <h4 className="fontBold">500</h4>
                    </div>
                    <div id="outOfStockBtn" className="boxContainer hoverShadow col-md-4" onClick={() => ShowOutOfStock()} style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3">Out of stock</h4>
                        <h4 className="fontBold">500</h4>
                    </div>
                </div>

                {/* Add Product Section Starts here*/}
                <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="col-md-4 inline-fields">
                        <input id="dummyName" placeholder="Product Name" className="input-fields"></input>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <input id="dummyQuantity" placeholder="Quantity" className="input-fields"></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input id="dummyBuyer" placeholder="Buying Price" className="input-fields"></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input id="dummyPhone" placeholder="Selling Price" className="input-fields"></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddDummyOrder()}>Add</button>
                    </div>
                </div>
                {/* Add Product Section Ends  here*/}


                {/* table starts here */}
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <tbody>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Product Name<img className="sortIcon" /></th>
                                    <th>Quantity <img className="sortIcon" /></th>
                                    <th>Buying Price(per unit)<img className="sortIcon" /></th>
                                    <th>Selling Price(per unit)<img className="sortIcon" /></th>
                                    <th>Stock Added</th>
                                    <th></th>
                                </tr>
                            </tbody>
                            <tbody id="tableData">
                                <tr />
                                <tr />
                                {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.productName}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.buyingPrice}</td>
                                        <td>{order.SellingPrice}</td>
                                        <td>{order.StockAddeed}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
                                    </tr>)
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                        <table id="tableData" className="table table-hover table-borderless">
                            {/* <tbody id="tableData">
                                <tr />
                                <tr />
                                {this.state.dummyOrderArray && (this.state.dummyOrderArray.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.productName}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.buyingPrice}</td>
                                        <td>{order.SellingPrice}</td>
                                        <td>{order.StockAddeed}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
                                    </tr>)
                                ))}
                            </tbody> */}
                        </table>
                    </div>
                    {/* table ends here */}
                </div >
            </div>
        )
    }
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
export default Inventory;