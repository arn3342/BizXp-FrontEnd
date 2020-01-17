import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../orders/orders.css';
import closeIcon from '../../Images/close_icon.png'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Inventory/inventory.css'


var DummyOrders = []
var IsShowingOutOfStock = false;
class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dummyOrderArray: [
                {
                    product:'Optimus Battery',
                    quantity:'2',
                    buyer:'Mr. Kamal',
                    buyerPhone:'016555****',
                    price:'1000'
                },
                {
                    product:'Energy Battery',
                    quantity:'4',
                    buyer:'Mr. Jamal',
                    buyerPhone:'016555****',
                    price:'10000'
                }
            ],
        }
    }

    AddDummyOrder = () => {
        document.getElementById('dummyBuyer').setAttribute('disabled', true);
        var order = {};
        order.product = document.getElementById('dummyProduct').value;
        order.quantity = document.getElementById('dummyQuantity').value;
        order.buyer = document.getElementById('dummyBuyer').value;
        order.buyerPhone = document.getElementById('dummyPhone').value;
        order.price = 10000;

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
    render() {
        return (
            <div id="content">
                <div className="row">
                    <h2 className="mb-4 ml-4">Inventory</h2>
                    <button className="col-md-2 ml-auto btn-Blue"><FontAwesomeIcon icon={faPlus} style={{ fontSize: '14px', marginRight: '8px' }} />Add product</button>
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
                        <select id="dummyProduct" name="products" className="input-fields">
                            <option value="volvo">Select product...</option>
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
                {/* Add Product Section Ends  here*/}


                {/* table starts here */}
                <div className='dataContainer row leftSpace rightSpace' style={{ display: 'inherit', paddingLeft: '0px' }}>
                    <div className="headerContainer" style={{ marginTop: '20px' }}>
                        <table id="columnHeaders" className="table table-hover table-borderless" style={{ marginBottom: '0px', background: '#f1f1f1', userSelect: 'none', borderRadius: '0' }}>
                            <tbody>
                                <tr className="column-container" style={{ paddingTop: '8px' }}>
                                    <th>Buyer Name<img className="sortIcon" /></th>
                                    <th>Buyer Number <img className="sortIcon" /></th>
                                    <th>Product<img className="sortIcon" /></th>
                                    <th>Quantity<img className="sortIcon" /></th>
                                    <th></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id='tableContainer' style={{ overflowX: 'hidden', overflowY: 'auto', position: 'relative' }}>
                        <table id="tableData" className="table table-hover table-borderless">
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