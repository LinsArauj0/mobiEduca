import React from 'react';
import './Footer.css'; // Importe o arquivo CSS

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Contato</h2>
          <p>Email: contato@exemplo.com</p>
          <p>Telefone: +55 86 99453 1581</p>
          <p>Endereço: Rua Onda Verde, 6027, Teresina 64057123, Piauí, Brasil</p>
        </div>
        <div className="footer-section">
          <h2>Links Úteis</h2>
          <ul>
            <li><a href="/about">Sobre</a></li>
            <li><a href="/contact">Contato</a></li>
            <li><a href="/privacy">Política de Privacidade</a></li>
            <li><a href="/terms">Termos de Serviço</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Siga-nos</h2>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a><br />
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a><br />
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MobiEduca. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
