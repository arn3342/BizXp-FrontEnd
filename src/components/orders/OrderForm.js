import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../orders/orders.css'

var DummyOrders = []

class OrderForm extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            dummyOrderArray: [],
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
    render() {
        return (<div>
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
        </div>)
    }
}

export default OrderForm;