import { assets } from '../../assets/frontend_assets/assets'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    Bite Savor
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis voluptatum facere non aliquid magni.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@bitesavor.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>© 2025 Bite Savor. All Rights Reserved.</p>
        </div>
    )
}

export default Footer