import React from 'react';
import { Link } from 'react-router-dom';

import successImg from '../../images/success-marker.svg';
import './styles.css';

function Success() {
  return (
    <div id="page-success">
      <main>
        <div className="content">
          <h2>Ebaaa!</h2>

          <p>
            Cadastro realizado com sucesso {':)'}
          </p>

          <Link to="/app" className="return-button">
            Voltar para o mapa
          </Link>
        </div>
        <img src={successImg} alt="Success" />
      </main>
    </div>
  );
}

export default Success;