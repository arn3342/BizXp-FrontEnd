import React from 'react';
import { connect } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../orders/orders.css';
import closeIcon from '../../Images/close_icon.png'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Inventory/inventory.css'
import '../orders/orders.css'
import moment from 'moment';

import { addProduct } from '../../actions/inventoryActions';
import Axios from 'axios';

var IsShowingOutOfStock = false;
class Shops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            myshop: {
                productName: "",
                productQuantity: "",
                productBuyingPrice: "",
                productSellingPrice: "",
                dummyStateSet: false,
                totalOutOfStock: 0
                
              }
        }
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
                // console.log("Header Column Width:" + col.offsetWidth)
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
                // console.log("Row column width: " + columnCells.rows[2].cells[i].width)
            }
        }
        catch (error) { console.log(error) }
    }
    componentDidMount(){
        this.getAllProductsOfStore(this.state.User_Id, this.state.Shop_id);
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }
    render() {
        return (
            <div id="content">
                <div className="row component-header-container">
                    <h2 className="component-header-title">My shops</h2>
                </div>
                <div className="row leftSpace pt-3">
                    <div className="box-Container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3 box-title">In stock</h4>
                        <h4 className="fontBold box-content">0</h4>
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
                    <select name="category" className="input-fields">
                            <option value="volvo">Select product...</option>
                            <option value="Passenger Car Battery">Maxima Battery</option>
                            <option value="Optima Battery">Passenger Car Battery</option>
                        </select>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <input onChange={(e) => this.onCHange(e)} placeholder="Quantity" className="input-fields" name="productQuantity" value={this.state.productQuantity}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input onChange={(e) => this.onCHange(e)} placeholder="Total Buying Price(৳)" className="input-fields" name="productBuyingPrice" value={this.state.productBuyingPrice}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input onChange={(e) => this.onCHange(e)} placeholder="Unit Price(৳)" className="input-fields" name="productSellingPrice" value={this.state.productSellingPrice}></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddNewProduct()}>Add stock</button>
                    </div>
                </div>
                {/* Add Product Section Ends  here*/}


                {/* table starts here */}
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        {/* <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <tbody>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Product<img className="sortIcon" /></th>
                                    <th>Quantity <img className="sortIcon" /></th>
                                    <th>Toptal buying price(৳)<img className="sortIcon" /></th>
                                    <th>Unit price(৳)<img className="sortIcon" /></th>
                                    <th>Stock Added</th>
                                    <th></th>
                                </tr>
                            </tbody>
                            <tbody id="tableData">
                                <tr />
                                <tr />
                                {this.state.productList && (this.state.productList.map((order, index) =>
                                    (<tr className="table-warning">
                                        <td>{order.Name}</td>
                                        <td>{order.Quantity}</td>
                                        <td>{order.Unit_price}</td>
                                        <td>{order.SellingPrice}</td>
                                        <td>{order.StockAddeed}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
                                    </tr>)
                                ))}
                            </tbody>
                        </table> */}
                    </div>
                    {/* table ends here */}
                </div >
            </div>
        )
    }
    onCHange(e){
        this.setState({
            [e.target.name] : [e.target.value]
        })
    }

    getAllProductsOfStore(userId,shopId){
        Axios.get('https://localhost:44304/api/Product/GetAllProductsOfStore?userId=' + userId+'&shopId=' + shopId)
        .then(res => {
          const productList = res.data;
          this.setState({ productList });
        })
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

const mapStateToProps = state => ({
    products: state.inventoryReducer.products,
    isSuccess: state.inventoryReducer.isSuccess,
})

export default connect(mapStateToProps, { addProduct })(Shops);