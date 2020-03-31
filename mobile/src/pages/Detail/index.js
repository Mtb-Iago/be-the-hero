import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'; // exporta tudo de mail composer para variavel Mailcomposer 


import logoImg from '../../assets/logo.png';


import styles from './styles';


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident; //pegando o parametro para mostra as infos
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${
        Intl.NumberFormat(
            'pt-BR',
            {
                style: 'currency',
                currency: 'BRL'
            })
            .format(incident.value)
        }
      `;

    function navigateBack() { //função para voltar
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({ //manda para o email
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsaap() {
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentsValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentsProperty}>CASO:</Text>
                <Text style={styles.incidentsValue}>{incident.title}</Text>

                <Text style={styles.incidentsProperty}>DESCRIÇÃO DO CASO:</Text>
                <Text style={styles.incidentsValue}>{incident.description}</Text>

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
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.!</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsaap}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}