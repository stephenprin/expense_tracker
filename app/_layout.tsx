import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { colors } from '@/constants/theme'

const _layout = () => {
  return (
      <Stack screenOptions={{headerShown:false}}>
          
    </Stack>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.neutral100,
    }
})

export default _layout