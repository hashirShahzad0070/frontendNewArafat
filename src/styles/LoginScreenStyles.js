import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#36373B',
  },

  DetailWrapper:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#ffffff',
    borderRadius:'30'

  },

  imgwrapper:{
    width:'100%',
    alignItems:'center',
    
  },

  signupText2:{
    marginTop:90,
    fontSize: 19,
    fontWeight:500,

    
  },
  signupText3:{
    marginTop:60,
    fontSize: 19,
    fontWeight:500,
  
},

  bgImage:{
    width:'100%',
    alignItems:'center'

  },

  image: {
    width: 208, 
    height: 208, // Adjust the height based on your design
    marginBottom: 15,
    marginTop: 50,

    
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#36373B', // Title color
  },

  titleSignup: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#36373B', // Title color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:58,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor:'#F1F4F9',
    marginTop:5,
  },
  icon: {
    width: 29,  // Adjust size as needed
    height: 24, // Adjust size as needed
    marginRight: 10, // Space between icon and input
  },
  iconName:{
    width:25,
    marginRight: 10,
  },
  input: {
    flex: 1, // Take up the remaining space
    height: 50,
    paddingLeft: 5,
    fontSize:18, // Optional padding
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  rememberText: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#36373B',
    padding: 15,
    height:56,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight:500,
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    
  },
  socialButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    
  },
  signupText: {
    marginTop: 30,
    fontSize: 16,
  },

  socialContainer:{
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width:'80%',
    marginTop: 10,

  },
  

  socialButton:{
    width:30,
    height:30,
  },
  signupLink: {
    color: '#36373B',
    fontWeight: 'bold',
  },
});

export default styles;
