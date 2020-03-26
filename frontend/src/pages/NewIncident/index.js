import React from 'react';
import { Link } from 'react-router-dom';//import o link
import { FiArrowLeft } from 'react-icons/fi';//importa o icone
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/Profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>

                <form>
                    <input placeholder="Titulo do caso" />
                    <textarea placeholder="Descrição" />
                    <input placeholder="Valor em reais" />


                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}
