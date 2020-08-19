import React from 'react'
import Logo from './assets/Logo_svg_preto.svg';
import './Footer.css';

function Footer() {
    return (
        <div className="footerBase">
            <p>
                Desenvolvido por:
            </p>
             <img className="logoFooter" src={Logo} alt="Luiz Krzyzaniak"/>
        </div>
    )
}

export default Footer
