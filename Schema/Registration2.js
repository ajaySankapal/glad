import mongoose from 'mongoose';
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const rgisterSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: Number,
      required: true,
    },
    
    memberId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: { type: String },
     pimage: { type: String },

     

     pimage: {
      type: String,
      enum: ['pimage', 'null', ],
       default: "null",
    },
     //       // default: "user",
    role: {
      type: String,
      enum: ['staff', 'admin', 'seller'],
      // default: "user",
    },

    // miscellaneous: [
    //   {
    //     //name,aadhar,enter bill number,select product,quantity,cash,credit,totalAmount
    //     personName: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //     },
    //     mobile: { type: Number, required: true },

    //     invoiceDetails: {
    //       type: String,
    //       enum: ['In', 'Out'],
    //       // default: "user",
    //     },

    //     billNumber: {
    //       type: String,
    //       unique: true,
          
    //     },

    //     totalAmount: {
    //       type: Number,
    //       required: true,
    //     },
    //     enterDescription: { type: String, required: true },
    //     addAttachment: { type: String },

    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],

    // pimage:{type:String,required:true},
    role: {
        type: String,
         enum: ["user", "admin","staff"],
        default: "user",
      },
  },
  {
    timestamps: true,
  }
)

rgisterSchema.pre('save',async function (next){
 console.log("hii pre");
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
        // this.confrimPassword = await bcrypt.hash(this.password,12)
    }
    next();
})

const Registration2 = mongoose.model('Registration2', rgisterSchema)
export default Registration2;

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
