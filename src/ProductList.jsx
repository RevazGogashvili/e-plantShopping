// src/ProductList.jsx (or your chosen path)
import React, { useState } from 'react';
import './ProductList.css'; // Make sure this CSS file exists and is styled
import CartItem from './CartItem';   // Make sure this path is correct

import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Make sure this path is correct

function ProductList({ onHomeClick }) { // onHomeClick prop for handling navigation if needed
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Local state for "Added to Cart" button feedback
    const dispatch = useDispatch();

    // Get cart items from Redux store to calculate total quantity for the badge
    const cartItemsFromStore = useSelector(state => state.cart.items);

    const calculateTotalQuantity = () => {
        return cartItemsFromStore ? cartItemsFromStore.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { name: "Aloe Vera (Air Purifying)", id: "aloe_air", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender (Aromatic)", id: "lav_arom", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy.", cost: "$20" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
                { name: "Lemon Balm (Aromatic)", id: "lb_arom", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress and promotes sleep.", cost: "$14" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Hyacinth is a beautiful flowering plant known for its fragrant.", cost: "$22" }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg", description: "The oregano plants contains compounds that can deter certain insects.", cost: "$10" },
                { name: "Marigold", image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg", description: "Natural insect repellent, also adds color to the garden.", cost: "$8" },
                { name: "Geraniums", image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg", description: "Known for their insect-repelling properties while adding a pleasant scent.", cost: "$20" },
                { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg", description: "Repels flies and mosquitoes, also used in cooking.", cost: "$9" },
                { name: "Lavender (Insect Repellent)", id: "lav_insect", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy. Deters insects.", cost: "$20" },
                { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description: "Repels mosquitoes and attracts cats.", cost: "$13" }
            ]
        },
        {
            category: "Medicinal Plants",
            plants: [
                { name: "Aloe Vera (Medicinal)", id: "aloe_med", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Soothing gel used for skin ailments.", cost: "$14" },
                { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg", description: "Boosts immune system, helps fight colds.", cost: "$16" },
                { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg", description: "Relieves digestive issues and headaches.", cost: "$13" },
                { name: "Lemon Balm (Medicinal)", id: "lb_med", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Calms nerves and promotes relaxation.", cost: "$14" },
                { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg", description: "Soothes anxiety and promotes sleep.", cost: "$15" },
                { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg", description: "Heals wounds and soothes skin irritations.", cost: "$12" }
            ]
        },
        {
            category: "Low Maintenance Plants",
            plants: [
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Thrives in low light and requires minimal watering.", cost: "$25" },
                { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Tolerates neglect and can grow in various conditions.", cost: "$10" },
                { name: "Snake Plant (Low Maintenance)", id: "snake_lowmaint", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Needs infrequent watering and is resilient to most pests.", cost: "$15" },
                { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg", description: "Hardy plant that tolerates low light and neglect.", cost: "$20" },
                { name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Drought-tolerant plants with unique shapes and colors.", cost: "$18" },
                { name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Requires minimal care and adds color to indoor spaces.", cost: "$22" }
            ]
        }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff', // !important is not needed and generally avoided in inline styles
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };
    const styleObjUl = {
        display: 'flex',
        listStyle: 'none', // Remove bullet points if these were <li>
        padding: 0,
        margin: 0,
        alignItems: 'center',
        // width: '1100px', // Fixed width can be problematic for responsiveness
    };
    const styleA = { // Style for individual nav links
        color: 'white',
        fontSize: '20px', // Adjusted for better consistency with nav bar
        textDecoration: 'none',
        padding: '0 15px', // Add some padding to nav links
    };
     const navLinkContainerStyle = { // Style for the container of nav links
        display: 'flex',
        alignItems: 'center',
    };


    const handleHomeClick = (e) => {
        e.preventDefault();
        setShowCart(false);
        if (onHomeClick) onHomeClick(); // Call prop if it's for navigation
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsLinkClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        // Ensure each product has a unique ID to use with addedToCart state
        // If product.id is not available, product.name is a fallback but less reliable if names aren't unique.
        const productIdentifier = product.id || product.name;
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [productIdentifier]: true,
        }));
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Paradise Nursery Logo" style={{ height: '50px', marginRight: '10px' }} />
                        <a href="/" onClick={handleHomeClick} style={{ textDecoration: 'none', color: 'white' }}>
                            <div>
                                <h3>Paradise Nursery</h3>
                                <i style={{ fontSize: '0.8em' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={navLinkContainerStyle}> {/* Changed from styleObjUl to a more general container */}
                    <a href="#" onClick={handlePlantsLinkClick} style={styleA}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={styleA}>
                        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="38" width="38" style={{ fill: 'none', stroke: '#faf9f9', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '8px' }}> {/* Adjusted size and strokeWidth */}
                                <circle cx="80" cy="216" r="12" strokeWidth="8"></circle>
                                <circle cx="184" cy="216" r="12" strokeWidth="8"></circle>
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"></path>
                            </svg>
                            {calculateTotalQuantity() > 0 && (
                                <span className="cart-badge" style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-8px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '3px 6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    lineHeight: '1',
                                    minWidth: '18px', // Ensure badge has some width
                                    textAlign: 'center'
                                }}>
                                    {calculateTotalQuantity()}
                                </span>
                            )}
                        </div>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid-container">
                    {plantsArray.map((category) => ( // Removed index from map if not used
                        <div key={category.category} className="category-section">
                            <h2 className="category-title">{category.category}</h2> {/* Changed h1 to h2 for semantics */}
                            <div className="product-list">
                                {category.plants.map((plant) => {
                                    // Use product.id if available for addedToCart, otherwise product.name
                                    const productIdentifier = plant.id || plant.name;
                                    return (
                                        <div className="product-card" key={plant.id || plant.name}> {/* Use unique ID or name for key */}
                                            <img
                                                className="product-image"
                                                src={plant.image}
                                                alt={plant.name}
                                            />
                                            <div className="product-title">{plant.name}</div>
                                            <div className="product-description">{plant.description}</div>
                                            <div className="product-cost">{plant.cost}</div>
                                            <button
                                                className="product-button"
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={addedToCart[productIdentifier]}
                                            >
                                                {addedToCart[productIdentifier] ? 'Added!' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;