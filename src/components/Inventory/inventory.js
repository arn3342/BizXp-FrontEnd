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

var inventoryArray = []
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
            inventoryArray: [],
            product: {
                productName: "",
                productQuantity: "",
                productBuyingPrice: "",
                productSellingPrice: "",
                dummyStateSet: false,
                totalProducts: DummyOrders.length,
                totalOutOfStock: 0

            },
            dummyOrderArray: DummyOrders,
            productArray: [],
            Shop_id: 1,
            User_Id: 1,
            productId: '',
            productName: '',
            productQuantity: '',
            productBuyingPrice: '',
            productUnitPrice: '',
            dummyStateSet: false,
            totalProducts: DummyOrders.length,
            totalOutOfStock: 0
        }
    }

    // AddDummyOrder = () => {
    //     var order = {};
    //     order.productName = document.getElementById('dummyName').value;
    //     order.quantity = document.getElementById('dummyQuantity').value;
    //     order.buyingPrice = document.getElementById('dummyBuyer').value;
    //     order.SellingPrice = document.getElementById('dummyPhone').value;
    //     order.StockAddeed = moment(new Date()).format("MM-DD-YYYY")


    //     DummyOrders.push(order);
    //     this.CalculateStock();
    // }
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
                // console.log("Header Column Width:" + col.offsetWidth)
                columnCells.rows[2].cells[i].width = col.offsetWidth + "px"
                // console.log("Row column width: " + columnCells.rows[2].cells[i].width)
            }
        }
        catch (error) { console.log(error) }
    }
    componentDidMount() {
        this.GetInventory();
    }
    render() {
        return (
            <div id="content">
                <div className="row component-header-container">
                    <h2 className="component-header-title">Inventory</h2>
                </div>
                <div className="row leftSpace pt-3">
                    <div className="box-Container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3 box-title">In stock</h4>
                        <h4 className="fontBold box-content">{this.state.inventoryArray.length}</h4>
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
                        <select onChange={(e) => this.onChange(e)} value={this.state.productId} name="category" className="input-fields">
                            <option value="volvo">Select product...</option>
                            {this.state.productArray && this.state.productArray.map((product) =>
                                <option value={product.productCategory_Id}>{product.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <input onChange={(e) => this.onChange(e)} placeholder="Quantity" className="input-fields" name="productQuantity" value={this.state.productQuantity}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input onChange={(e) => { this.CalculateUnitPrice(e); this.onChange(e)}} placeholder="Total Buying Price(৳)" className="input-fields" name="productBuyingPrice" value={this.state.productBuyingPrice}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input onChange={(e) => this.onChange(e)} placeholder="Unit Buying Price(৳)" className="input-fields" name="productSellingPrice" value={this.state.productUnitPrice}></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddNewProduct()}>Add stock</button>
                    </div>
                </div>
                {/* Add Product Section Ends  here*/}


                {/* table starts here */}
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
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
                                {this.state.inventoryArray && (this.state.inventoryArray.map((inventoryItem, index) =>
                                    (<tr className="table-warning">
                                        <td>{inventoryItem.productName}</td>
                                        <td>{inventoryItem.quantity}</td>
                                        <td>{inventoryItem.total_price}</td>
                                        <td>{inventoryItem.unit_price}</td>
                                        <td>{moment(inventoryItem.created_date).format('MM-DD-YYYY')}</td>
                                        <td onClick={() => this.removeOrder(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
                                    </tr>)
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* table ends here */}
                </div >
            </div>
        )
    }
    onChange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
    CalculateUnitPrice(e){
        if(e.target.value && e.target.value != 0 && e.target.value != ''){
            this.setState({
                productUnitPrice: (e.target.value / this.state.productQuantity).toFixed(2)
            })
        }
    }

    AddNewProduct(){
        let purchaseProductData = {
            Purchase_Id : 0,
            Product_Id : this.state.productId,
            Quantity : this.state.productQuantity,
            Total_price : this.state.total_price,
            Unit_price : 0,
            User_id : 0,
            Vendor_id : 0,
            Shop_id : 0,
            Created_date : new Date(),
            Is_delete : false
        }
        console.log(purchaseProductData)
        this.props.addProduct(purchaseProductData);
        // try {
        //     const response = Axios.post('https://localhost:5001/api/ProductPurchase/CreateProductPurchase',purchaseProductData);
        //     console.log(response);
        // }
        // catch (e) {

        // }
    }
    async GetInventory() {
        try {
            
            const inventoryResponse = await Axios.get('https://localhost:44304/api/productpurchase/GetProductPurchaseByUserIdandShopId?userId=' + this.state.User_Id + '&shopId=' + this.state.Shop_id)
            var inventory = inventoryResponse.data;
            for(var i = 0; i < inventory.length; i++){
                var inventoryItem = inventory[i]
                const productResponse =  await Axios.get('https://localhost:44304/api/product/GetProductById?id=' + inventoryItem.product_Id);
                var product = productResponse.data;

                inventoryItem.productName = product.name
                console.log('Inventory Item', inventoryItem)
                inventoryArray.push(inventoryItem);
            }
            
            this.setState({
                inventoryArray: inventoryArray
            })
        }
        catch (e) {

        }
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

export default connect(mapStateToProps, { addProduct })(Inventory);