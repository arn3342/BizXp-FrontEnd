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
import dummyShopPic from '../../Images/dummyShop.jpg'
import { addProduct } from '../../actions/inventoryActions';
import Axios from 'axios';

var IsShowingOutOfStock = false;
class Shops extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myshop: {
                productName: "",
                productQuantity: "",
                productBuyingPrice: "",
                productSellingPrice: "",
                dummyStateSet: false,
                totalOutOfStock: 0
            },
            ownerId: Number = 1
        }
    }
    componentDidMount() {
        this.getShopDetails(this.state.ownerId);
    }
    componentDidUpdate() {
        this.SclaeTableHeader();
    }

    getShopDetails(ownerId) {
        const response = Axios.get('https://localhost:5001/api/ShopDetail/GetShopDetails?owner_Id=' + ownerId)
        console.log(response);
    }

    render() {
        return (
            <div id="content">
                <div className="row component-header-container">
                    <h2 className="component-header-title">My shops</h2>
                </div>
                <div id="addOrderFieldsContainer" className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    <div className="row leftSpace">
                        <h1>Rangs Traders Bd</h1>
                    </div>
                    <div className="col-md-3 inline-fields">
                        <img className="shopImage" style={{ width: '100%', borderRadius: '15px' }} src={dummyShopPic}></img>
                    </div>
                    <div className="col-md-8 inline-fields leftSpace">
                        <div className="col-md-12">
                            <h4>1/3, Mirpu DOHS Colony
                            <br />
                                Mirpur-2
                            <br />
                                Dhaka
                            <br />
                            </h4>
                        </div>

                    </div>
                  
                </div>
            </div>
        )
    }
    onCHange(e) {
        this.setState({
            [e.target.name]: [e.target.value]
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