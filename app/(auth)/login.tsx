import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'

const Login = () => {
  return (
      <ScreenWrapper>
          
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
       paddingHorizontal: spacingY._20,
    },
    welcomeTitle: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
        color:colors.text,
    }
})