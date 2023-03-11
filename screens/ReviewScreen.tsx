import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import TheText from '../base/TheText';

type Props = StackScreenProps<HomeStackParamList, 'Review'>;

const ReviewScreen = ({route, navigation}: Props) => {
  const {supplementSlug} = route.params;
  return (
    <View>
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('ConditionSupplement', {
            supplementSlug: supplementSlug,
          });
        }}>
        <TheText>Conditions</TheText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('SymptomSupplement', {
            supplementSlug: supplementSlug,
          });
        }}>
        <TheText>Symptoms</TheText>
      </TouchableOpacity>
    </View>
  );
};
export default ReviewScreen;
