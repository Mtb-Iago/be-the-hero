import React, { useState } from 'react';

import api from '../../services/api';

import './styles.css';
import { Link, useHistory } from 'react-router-dom'; //melhor que tag <a> nao carrega a pag td
import { FiLogIn } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();//enviar usuario pra rota profile 

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { id });

            localStorage.setItem('ongId', id);//enviando pra rota
            localStorage.setItem('ongName', response.data.name);//enviando para rota

            history.push('/profile'); //enviando Ong name,ongID para roda profile

        } catch (error) {
            alert("Falha de login");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}