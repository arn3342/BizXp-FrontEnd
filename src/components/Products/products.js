import React, { Component, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Products/products.css'
import '../../App.css'
import NumberFormat from 'react-number-format';
import Modal from 'react-modal';
import closeIcon from '../../Images/close_icon.png'
import Axios from 'axios';
import moment from 'moment';
import { API_FOR_PROD, API_FOR_DEV } from '../../conString';

var AllProducts = []
var newProduct = {
    name: '',
    productCategory_Id: 0,
    vendor_id: 0,
    unit_price: 0,
    overView: ''
}
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
            productArray: [],
            newProduct: {},
            Shop_id: 1,
            User_Id: 1,
            Vendor_id: 1,
            modalIsOpen: false
        }
    }
    render() {
        return (
            //#region 'Add New Product' component
            <div className="content">

                <div className="row component-header-container">
                    <h2 className="component-header-title">Products</h2>
                </div>

                <div id="addProductFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="col-md-3 inline-fields">
                        <input placeholder="Product name" name="name" onChange={(e) => this.onChange(e)} className="input-fields"></input>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <select name="category" className="input-fields" name="productCategory_Id" onChange={(e) => this.onChange(e)}>
                            <option value="">Select category...</option>
                            <option value="1">Car Battery</option>
                            <option value="2">AAA Battery</option>
                        </select>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <select name="vendor" className="input-fields" name="vendor_id" onChange={(e) => this.onChange(e)}>
                            <option value="">Select vendor...</option>
                            {/* below has to be mapped */}
                            <option value="1">Rangs</option>
                            <option value="2">Rahimafrooz</option>
                        </select>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input placeholder="Unit price(৳)" className="input-fields" name="unit_price" onChange={(e) => this.onChange(e)}></input>
                    </div>
                    <div className="col-md-4 inline-fields">
                        <input placeholder="Description" className="input-fields" name="overView" onChange={(e) => this.onChange(e)}></input>
                    </div>
                    <div className='col-md-2 inline-fields' style={{ float: 'right' }}>
                        <button className="btn-Blue btn-full-width" onClick={() => this.AddNewProduct()}>Add Product</button>
                    </div>
                </div>
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-bProductless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', bProductRadius: '0' }}>
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
                                {this.state.productArray && (this.state.productArray.map((Product, index) =>
                                    (<tr className="table-warning">
                                        <td>{Product.name}</td>
                                        <td>{Product.productCategory_Id}</td>
                                        <td>{Product.vendor_id}</td>
                                        <td>{Product.unit_price}</td>
                                        <td>{Product.overView}</td>
                                        <td onClick={() => this.removeProduct(index)} style={{ cursor: 'pointer' }}><img style={{ width: '20px' }} src={closeIcon}></img></td>
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

    async AddNewProduct() {
        var newProduct = this.state.newProduct;
        newProduct.Shop_id = this.state.Shop_id
        newProduct.User_Id = this.state.User_Id
        newProduct.Created_date = moment(new Date()).format('MM-DD-YYYY')
        newProduct.is_delete = false
        newProduct.Expire_date = moment(new Date()).format('MM-DD-YYYY')
        console.log(newProduct)
        try {
            const response = await Axios.post( API_FOR_PROD + '/Product/CreateProduct/', newProduct);
            var allProducts = this.state.productArray;
            allProducts.push(newProduct);
            this.setState({
                productArray: allProducts
            })
            console.log(response)
        }
        catch (exception) {
            console.log(exception)
        }
    }
    async GetAllProductsOfShop(){
        try{
            const response = await Axios.get( API_FOR_PROD + '/Product/GetProductsByV_S_Id?shopId=' + this.state.Shop_id)
            this.setState({
                productArray: response.data
            })
            console.log(this.state.productArray)
        }
        catch(e){

        }
    }

    componentDidMount(){
        this.GetAllProductsOfShop();
    }
    onChange(e) {
        newProduct[e.target.name] = e.target.value
        this.setState({
            newProduct: newProduct
        })
    }
    removeProduct(index) {
        AllProducts.splice(index, 1);
        this.CalculateTotalPrice();
    }
}
export default Products;