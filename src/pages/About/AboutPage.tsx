import React from 'react';
import './About.css'; // Importe o arquivo CSS

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>Sobre</h1>
      <section className="about-section">
        <h2>Falar sobre você</h2>
        <p>
          Aqui você pode falar um pouco sobre você. Descreva sua trajetória, suas experiências e o que o levou a desenvolver este projeto.
        </p>
      </section>
      <section className="about-section">
        <h2>O que utilizou para desenvolver o projeto</h2>
        <p>
          Neste projeto, foram utilizadas as seguintes tecnologias e ferramentas:
        </p>
        <ul>
          <li>React para a construção da interface</li>
          <li>TypeScript para tipagem estática</li>
          <li>CSS para estilização</li>
          <li>Shadcn Dialog para formulários modais</li>
          <li>Axios para requisições HTTP</li>
          {/* Adicione mais itens conforme necessário */}
        </ul>
      </section>
      <section className="about-section">
        <h2>Dificuldades encontradas</h2>
        <p>
          Durante o desenvolvimento do projeto, algumas dificuldades foram encontradas, como:
        </p>
        <ul>
          <li>Problemas com a integração de APIs</li>
          <li>Desafios com a responsividade do layout</li>
          <li>Erros ao utilizar algumas bibliotecas específicas</li>
          {/* Adicione mais itens conforme necessário */}
        </ul>
      </section>
      <section className="about-section">
        <h2>Sugestões</h2>
        <p>
          Sugestões para melhorias no projeto ou para futuros desenvolvimentos:
        </p>
        <ul>
          <li>Implementar novas funcionalidades com base no feedback dos usuários</li>
          <li>Aprimorar a performance e a otimização do projeto</li>
          <li>Explorar novas tecnologias e ferramentas para melhorar a experiência</li>
          {/* Adicione mais itens conforme necessário */}
        </ul>
      </section>
    </div>
  );
};

export { About };
