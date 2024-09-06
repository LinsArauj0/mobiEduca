import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>Sobre o Projeto</h1>
      <section className="about-section">
        <h2>Sobre o Desenvolvedor</h2>
        <p>
          Sou Érick Lima, um desenvolvedor apaixonado por tecnologia e inovação. Tenho 28 anos e estou cursando Análise e Desenvolvimento de Sistemas. Minha experiência inclui projetos pessoais e acadêmicos, e estou em busca de uma oportunidade no mercado de trabalho como desenvolvedor front-end. Tenho afinidade com tecnologias como ReactJS, React Native, VueJS, além de HTML, CSS e JavaScript.
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
          <li><strong>ShadCn:</strong> Biblioteca utilizada, especialmente para o componente de diálogo, aprimorando a funcionalidade do modal.</li>
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
