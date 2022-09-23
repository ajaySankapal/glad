import mongoose from 'mongoose'
// import  bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"

const Schema = new mongoose.Schema({
    phonenumber:{
        type: Number,
        required:true
    },

    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
   

    pimage:{type:String},
    role: {
        type: String,
         enum: ["staff", "admin","seller"],
        // default: "user",
      },

      costumersInvoice:[

       
        {
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
            createdAt:{
                type: Number,
          
                required: true,
              },
              updatedAt: {
                type: Number,
          
                required: true,
              },
              
createdAt : { type : Date, default: Date.now }
          },
          {
            timestamps: true,
           
          },
          

      ]
    // pimage:{type:String,required:true},
    // role: {
    //     type: String,
    //      enum: ["user", "admin"],
    //     default: "user",
    //   },
  
 
},
{
    timestamps: true,
   
  },

)

// Schema.pre('save',async function (next){
//  console.log("hii pre");
//     if (this.isModified('password')){
//         this.password = await bcrypt.hash(this.password,12)
//         this.confrimPassword = await bcrypt.hash(this.password,12)
//     }
//     next();
// })





const Registration = mongoose.model('Registration', Schema)


export default Registration;


// import mongoose from "mongoose"

// const Schema = new mongoose.Schema({
//     name:{type:String, required:true},
//     email:{type:String,required:true},
//     password:{type:String,required:true},
//     cpassword:{type:String,required:true},
//     mobile:{type:String,required:true},
//     work:{type:String},
    
  
  

// })


// const Registration = mongoose.model('Registration',Schema);


//  export default Registration;
