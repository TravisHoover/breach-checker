export interface RootStackParamList {
  Root: undefined
  NotFound: undefined
}

export interface BottomTabParamList {
  Email: undefined
  Password: undefined
}

export interface TabOneParamList {
  TabOneScreen: undefined
}

export interface TabTwoParamList {
  TabTwoScreen: undefined
}

export interface EmailApiResult {
  item: {
    Name: string
  }
}

export interface TextInputReturnedText {
  nativeEvent: {
    text: string
  }
}
