import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../orders/orders.css'
import '../../App.css'
var IsShowingOutOfStock = false;

var DummyOrders = []
class FinalizeOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dummyOrderArray: []
        }
    }
    render() {
        return (
            <div className="content">
                <div className='row field-container div-shadow leftSpace rightSpace' style={{ display: 'inherit' }}>
                    
                </div>
            </div>
        )
    }
}
export default FinalizeOrder;