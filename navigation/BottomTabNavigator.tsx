import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import TabOneScreen from '../screens/TabOneScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import TabThreeScreen from '../screens/TabThreeScreen'
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types'

// @ts-ignore
const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator (): any {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName='Email'
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name='Email'
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialTabBarIcon name='email-search-outline' color={color} />
        }}
      />
      <BottomTab.Screen
        name='Password'
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialTabBarIcon name='textbox-password' color={color} />
        }}
      />
      <BottomTab.Screen
        name='Breaches'
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialTabBarIcon name='shield-search' color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

function MaterialTabBarIcon (props: { name: string, color: string }): any {
  return <MaterialCommunityIcons size={30} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
// @ts-ignore
const TabOneStack = createStackNavigator<TabOneParamList>()

function TabOneNavigator (): any {
  const colorScheme = useColorScheme()
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name='TabOneScreen'
        component={TabOneScreen}
        options={{ headerTitle: 'Breach Checker', headerStyle: { backgroundColor: Colors[colorScheme].background} }}
      />
    </TabOneStack.Navigator>
  )
}

// @ts-ignore
const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator (): any {
  const colorScheme = useColorScheme()
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name='TabTwoScreen'
        component={TabTwoScreen}
        options={{ headerTitle: 'Breach Checker', headerStyle: { backgroundColor: Colors[colorScheme].background} }}
      />
    </TabTwoStack.Navigator>
  )
}

// @ts-ignore
const TabThreeStack = createStackNavigator<TabThreeParamList>()

function TabThreeNavigator (): any {
  const colorScheme = useColorScheme()
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name='TabThreeScreen'
        component={TabThreeScreen}
        options={{ headerTitle: 'Breach Checker', headerStyle: { backgroundColor: Colors[colorScheme].background} }}
      />
    </TabThreeStack.Navigator>
  )
}
