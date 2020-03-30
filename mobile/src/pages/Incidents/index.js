import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; //para linka 


import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';


export default function Incidents() {
    const [incidents, setIncidents] = useState([]); //pega as incidentse começa com array vazio
    const [total, setTotal] = useState(0); //mostrando total de casos cadastrados
    const [page, setPage] = useState(1);//inicia pagina 1
    const [loading, setLoading] = useState(false)//armazena uma info quando esta buscando de 1 por vez

    const navigation = useNavigation();// inicia a function parece com history web



    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //manda para a rota 
    }

    async function loadIncidents() {

        if (loading) {
            return;

        }
        if (total > 0 && incidents.lengh === total) {
            return;
        }
        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }//avisa quantas paginas esta
        });


        setIncidents([...incidents, ...response.data]) //onde vem os dados da api, os casos ...
        setTotal(response.headers['x-total-count']);//total de casos cadastrados
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
           </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo</Text>

            <FlatList //para dar scrol na pagina
                data={incidents}// [1, 2, 3]-- array conteudo scrol  teste
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)}//para nao dar erro
                showsVerticalScrollIndicator={false} // esconde a barra do scroll da tela
                onEndReached={loadIncidents}
                ondEndReachedThreshold={0.2}//carrega a pagina quando estive quando no fim
                renderItem={({ item: incident }) => ( //funcão que passa jsx semore com ()

                    < View style={styles.incident}>

                        <Text style={styles.incidentsProperty}>ONG:</Text>
                        <Text style={styles.incidentsValue}>{incident.name}</Text>

                        <Text style={styles.incidentsProperty}>CASO:</Text>
                        <Text style={styles.incidentsValue}>{incident.title}</Text>

                        <Text style={styles.incidentsProperty}>VALOR:</Text>
                        <Text style={styles.incidentsValue}>{
                            Intl.NumberFormat(
                                'pt-BR',
                                {
                                    style: 'currency',
                                    currency: 'BRL'
                                })
                                .format(incident.value)
                        }
                        </Text>

                        <TouchableOpacity //efeito no buttao
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}//com erow function para nao inciar de vez
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-left" size={28} color="#e02041" />
                            <Feather />


                        </TouchableOpacity>

                    </ View>

                )}

            />




        </View>
    );
}