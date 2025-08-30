const mongoose=require('mongoose');
const menuItems=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
      },
      is_drink: {
        type: Boolean,
        default: false,
      },
      ingredients: {
        type: [String],
        default: [],
      },
      num_sales: {
        type: Number,
        default: 0,
      }
    });
    
const menu=mongoose.model('menu',menuItems);
module.exports=menu;
