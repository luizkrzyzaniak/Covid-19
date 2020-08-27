import React from 'react'
import Logo from './assets/Logo_svg_preto.svg';
import './Footer.css';

function Footer() {
    return (
        <div className="footerBase">
            <p>
                Desenvolvido por:
            </p>
            <a href="https://github.com/luizkrzyzaniak" target="_blank">
             <img className="logoFooter" src={Logo} alt="Luiz Krzyzaniak"/></a>
        </div>
    )
}

export default Footer
