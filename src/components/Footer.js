import React from 'react';
import {Link} from 'react-router-dom';
import FooterLogo from './FooterLogo.png'


function Footer() {

  return(
    <div className='footer'>
      <Link to='/'>
      <img className="footerLogo" src={FooterLogo} alt="Power Asana Logo"/>
      </Link>
      <p>© PowerAsana 2022. All rights reserved.</p>
     
    </div>
  )
}

export default Footer;