//import supabase from './models/model.js'

const supabase = require('../models/model');

// const itemController = {}; 

exports.getProducts = async(req, res, next) => {
    const { data, error } = await supabase
    .from('product')
    .select('*');

if (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: error.message });
}

res.json(data);

}


//itemController.deleteProducts

// module.exports = {
//     getProducts
// }