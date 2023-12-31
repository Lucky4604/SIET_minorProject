// ProductCard.js
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import myContext from '../components/contextApi/myContext';
import { addToCart, deleteFromCart } from '../reduxs/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ showAll }) => {
    const context = useContext(myContext);
    const { product,searchkey,filterType,
        filterPrice  } = context;

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    // Sort the products by timestamp in descending order (latest first)
    const sortedProducts = product.slice().sort((a, b) => b.timestamp - a.timestamp);

    // Determine which products to display based on the showAll prop
    const productsToDisplay = showAll ? sortedProducts : sortedProducts.slice(0, 4);

    // add to cart
    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const filteredProducts = product
        .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
        .filter((obj) => filterType === 'All' || obj.category.toLowerCase().includes(filterType.toLowerCase()))
        .filter((obj) => filterPrice === 'All' || obj.price.includes(filterPrice));

    return (
        <section className="text-white body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-gradient-to-br from-rose-500 to-indigo-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4 bg-white">
                    {filteredProducts.map((item, index) => {
                        const { title, price, imageUrl, id } = item;
                        if (productsToDisplay.includes(item)) {

                        return (
                            <div onClick={() => window.location.href = `/productinfo/${item.id}`} key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                                <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
                                    <div className="flex justify-center cursor-pointer">
                                        <img className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" src={imageUrl} alt="product" />
                                    </div>
                                    <div className="p-5 border-t-2">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">E-Localize</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                                        <p className="leading-relaxed mb-3 text-gray-500">₹{price}</p>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => addCart(item)}
                                                type="button"
                                                className="focus:outline-none text-white bg-gradient-to-br from-rose-500 to-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
