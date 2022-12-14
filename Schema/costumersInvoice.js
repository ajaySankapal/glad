import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
     
            //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
            name: {
              type: String,
              required: true,
              trim: true,
            },
            aadharNumber: {
              type: Number,
              required: true,
              unique: true,
            },
            selectProduct: {
              type: Object,
            },
            quantity: { type: Number, required: true },
            billNumber: {
              type: String,
              unique: true,
              required: true,
            },
            totalAmount: {
              type: Number,
              required: true,
            },
            cash: {
              type: Number,
              required: true,
            },
            credit: {
              type: Number,
        
              required: true,
            },
           

          },
          {
            timestamps: true,
           
          },
          
)
      
const Invoice = mongoose.model('Invoice', InvoiceSchema)


export default Invoice;