const supabase = require('../models/model');

exports.getProducts = async(req, res, next) => {
    console.log("This is get products")
    const { productname, price, totalinventory } = req.body;
    console.log(req.body)

    const { data, error } = await supabase
    .from('product')
    .select('*');

if (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: error.message });
}

res.json(data);

}

console.log("hi tere")

// exports.addProducts = async (req, res, next) => {
//     console.log('adding a product...')
//     // grab properties from request body
//     const { productname, price, quantity } = req.body;
  
//     // insert into favorites DB for that user
//     const { data, error } = await supabase
//     .from('user_flights')
//     .insert({
//      productname,
//      price, 
//      quantity
//     })
//     // .select();
    
//     if (error) {
//       console.log(error);
//       return next({
//         log: 'problem in addUserFlight controller',
//         message: {err: error}
//       })
//     }
    
//     res.locals.flight = data[0];
    
//     return next();
//   }


  //this is from dylan's file 

exports.addProducts = async (req, res, next) => {
  console.log('This is addProducts')
  try {
    const { productid, productname, price, totalinventory } = req.body;
    console.log(req.body)

    const { data, error } = await supabase
    .from('product')
    .insert({
        productid,
        productname,
        price,
        totalinventory,
    })
    return next();
  }
  catch (error) {
    console.error('Error fetching products:', error);
    return next({ error: error.message });
  }
}

exports.deleteProducts = async (req, res, next) => {
    console.log(req.params); // Log the request parameters
    const productId = req.params.id; // Ensure this matches your route parameter ':id'
  
    try {
      console.log('Entering try block for deleteProducts...');
      const { data, error } = await supabase
        .from('product')
        .delete()
        .eq('productid', productId); // Ensure 'productid' is the correct column name in your Supabase table
  
      if (error) {
        throw error; // Handle the error properly
      }
  
      console.log('Delete successful:', data);
      if (data.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.locals.deleteItem = { message: 'Product deleted successfully', data };
      next(); // Proceed to the next middleware
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: error.message });
    }
  };

exports.updateProducts = async (req, res, next) => {
    const newProductData = req.body;
    const productId = req.params.id;

    const { data, error } = await supabase
      .from('product')
      .update(newProductData)
      .eq('id', productId);
      return next()
    if (error) {
      console.error('Error updating product:', error);
      return next({ error: error.message });
    }
    res.locals.updatedProduct = data;
    return next();
  };