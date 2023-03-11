import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {useDiet} from '../queries/diet';
import {ScrollView, TouchableOpacity} from 'react-native';
import TheText from '../base/TheText';

type Props = StackScreenProps<HomeStackParamList, 'Diet'>;

const DietScreen = ({route, navigation}: Props) => {
  const {dietSlug} = route.params;
  const diet = useDiet(dietSlug);
  console.log(diet.data);
  return (
    <ScrollView>
      <TheText>{diet?.data && diet?.data[0]?.title}</TheText>
      <TheText>{diet?.data && diet?.data[0]?.what_ingr_text}</TheText>
      <TheText>{diet?.data && diet?.data[0]?.what_text}</TheText>
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('DietSearch', {
            dietSearchSlug: dietSlug,
          });
        }}>
        <TheText>{diet?.data && diet?.data[0]?.title} supplyments base</TheText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DietScreen;
