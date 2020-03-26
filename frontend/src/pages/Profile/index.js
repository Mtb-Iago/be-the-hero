import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);//vai gravar td objetos da lista começaarray vazio e lista de acord com a functio useEffect

    const ongId = localStorage.getItem('ongId');//busca o id da ong logada
    const ongName = localStorage.getItem('ongName');//busca o nome da ong logada
    const history = useHistory();


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);//sempre que array muda o efect transforma as chvaves

    async function handleDeleteIncident(id) {//função para deletar
        try {
            await api.delete(`incidents/${id}`, {//confirma se o id confere e deleta o caso
                headers: {
                    Authorization: ongId,//confirma o id 
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));//atualiza a pagina no instate que exclui o caso
        } catch (err) {
            alert("Erro ao deletar o caso!")
        }
    }

    function handleLogout() {
        localStorage.clear();//limpa ongInd e ongNome
        history.push('/');//volta para a pagina raiz
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/Incident/New">Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (//map funciona tipo for,o key e para pegar o id dos incidents gravados
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>

                    </li>))}
            </ul>

        </div>
    )
}