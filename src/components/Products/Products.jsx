import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../src/redux/productSlice';


const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // hard coded test
  // let status = 'succeeded';
  // let products = [{id: 1, name: 'shoes', price: 100}, {id: 2, name: 'tree', price: 200}];
  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product) => (
          <li key={product.productid} style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', maxWidth: '1000px',  marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'serif', margin: '40px', fontSize: '20px' }}>
                <h3>{product.productname}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.totalinventory}</p>
              </div>
              <div>
                <img src={`${product.image_url}`} style={{ width: '175px', height: '175px', objectFit: 'cover' }} />
              </div>
                <div style={{ margin: '40px' }}>
                <button onClick={() => addToCart(product)} style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Add to Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      {content}
    </div>
  );
};

export default Products;