import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import HeartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import UnfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import WhatsAppIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher{
    id:number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}

interface TeacherItemProps{
    teacher:Teacher;
    favorited:boolean;
}

const TeacherItem:React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function createNewConnection(){
        api.post('connections',{
            user_id: teacher.id
        });
    }

    function handleLinkToWhatsApp(){
        createNewConnection();

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorited(){
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];
        if(favorites){
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited){
            //remover dos favoritos
            const favoriteArrayIndex = favoritesArray.findIndex((teacherItem:Teacher) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteArrayIndex, 1)

            setIsFavorited(false);
        }else{
            //adicionar aos favoritos
            favoritesArray.push(teacher);

            setIsFavorited(true);
        }
        await AsyncStorage.setItem('favorites',JSON.stringify(favoritesArray));
    }

    return(
        <View style={styles.container}>  
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{uri: teacher.avatar}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited: {} ]} onPress={handleToggleFavorited}>
                        {isFavorited ? <Image source={UnfavoriteIcon}/>:<Image source={HeartOutlineIcon}/>}                      
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsApp}>
                        <Image source={WhatsAppIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;