import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import * as theme from '../constants/Theme';
import * as layout from '../constants/Layout';

export default class Button extends Component {
  render() {
    const { style, full, opacity, children, ...props } = this.props;

    const buttonStyles = [
      styles.button,
      full && styles.full,
      style,
    ];

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.blue,
    borderRadius: 4,
    height: 55,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    width: layout.width - 50,
  }
});
