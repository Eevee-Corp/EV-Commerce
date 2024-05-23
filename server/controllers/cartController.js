const supabase = require('../models/model');

exports.getCart = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    // Fetch the cart for the user
    const { data: cartData, error: cartError } = await supabase
      .from('cart')
      .select('cartid')
      .eq('userid', userId)
      .single();

    if (cartError) {
      return res.status(500).json({ error: cartError.message });
    }

    if (!cartData) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartId = cartData.cartid;

    // Fetch the cart items for the cart ID
    const { data: items, error: itemsError } = await supabase
      .from('cartitems')
      .select(`
      product_id,
      quantity,
      added_at,
      product (
        productname,
        price
      )
      `)
      // .select('product_id', 'quantity', 'added_at', 'productname', 'price')
      .eq('cart_id', cartId)
      
      // const { data, error } = await supabase.rpc('sql', {
      //   sql: `
      //     SELECT ci.product_id, ci.quantity, ci.added_at, p.price, p.productname
      //     FROM cartitems ci
      //     LEFT OUTER JOIN product p ON ci.product_id = p.productid
      //     WHERE ci.cart_id = $1;
      //   `,
      //   params: [cartId],
      // });

    if (itemsError) {
      return res.status(500).json({ error: itemsError.message });
    }

    const count = items.reduce((total, item) => total + item.quantity, 0);

    req.cart = { count, items };
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};