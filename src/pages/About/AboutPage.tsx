import React from 'react';
import './About.css'; // Importe o arquivo CSS

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>Sobre o Projeto</h1>
      <section className="about-section">
        <h2>Sobre o Desenvolvedor</h2>
        <p>
          Sou Érick Lima, um desenvolvedor apaixonado por tecnologia e inovação. Com uma sólida formação em [Sua Formação] e experiência em [Área de Experiência], decidi criar este projeto para [Objetivo do Projeto]. Minha trajetória inclui [Breve Descrição de Experiências Relevantes] e, ao longo dos anos, desenvolvi habilidades em várias tecnologias que utilizei neste projeto.
        </p>
      </section>
      <section className="about-section">
        <h2>Tecnologias e Ferramentas Utilizadas</h2>
        <p>
          Para o desenvolvimento deste projeto, utilizei uma combinação de tecnologias modernas e ferramentas eficazes:
        </p>
        <ul>
          <li><strong>React:</strong> Biblioteca para construção de interfaces interativas.</li>
          <li><strong>TypeScript:</strong> Adiciona tipagem estática ao JavaScript para maior segurança e previsibilidade.</li>
          <li><strong>CSS:</strong> Estilização da interface com foco na responsividade e na experiência do usuário.</li>
          <li><strong>Axios:</strong> Biblioteca para realizar requisições HTTP e manipulação de dados.</li>
        </ul>
      </section>
      <section className="about-section">
        <h2>Dificuldades e Desafios</h2>
        <p>
          O desenvolvimento deste projeto apresentou vários desafios que foram superados com persistência e aprendizado contínuo:
        </p>
        <ul>
          <li><strong>Integração de APIs:</strong> Superar problemas com a integração e consumo de APIs foi um aprendizado crucial.</li>
          <li><strong>Responsividade:</strong> Ajustar o layout para diferentes tamanhos de tela e dispositivos foi desafiador.</li>
          <li><strong>Bibliotecas e Ferramentas:</strong> Enfrentar erros e aprender a utilizar bibliotecas específicas foi uma parte importante do processo.</li>
        </ul>
      </section>
      <section className="about-section">
        <h2>Possíveis Melhorias Futuras</h2>
        <p>
          O projeto está em constante evolução e há várias áreas que podem ser aprimoradas:
        </p>
        <ul>
          <li><strong>Novas Funcionalidades:</strong> Implementar melhorias e novas funcionalidades com base no feedback dos usuários.</li>
          <li><strong>Otimização e Performance:</strong> Trabalhar na performance e na otimização do projeto para oferecer uma melhor experiência.</li>
          <li><strong>Exploração de Novas Tecnologias:</strong> Avaliar e integrar novas tecnologias para inovar e melhorar continuamente.</li>
        </ul>
      </section>
    </div>
  );
};

export { About };
