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
            dummyStateSet: false,
            totalProducts: DummyOrders.length,
            totalOutOfStock: 0
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
        this.CalculateStock();
    }
    CalculateStock() {
        this.setState({
            totalProducts: DummyOrders.length
        })
    }
    removeOrder(index) {
        DummyOrders.splice(index, 1);
        this.CalculateTotalPrice();
    }
    // CalculateOutOfStock = () => {
    //     var productInState = this.state.dummyOrderArray;
    //     var outOfStockCount = 0;
    //     for(var i = 0; i < productInState.length; i++){
    //         var product = productInState[i];
    //         if(product.quantity === 0){
    //             outOfStockProcuts += 1;
    //         }
    //     }

    //     //const distictProducts = [..new Set[array.mapx => )]
    // }
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
    render() {
        return (
            <div id="content">
                <div className="row component-header-container">
                    <h2 className="component-header-title">Inventory</h2>
                </div>
                <div className="row leftSpace pt-3">
                    <div className="box-Container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3 box-title">Total products</h4>
                        <h4 className="fontBold box-content">{this.state.dummyOrderArray.length}</h4>
                    </div>
                    <div id="outOfStockBtn" className="box-Container col-md-4" style={{ marginLeft: '15px', background: '#ff3b3b' }}>
                        <h4 id="" className="mb-3 box-title">Out of stock</h4>
                        <div className="row">
                            <h4 className="fontBold box-content col-md-3">0</h4>
                            <button className="box-button col-md-8" style={{ color: '#ff3b3b', marginTop: '0' }}>Show products</button>
                        </div>
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