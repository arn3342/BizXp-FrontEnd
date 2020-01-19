import React from 'react';
import { Document, Page, Text,View } from '@react-pdf/renderer';
import * as PdfStyles from './PDFStyle';

export const LabelAndValue = ({ label, value }) => (
    <View style={PdfStyles.labelValueStyles.itemRow}>
        <Text style={PdfStyles.labelValueStyles.itemLabel}>{label}</Text>
        <Text style={PdfStyles.labelValueStyles.itemDivider}>:  </Text>
        <Text style={PdfStyles.labelValueStyles.itemContent}>{value}</Text>
    </View>
);


const OrderReport = () => (
    <Document>
        <Page>
        <View style={{marginTop:'30px'}}>
           <Text style={{marginLeft:'180px',magrinTop:'100px'}}>BizXP Product Order Report</Text>
        </View>  
            <View style={PdfStyles.commonStyles.centerDiv}>
                <LabelAndValue label={'Order Date'} value={"18-1-2020"} />
                <LabelAndValue label={'Buyer Name'} value={'Kamrul Hasam'} />
                <LabelAndValue label={'Buyer Number'} value={'01611416466'} />
                <LabelAndValue label={'Product'} value={'Optima Battery(5)'} />
                <LabelAndValue label={''} value={'Maxima Battery(2)'} />
                <LabelAndValue label={'Paid'} value={'20,000 Tk'} />
                <LabelAndValue label={'Due'} value={'5000 Tk'} />
            </View >
        </Page>
    </Document>
)

export default OrderReport;