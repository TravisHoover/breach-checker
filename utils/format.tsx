import { Text } from "../components/Themed";
import React from "react";

export const removeATags = (text: string): string => {
  return text.replace(/<a.*?>/g, "").replace(/<\/a>/g, "");
}

export const renderViewMore = (onPress: any) => {
  return(
    <Text style={{ textAlign: 'center', color: 'darkblue' }} onPress={onPress}>View more</Text>
  )
}
export const renderViewLess = (onPress: any) => {
  return(
    <Text style={{ textAlign: 'center', color: 'darkblue' }} onPress={onPress}>View less</Text>
  )
}
