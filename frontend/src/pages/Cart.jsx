import React, { useEffect } from 'react';
import useStore from '../store/store'; // Import Zustand store
import { FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useStore((state) => state.cart); // Fetch cart items from Zustand store
  useEffect(()=>{
    console.log(cartItems)
  })
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.minPrice * item.quantity,
    0
  );
  if(!totalPrice){
    return(
      <div className="flex flex-col gap-6 justify-center items-center px-4 mx-auto h-[50vh]">
        <FolderOpen size={100} />
        <h1 className='font-bold sm:text-7xl'>Nothing here...</h1>
        <p className='sm:text-2xl'>Come back after your next shopping spree.</p>
        <Link className='mt-4' to="/services"><button className='px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700'>All Products</button></Link>
      </div>
    )
  }
  return (
    <div className="container px-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">CART</h1>
        <p className="text-gray-500">HOME / CART</p>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-left">IMAGE</th>
            <th className="pb-2 text-left">PRODUCT NAME</th>
            <th className="pb-2 text-left">PRICE</th>
            <th className="pb-2 text-left">QUANTITY</th>
            <th className="pb-2 text-left">ACTION</th>
            <th className="pb-2 text-right">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.id} className="border-b">
              <td className="py-4">
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="object-cover w-20 h-24"
                />
              </td>
              <td className="py-4 text-lg text-gray-600">{cartItem.name}</td>
              <td className="py-4 text-xl font-bold">${cartItem.minPrice}</td>
              <td className="py-4">
                <input
                  type="number"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    useStore.getState().updateCartItem(cartItem.id, parseInt(e.target.value))
                  } // Update quantity in store
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td className="py-4">
                <button
                  onClick={() => useStore.getState().removeFromCart(cartItem.categoryId,cartItem.id)} // Remove item from cart
                  className="text-lg text-center text-gray-500"
                >
                  ×
                </button>
              </td>
              <td className="py-4 text-lg font-bold text-right text-red-500">
                ${cartItem.minPrice * cartItem.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mb-8">
        <button className="px-6 py-2 text-white bg-red-500 rounded">
          CONTINUE SHOPPING
        </button>
        <div className="text-right">
          <p className="mb-2">Total Price:</p>
          <p className="text-2xl font-bold">${totalPrice}</p>
        </div>
      </div>

      <div className="text-right">
        <button className="px-6 py-2 text-white bg-red-500 rounded">
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
