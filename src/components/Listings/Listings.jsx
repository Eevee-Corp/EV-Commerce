import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserProduct, fetchUserProducts } from '../../../src/redux/userProductsSlice.js'

const UserProductsPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.userproduct.items);
  const status = useSelector(state => state.userproduct.status);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [productInventory, setProductInventory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hasAdded, setHasAdded] = useState(false)

  // useEffect(() => {
  //   dispatch(fetchUserProducts(userId)); // Assuming you have a userId to pass
  // }, [dispatch]);

  const handleAddProduct = () => {
    if (!productName.trim() || !productPrice.trim()) {
      alert("Please enter both name and price for the product.");
      return;
    }
    dispatch(addUserProduct({ productid: productId, productname: productName, price: productPrice, totalinventory: productInventory }));
    setProductId('');
    setProductName('');
    setProductPrice('');
    setProductInventory('');
    setImageUrl('');
    setHasAdded(true);
  };
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Your Listings</h1>
      {status === 'loading' && <p>Loading...</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Product Id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Product Inventory"
          value={productInventory}
          onChange={(e) => setProductInventory(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="Image Url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button 
          onClick={handleAddProduct} 
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Add Product
        </button>
      </div>
      {!hasAdded ? (
        <strong>No products added yet.</strong>
      ) : (
        <p>Product Added Successfully! Check Dashboard to see your Product!</p>
      )}
    </div>
  );
}

export default UserProductsPage;