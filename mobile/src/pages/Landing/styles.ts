import { StyleSheet, DevSettings } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        padding: 25,
        backgroundColor:'#8257e5'
    },

    banner:{
        width:'100%',
        resizeMode:'contain'
    },

    title:{
        fontFamily:'Poppins_400Regular',
        color:'#fff',
        fontSize:20,
        lineHeight:30,
        marginTop:80
    },

    titleBold:{
        fontFamily:'Poppins_600SemiBold'
    },

    buttonsContainer:{
        flexDirection:'row',
        marginTop:40,
        justifyContent:'space-between'
    },
    
    button:{
        height:150,
        width:'48%',
        backgroundColor:'#333',
        borderRadius:8,
        padding:24,
        justifyContent:'space-between'
    },

    buttonPrimary:{
        backgroundColor:'#9871f5'
    },

    buttonSecondary:{
        backgroundColor:'#04D361'
    },

    buttonText:{
        fontFamily:'Archivo_700Bold',
        color:'#fff',
        fontSize:19
    },

    totalConnections:{
        fontFamily:'Poppins_400Regular',
        color:'#d4c2ff',
        lineHeight:20,
        textAlign:'center',
        marginTop:40
    }
});

export default styles;