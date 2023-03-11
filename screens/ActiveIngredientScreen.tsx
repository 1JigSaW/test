import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ListRenderItem,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {
  useActiveIngredients,
  useActiveIngredientsSupplements,
} from '../queries/active_ingredients';
import TheText from '../base/TheText';
import {ActiveIngredientSupplement} from '../api/active_ingredients.api';

type Props = StackScreenProps<HomeStackParamList, 'ActiveIngredient'>;

const ActiveIngredientScreen = ({route, navigation}: Props) => {
  const [page, setPage] = useState<number>(1);
  const [activeIngredients, setActiveIngredients] = useState<
    ActiveIngredientSupplement[]
  >([]);
  const {activeIngredientSlug} = route.params;
  const activeIngredient = useActiveIngredients(activeIngredientSlug);
  console.log(activeIngredient.data);
  console.log(activeIngredientSlug);
  const active_ingredient_supplement = useActiveIngredientsSupplements(
    activeIngredientSlug,
    page,
  );

  const HandleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderActiveIngredientsSupplement: ListRenderItem<
    ActiveIngredientSupplement
  > = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('Supplement', {
            supplementSlug: item.slug,
          });
        }}>
        <TheText>{item.supplement}</TheText>
        <TheText>{item.brand}</TheText>
        <TheText>{item.pic}</TheText>
        <TheText>
          {item.price} for one {item.unit}
        </TheText>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (active_ingredient_supplement.data?.supplyments) {
      setActiveIngredients(prevIngredients => [
        ...prevIngredients,
        ...active_ingredient_supplement.data?.supplyments,
      ]);
    }
  }, [active_ingredient_supplement.data?.supplyments]);

  return (
    <View>
      <TextInput
        style={{padding: 10, borderBottomWidth: 1}}
        placeholder="Search"
      />
      <FlatList
        data={activeIngredients}
        renderItem={renderActiveIngredientsSupplement}
        onEndReached={HandleEndReached}
        ListHeaderComponent={
          <View>
            {activeIngredient.data && (
              <TheText>{activeIngredient.data[0].title}</TheText>
            )}
          </View>
        }
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default ActiveIngredientScreen;
