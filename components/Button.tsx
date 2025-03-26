import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Loading from './Loading'

const Button = ({
    style,
    onPress,
    children,
    loading = false,
}: CustomButtonProps) => {
    if (loading) { 
        return (
            <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
                <Loading/>
            </View>
        )
    }
  return (
      <TouchableOpacity style={[styles.button, style]}  onPress={onPress}>
            {children}
   </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
    }
})