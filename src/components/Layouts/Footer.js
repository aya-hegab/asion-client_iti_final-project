import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imags/logo.png'
const Footer = () => {

    return (


        <>
<footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-7">
                <div className="footer__about">
                    <div className="footer__logo">
                        <Link to=""><img src={logo} alt="" /></Link>
                    </div>
                    <p>Keep up with the latest trends and updates by following us on social media.
Our team                is here to assist you with any questions or concerns. Contact us for support.</p>
                    <div className="footer__payment">
                  

                        {/* <Link to="H"><img src="img/payment/payment-1.png" alt="" /></Link>
                        <Link to="H"><img src="img/payment/payment-2.png" alt="" /></Link>
                        <Link to="H"><img src="img/payment/payment-3.png" alt="" /></Link>
                        <Link to="H"><img src="img/payment/payment-4.png" alt="" /></Link>
                        <Link to="H"><img src="img/payment/payment-5.png" alt="" /></Link> */}
                    </div>
                </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5">
                <div className="footer__widget">
                    <h6>Quick links</h6>
                    <ul>
                        {/* <li><Link to="H">About</Link></li>
                        <li><Link to="H">Blogs</Link></li> */}
                        <li><Link to="/contact">Contact</Link></li>
                        {/* <li><Link to="H">FAQ</Link></li> */}
                    </ul>
                </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4">
                <div className="footer__widget">
                    <h6>Account</h6>
                    <ul>
                        <li><Link to="/customerprofile">My Account</Link></li>
                        {/* <Linkitohref="H">Orders Tracking</a></li> */}
                        <li><Link to="/checkoutPage">Checkout</Link></li>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-8">
                <div className="footer__newslatter">
                    <h6>NEWSLETTER</h6>
                    {/* <form action="#">
                        <input type="text" placeholder="Email" />
                        <button type
                        ="submit" className="site-btn">Subscribe</button>
                    </form> */}
                     

                    <div className="footer__social mb-4">
                        <Link to="https://www.facebook.com/profile.php/?id=100037604017924"><i className="fab fa-facebook"></i></Link>
                        <Link to="https://twitter.com/i/flow/single_sign_on"><i className="fab fa-twitter"></i></Link>
                        <Link to="https://www.youtube.com/watch?v=wGRF3GQ4Wdk"><i className="fab fa-youtube-play"></i></Link>
                        <Link to="https://www.instagram.com/toka_arif?igsh=OXoycnUyNmJlcTVt"><i className="fab fa-instagram"></i></Link>
                        <Link to="https://www.pinterest.com/search/pins/?q=fahion&rs=typed"><i className="fab fa-pinterest"></i></Link>
                    </div>
                    <Link to="#"><img src="img/payment/payment-2.png" alt="" /></Link>
                      
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                
                <div className="footer__copyright__text">
                    <p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | This Ashion ecommerce is Created by <i className="fa fa-heart" aria-hidden="true"></i>  <Link to="h " target="_blank">5 Lovely Girls</Link></p>
                </div>
                
            </div>
        </div>
    </div>
</footer>

        </>

    )

}


export default Footer;