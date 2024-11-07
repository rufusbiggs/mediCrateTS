import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonType {
    text: string,
    onPress: () => void,
    loading: boolean,
    disabled: boolean,
    clickedText: string,
    variant: 'login' | 'signup'
}

const CustomButton: React.FC<ButtonType> = ({ text, onPress, loading, disabled, clickedText, variant }) => ( 
  <TouchableOpacity
    style={[
        styles.button, 
        disabled && styles.disabled,
        variant === 'signup' ? styles.signupButton : styles.loginButton,   
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{loading ? clickedText : text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#335db0',
  },
  signupButton: {
    backgroundColor: '#B57C58',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
});

export default CustomButton;
