import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Inventory/inventory.css'

var IsShowingOutOfStock = false;
function Inventory() {
    return (
        <div id="content">
            <div className="row">
                <h2 className="mb-4">Inventory</h2>
                <button className="col-md-2 ml-auto btn-Blue"><FontAwesomeIcon icon={faPlus} style={{fontSize:'14px', marginRight: '8px'}}/>Add product</button>
            </div>
            <div className="row">
                <div className="boxContainer col-md-4">
                    <h4 className="mb-3">Total products</h4>
                    <h4 className="fontBold">500</h4>
                </div>
                <div id="outOfStockBtn" className="boxContainer hoverShadow col-md-4" onClick={()=> ShowOutOfStock()} style={{ marginLeft: '15px' }}>
                    <h4 id="" className="mb-3">Out of stock</h4>
                    <h4 className="fontBold">500</h4>
                </div>
            </div>
        </div>
    )
}

function ShowOutOfStock(){
    var outOfStockBtn = document.getElementById('outOfStockBtn');
    if(!IsShowingOutOfStock){
        IsShowingOutOfStock = true;
        outOfStockBtn.classList.add('outOfStockBtn-Selected');
    }
    else{
        IsShowingOutOfStock = false;
        outOfStockBtn.classList.remove('outOfStockBtn-Selected');
    }
}
export default Inventory;