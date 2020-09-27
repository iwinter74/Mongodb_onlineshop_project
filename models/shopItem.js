const mongoose = require('mongoose')
const { Schema } = mongoose;

const shopItemSchema = new Schema(
    {
    
        'Product-picture-Link': {
            type: String,
            required: true
        },
        'Product-name': {
            type: String,
            required: true
        },
        Company: {
            type: String,
            required: true
        },
        Price: {
            type: String,
            required: true
        },
        'Link-shop': {
            type: String,
            required: false
        },
        Description: {
            type: String,
            required: false
        }

    }, { timestamps: true });
  
const ShopItem = mongoose.model('shopdb', shopItemSchema)
    
module.exports = ShopItem
