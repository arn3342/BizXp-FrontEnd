import React from 'react';
import Pdf from '../../Images/PdfDemo.gif'

export default class PDFDummy extends React.Component{
    render()
    {
        return(
            <div style={{width:'100%'}}>
                <img src={Pdf} style={{width:'800px',height:'900px',marginLeft:'20%'}} />
            </div>
        )
    }
}