import { View, Text, Image } from '../../common'
import React from 'react'
import { DUMMY_IMAGE } from "../../../shared/constants";

const Header = ({ header }) => {
  return (
    <View className="h-56 bg-secondary_900 relative flex items-center z-10 mb-16">
      <View className="w-[90%] h-60 bg-white rounded-lg absolute -bottom-12 ">
        <Image
          className="w-[101%] h-full rounded-lg object-cover"
          source={{ uri: DUMMY_IMAGE }} />
        <View className="absolute w-10 h-10 bottom-3 left-3 border-2 border-white rounded-full">
          <Image
            className="w-full h-full rounded-full object-cover"
            source={{ uri: "https://avatars.githubusercontent.com/u/61446115?v=4" }}
          />
        </View>
      </View>
    </View>
  )
}
export default Header
