import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {useDietsSupplements} from '../queries/diet';
import {
  FlatList,
  ListRenderItem,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TheText from '../base/TheText';
import {DietSupplement} from '../api/diets.api';

type Props = StackScreenProps<HomeStackParamList, 'DietSearch'>;

const DietSearchScreen = ({route, navigation}: Props) => {
  const {dietSearchSlug} = route.params;
  const [page, setPage] = useState<number>(1);
  const [supplements, setSupplements] = useState<DietSupplement[]>([]);
  const diet_supplements = useDietsSupplements(dietSearchSlug, page);

  console.log(diet_supplements.data);

  const HandleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderDietSupplement: ListRenderItem<DietSupplement> = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('Supplement', {
            supplementSlug: item.slug,
          });
        }}>
        <TheText>{item.title}</TheText>
        <TheText>{item.brand}</TheText>
        <TheText>{item.pic}</TheText>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (diet_supplements.data?.supplyments) {
      setSupplements(prevSupplements => [
        ...prevSupplements,
        ...diet_supplements.data?.supplyments,
      ]);
    }
  }, [diet_supplements.data?.supplyments]);

  return (
    <View>
      <TextInput
        style={{padding: 10, borderBottomWidth: 1}}
        placeholder="Search"
      />
      <FlatList
        data={supplements}
        renderItem={renderDietSupplement}
        onEndReached={HandleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default DietSearchScreen;
