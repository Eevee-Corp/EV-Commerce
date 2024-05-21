const supabase = require('../models/model');

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

// exports.deleteProducts = async (req, res, next) => {
//   const { id } 
// }

// module.exports = {
//     addProducts
// }