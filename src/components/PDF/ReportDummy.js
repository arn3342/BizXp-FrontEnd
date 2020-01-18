import React from 'react';
import Pdf from '../../Images/dashboard.jpg'

export default class PDFDummy extends React.Component{
    render()
    {
        return(
            <div style={{width:'100%'}}>
                <img src={Pdf} style={{width:'1000px',marginLeft:'2%'}} />
            </div>
        )
    }
}