import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36373B',
  },

  DetailWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },

  imgwrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  signupText2: {
    marginTop:80,
     // Adjusted for better spacing
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
  },

  signupText3: {
    marginTop:80,
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
  },

  bgImage: {
    width: '100%',
    alignItems: 'center',
  },

  image: {
    width: '50%', // Dynamically scale the image
    height: undefined,
    aspectRatio: 1, // Maintain aspect ratio
    marginBottom: 0,
    marginTop: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#36373B', // Title color
    textAlign: 'center',
  },

  titleSignup: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#36373B',
    textAlign: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F1F4F9',
    marginBottom: 15,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  iconName: {
    width: 25,
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: '#000',
  },

  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },

  rememberText: {
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: '#36373B',
    paddingVertical: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },

  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },

  orText: {
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },

  socialButton: {
    width: 50, // Adjusted for better UI scaling
    height: 50,
    borderRadius: 25, // Circular button
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signupText: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },

  signupLink: {
    color: '#36373B',
    fontWeight: 'bold',
  },
});

export default styles;
