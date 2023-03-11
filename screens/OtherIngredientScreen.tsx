import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {FlatList, ListRenderItem, TouchableOpacity} from 'react-native';
import {useOtherIngredients} from '../queries/other_ingredients';
import TheText from '../base/TheText';
import {OtherIngredientInfo} from '../api/other_ingredients.api';

type Props = StackScreenProps<HomeStackParamList, 'OtherIngredient'>;

const OtherIngredientScreen = ({route, navigation}: Props) => {
  const {ingredientSlug} = route.params;
  const ingredient = useOtherIngredients(ingredientSlug);
  console.log(ingredient.data);

  const renderOtherIngredientInfo: ListRenderItem<OtherIngredientInfo> = ({
    item,
  }) => {
    return (
      <TouchableOpacity style={{padding: 1}}>
        <TheText>{item.title}</TheText>
        <TheText>{item.text_what_is_it}</TheText>
        <TheText>{item.text_vegan}</TheText>
        <TheText>{item.text_vegetarian}</TheText>
        <TheText>{item.text_hamful_for_human}</TheText>
        <TheText>{item.text_history}</TheText>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={ingredient.data} renderItem={renderOtherIngredientInfo} />
  );
};

export default OtherIngredientScreen;
