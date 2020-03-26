import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';//import o link
import { FiArrowLeft } from 'react-icons/fi';//importa o icone
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';//importa api

export default function Register() {
    const [name, setName] = useState(''); //pegar os input e grava na varivael para mandar pro banco
    const [email, setEmail] = useState(''); //pegar os input
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();//redirecionar para a rota raiz
    async function handleRegister(e) {//função responsavel pelo cadastro de usuario
        e.preventDefault();//previni o comportamento padrao de carregamento do form

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);//manda data para o bd, e verifica se foi enviado
            alert(`Seu ID de acesso: ${response.data.id}`);//manda o id vindo do bd 

            history.push('/');//redireciona para a rota raiz
        } catch (err) {
            alert('Erro no cadastro');
        }
    }
    return (
        <div className="register-conteiner">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister /*metodo para chamar a funcao em cada evento*/}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)/**pega input e manda para o estado */}
                    />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)/**pega input e manda para o estado */}
                    />

                    <div className="input-group">
                        <input placeholder="cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)/**pega input e manda para o estado */}
                        />
                        <input placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}