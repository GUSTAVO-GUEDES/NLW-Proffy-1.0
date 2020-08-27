import React, { useState, useEffect } from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import LandingImage from '../../assets/images/landing.png';
import StudyIcon from '../../assets/images/icons/study.png';
import GiveClassesIcon from '../../assets/images/icons/give-classes.png'
import HeartIcon from '../../assets/images/icons/heart.png'

import styles from './styles';

function Landing(){
    const [totalConnections, setTotalConnections] = useState(0);
    const {navigate} = useNavigation();

    useEffect(() => {
        api.get('connections').then(response =>{
            setTotalConnections(response.data.total);
        });
    }, []);

    function handleNavigationToGiveClassPage(){
        navigate('GiveClasses');
    }

    function handleNavigationToStudyPages(){
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={LandingImage} style={styles.banner}/>
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigationToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={StudyIcon}></Image>

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigationToGiveClassPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={GiveClassesIcon}></Image>

                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} coneções já realizadas {' '}
                <Image source={HeartIcon}></Image>
            </Text>
        </View>
    );
}   

export default Landing;