import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f172a', // Darker background for a more cinematic feel
    },
   
    homeScreen: {
      flex: 1,
      backgroundColor: '#0f172a',
    },
    scrollView: {
      flex: 1,
    },

 
 
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'System',
    },
   
    screen: {
      flex: 1,
      backgroundColor: '#0f172a',
    },
    uploadContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    uploadBox: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
      borderWidth: 2,
      borderColor: '#60a5fa',
      borderStyle: 'dashed',
    },
    uploadText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
      fontFamily: 'System',
    },
    uploadSubtext: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'System',
    },
    loadingScreen: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#0f172a',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 18,
      color: '#fff',
      fontFamily: 'System',
    },
    // Animation-related styles
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 1,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 24,
    },
    videoPreview: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: 'rgba(156, 163, 175, 0.5)',
    }, welcomeSection: {
      padding: 24,
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: 'rgba(30, 41, 59, 0.8)',
      borderRadius: 16,
      marginHorizontal: 16,
    },
    welcomeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
      fontFamily: 'System',
    },
    appName: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#60a5fa',
      marginBottom: 16,
      fontFamily: 'System',
    },
    logoAndTitle: {
      flexDirection: 'row', // Ensures the logo and title are in a row
      alignItems: 'center', // Vertically aligns the logo and title
      justifyContent: 'center', // Horizontally centers them
    },
    logo: {
      width: 100, // Adjust as needed for your logo size
      height: 100, // Adjust as needed for your logo size
      marginRight: 5, // Space between logo and title
    },
    appName: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#60a5fa',
      fontFamily: 'System',
    },
    
});

export default styles;