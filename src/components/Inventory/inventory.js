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
class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // product: {
            //     productId: '',
            //     quantity: '',
            //     totalBuyingPrice: '',
            //     unitPrice: '',
            //     createdDate: '',
            // },
            productId: '',
            quantity: '',
            totalBuyingPrice: '',
            unitPrice: '',
            createdDate: new Date(),
            Shop_id: 1,
            User_Id: 1,
            products: []
        }        
        // this.CalculateUnitPrice = this.CalculateUnitPrice.bind(this);
    }

    CalculateStock() {
        this.setState({
            totalProducts: this.state.products.length
        })
    }
    removeOrder(index) {
        let {products} = this.state;
        products.splice(index, 1);
        this.setState({
            products
        })
        // this.CalculateTotalPrice();
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
    componentDidMount() {
        this.GetInventory();
    }
    render() {
        let { product, products } = this.state;        
        return (
            <div id="content">
                <div className="row component-header-container">
                    <h2 className="component-header-title">Inventory</h2>
                </div>
                <div className="row leftSpace pt-3">
                    <div className="box-Container col-md-3" style={{ marginLeft: '15px' }}>
                        <h4 id="" className="mb-3 box-title">In stock</h4>
                        <h4 className="fontBold box-content">{this.state.products.length}</h4>
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
                        <select onChange={(e) => this.onChange(e)} value={this.state.productId} name="productId" className="input-fields">
                            <option value="-1">Select product...</option>
                            {this.state.productArray && this.state.productArray.map((product) =>
                                <option value={product.productCategory_Id}>{product.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <input onChange={(e) => this.onChange(e)} placeholder="Quantity" className="input-fields" name="quantity" value={this.state.quantity}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input onChange={(e) => this.onChange(e)} placeholder="Total Buying Price(৳)" className="input-fields" name="totalBuyingPrice" value={this.state.totalBuyingPrice}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input onChange={(e) => this.onChange(e)} disabled placeholder="Unit Buying Price(৳)" className="input-fields" name="unitPrice" value={this.state.unitPrice}></input>
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
                                {products && (products.map((item, index) =>
                                    (<tr className="table-warning">
                                        <td>{item.productId}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.totalBuyingPrice}</td>
                                        <td>{item.unitPrice}</td>
                                        <td>{moment(item.createdDate).format('MM-DD-YYYY')}</td>
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
        });
        if(e.target.name === 'totalBuyingPrice'){
            this.calculateUnitPrice(e.target.value)
        }
    }

    calculateUnitPrice(totalPrice){
    let unitPrice = (totalPrice / this.state.quantity).toFixed(2)
    this.setState({unitPrice})
    }

    // onChange(e) {
    //     let {product} = this.state;
    //     this.setState({
    //         product:{
    //             [e.target.name]: e.target.value 
    //         }
    //     })
    //     // this.setState(Object.assign(product, { [e.target.name]: e.target.value }))
    //     if(e.target.name === 'totalBuyingPrice'){
    //         this.CalculateUnitPrice(e.target.value);
    //     }       
    // }
    
    // CalculateUnitPrice(totalPrice){
    //     let { product } = this.state;
    //     console.log("total",product.totalBuyingPrice);
    //     console.log("quantity",product.quantity);
    //     let unitPrice = (totalPrice / product.quantity).toFixed(2)
    //     this.setState(Object.assign(product, { unitPrice: unitPrice }));
    //     console.log(unitPrice)
    //     // if(e.target.value && e.target.value != 0 && e.target.value != ''){
    //     //     this.setState(Object.assign(product, { unitPrice: unitPrice }));
    //     // }
    // }

    AddNewProduct(){
        let {products,productId,quantity,totalBuyingPrice,unitPrice,createdDate,Shop_id,User_Id} = this.state;
        let product = {
            productId: productId,
            quantity: quantity.toString(),
            totalBuyingPrice: totalBuyingPrice,
            unitPrice: unitPrice,
            createdDate: new Date(),
            Shop_id: Shop_id,
            User_Id: User_Id,
        }
        products.push(product);
        let purchaseProductData = {
            Purchase_Id : 0,
            Product_Id :2,
            Quantity : quantity.toString(),
            Total_price : totalBuyingPrice.toString(),
            Unit_price : unitPrice,
            User_id : User_Id,
            Vendor_id : 0,
            Shop_id : Shop_id,
            Created_date : createdDate,
            Is_delete : false
        }
        console.log(purchaseProductData)
        // this.props.addProduct();
        try {
            const response = Axios.post('https://localhost:44304/api/ProductPurchase/CreateProductPurchase', purchaseProductData);
            console.log(response);
            this.setState({
                productId: '',
                quantity: '',
                totalBuyingPrice: '',
                unitPrice: '',
                createdDate: '',
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    async GetInventory() {
        let {products} = this.state;
        try {            
            const inventoryResponse = await Axios.get('https://localhost:44304/api/productpurchase/GetProductPurchaseByUserIdandShopId?userId=' + this.state.User_Id + '&shopId=' + this.state.Shop_id)
            var inventory = inventoryResponse.data;
            for(var i = 0; i < inventory.length; i++){
                var inventoryItem = inventory[i]
                const productResponse =  await Axios.get('https://localhost:44304/api/product/GetProductById?id=' + inventoryItem.product_Id);
                var product = productResponse.data;

                inventoryItem.productName = product.name
                console.log('Inventory Item', inventoryItem)
                products.push(inventoryItem);
            }
            
            this.setState({
                products: products
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