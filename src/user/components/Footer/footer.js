import React from 'react'
import './footer.css'
function Footer() {
  return (
    <div className='footer'>
        <div className="footer-text d-flex justify-content-around my-2">
            Follow us on
        </div>
        <div className="social-icons-footer d-flex justify-content-center my-2">
            <div className="rounded-circle social-icon"><i className="fa-brands fa-facebook-f"></i></div>
            <div className="rounded-circle social-icon"><i className="fa-brands fa-youtube"></i></div>
            <div className="rounded-circle social-icon"><i className="fa-brands fa-twitter"></i></div>
            <a href="https://www.instagram.com/vibrantnation_ct/" target='__blank'><div className="rounded-circle social-icon"><i className="fa-brands fa-instagram"></i>  </div> </a>
            <div className="rounded-circle social-icon"><i className="fa-brands fa-linkedin-in"></i></div>
        </div>
        <div className="copyright-message-footer d-flex justify-content-center">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved
        </div>
    </div>
  )
}

export default Footer;