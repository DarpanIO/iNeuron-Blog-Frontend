import React from 'react'
import './footer.css'
function Footer() {
  return (
    <div className='footer'>
        <div className="footer-text d-flex justify-content-around my-2">
            Follow us on
        </div>
        <div className="social-icons-footer d-flex justify-content-center my-2">
            <a href="https://www.facebook.com/ineuronai" target='__blank'><div className="rounded-circle social-icon"><i className="fa-brands fa-facebook-f"></i></div></a>
            <a href="https://www.youtube.com/channel/UCb1GdqUqArXMQ3RS86lqqOw" target='__blank'><div className="rounded-circle social-icon"><i className="fa-brands fa-youtube"></i></div></a>
            <a href="https://twitter.com/iNeuronAi" target='__blank'><div className="rounded-circle social-icon"><i className="fa-brands fa-twitter"></i></div></a>
            <a href="https://ineuron.ai/" target='__blank'><div className="rounded-circle social-icon"><i className="fa-solid fa-globe"></i>  </div> </a>
            <a href="https://www.linkedin.com/company/ineuron-ai" target='__blank'><div className="rounded-circle social-icon"><i className="fa-brands fa-linkedin-in"></i></div></a>
        </div>
        <div className="copyright-message-footer d-flex justify-content-center">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved
        </div>
    </div>
  )
}

export default Footer;