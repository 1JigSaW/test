import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {FlatList, ListRenderItem, TouchableOpacity, View} from 'react-native';
import {useSupplement} from '../queries/supplements';
import {OtherIngredient} from '../api/supplements.api';
import TheText from '../base/TheText';

type Props = StackScreenProps<HomeStackParamList, 'ListIngredients'>;

const ListIngredientScreen = ({route, navigation}: Props) => {
  const {supplementSlug} = route.params;
  const supplement = useSupplement(supplementSlug);

  const renderOtherIngredient: ListRenderItem<OtherIngredient> = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('OtherIngredient', {
            ingredientSlug: item.url,
          });
        }}>
        <TheText>{item.name}</TheText>
        <TheText>{item.value}</TheText>
        <TheText>{item.url}</TheText>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={supplement.data?.list_ingredients}
        renderItem={renderOtherIngredient}
      />
    </View>
  );
};

export default ListIngredientScreen;
