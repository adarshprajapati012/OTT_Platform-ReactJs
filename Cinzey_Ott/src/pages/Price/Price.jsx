import React from "react";
import "./Price.css";
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom';
const Price = () => {
    return (

        <div>

            <div className="price-container">
                <NavLink to="/"><img src={logo} alt='Logo' className='price-logo' /></NavLink>
                <h2 className="price-title">Choose Your Plan</h2>
                <div className="price-cards">
                    <div className="price-card">
                        <div className="price-badge basic">Basic</div>
                        <h3 className="price-amount">$3.99<span>/month</span></h3>
                        <p className="price-desc">Enjoy streaming on 1 device at a time in SD quality.</p>
                        <ul className="price-features">
                            <li>✔ 1 Screen at a time</li>
                            <li>✔ SD (480p) Streaming</li>
                            <li>✔ Unlimited Movies & TV Shows</li>
                            <li>✔ Cancel Anytime</li>
                        </ul>
                        <button className="price-btn">Get This Plan</button>
                    </div>
                    <div className="price-card">
                        <div className="price-badge standard">Standard</div>
                        <h3 className="price-amount">$5.99<span>/month</span></h3>
                        <p className="price-desc">Stream in HD on up to 2 devices simultaneously.</p>
                        <ul className="price-features">
                            <li>✔ 2 Screens at a time</li>
                            <li>✔ HD (1080p) Streaming</li>
                            <li>✔ Unlimited Movies & TV Shows</li>
                            <li>✔ Download for Offline</li>
                        </ul>
                        <button className="price-btn">Get This Plan</button>
                    </div>

                    <div className="price-card">
                        <div className="price-badge premium">Premium</div>
                        <h3 className="price-amount">$12.99<span>/month</span></h3>
                        <p className="price-desc">Enjoy 4K streaming on up to 4 devices at once.</p>
                        <ul className="price-features">
                            <li>✔ 4 Screens at a time</li>
                            <li>✔ Ultra HD (4K) Streaming</li>
                            <li>✔ Unlimited Movies & TV Shows</li>
                            <li>✔ Download for Offline</li>
                        </ul>
                        <button className="price-btn">Get This Plan</button>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Price;
