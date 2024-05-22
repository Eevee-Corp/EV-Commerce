const supabase = require('../models/model');

exports.getProducts = async(req, res, next) => {
    const { productname, price, totalinventory } = req.body;
    const { data, error } = await supabase
    .from('product')
    .select('*');

if (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: error.message });
}

res.json(data);

}

exports.addProducts = async (req, res, next) => {
  try {
    const { productid, productname, price, totalinventory } = req.body;

    // Check if the product already exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('product')
      .select('productid')
      .eq('productid', productid);

    if (fetchError) {
      console.error('Error checking existing product:', fetchError);
      return next({ error: fetchError.message });
    }

    if (existingProduct && existingProduct.length > 0) {
      return res.status(409).json({ message: 'Product with this ID already exists' });
    }

    // Proceed to insert the new product
    const { data, error } = await supabase
      .from('product')
      .insert({
        productid,
        productname,
        price,
        totalinventory,
      });

    if (error) {
      console.error('Supabase error:', error);
      return next({ error: error.message });
    }

    res.locals.addItem = { message: 'Added Product Successfully' };
    return next();
  } catch (error) {
    console.error('Error adding product:', error);
    return next({ error: error.message });
  }
};


exports.deleteProducts = async (req, res, next) => {
  const productId = req.params.id; // Ensure this matches your route parameter ':id'

  try {

    // Check if the product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('product')
      .select('*')
      .eq('productid', productId)

    if (fetchError) {
      throw fetchError; // Handle the fetch error properly
    }

    if (!existingProduct || existingProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Proceed to delete the product
    const { data, error } = await supabase
      .from('product')
      .delete()
      .eq('productid', productId)

    if (error) {
      throw error; // Handle the delete error properly
    }

    res.locals.deleteItem = { message: 'Product deleted successfully' };
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateProducts = async (req, res, next) => {
  const productId = req.params.id;
  const newProductData = req.body; // Get the new data from the request body

  try {
    // Check if the product exists
    const { data: existingProduct, error: fetchError } = await supabase
      .from('product')
      .select('*')
      .eq('productid', productId);

    if (fetchError) {
      throw fetchError;
    }

    if (!existingProduct || existingProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Proceed to update the product
    const { data, error } = await supabase
      .from('product')
      .update(newProductData)
      .eq('productid', productId); // Ensure the correct column is used

    if (error) {
      throw error;
    }

    res.locals.updateItem = {
      message: 'Product updated successfully'
    };
    return next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: error.message });
  }
};

