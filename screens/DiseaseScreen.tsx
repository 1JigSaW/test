import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {useDiseasesSupplements, useSearchDiseases} from '../queries/diseases';
import TheText from '../base/TheText';
import {DiseaseSupplement} from '../api/diseases.api';
import WhiteBlock from '../base/WhiteBlock';

type Props = StackScreenProps<HomeStackParamList, 'Disease'>;

const DiseaseScreen = ({route, navigation}: Props) => {
  const {diseaseSlug} = route.params;
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [supplements, setSupplements] = useState<DiseaseSupplement[]>([]);
  const disease_supplement = useDiseasesSupplements(diseaseSlug, page);
  const search = useSearchDiseases(query, diseaseSlug);

  const HandleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderDiseaseSupplement: ListRenderItem<DiseaseSupplement> = ({
    item,
  }) => {
    return (
      <WhiteBlock>
        <TouchableOpacity
          style={{padding: 1}}
          onPress={() => {
            navigation.navigate('Supplement', {
              supplementSlug: item.slug,
            });
          }}>
          <TheText>{item.supplement}</TheText>
          <TheText>{item.brand}</TheText>
          <TheText>{item.frequency}</TheText>
          <TheText>{item.count_dis}</TheText>
          <TheText>{item.pic}</TheText>
        </TouchableOpacity>
      </WhiteBlock>
    );
  };

  useEffect(() => {
    if (disease_supplement.data?.supplyments) {
      setSupplements(prevSupplements => [
        ...prevSupplements,
        ...disease_supplement.data?.supplyments,
      ]);
    }
  }, [disease_supplement.data?.supplyments]);

  const handleSearch = (text: string) => {
    setQuery(text);
    console.log(search);
  };

  return (
    <View>
      {/*<TheText>{disease_supplement.data?.title}</TheText>*/}
      {/*<TheText>{disease_supplement.data?.count}</TheText>*/}
      <TextInput
        style={{padding: 10, borderBottomWidth: 1}}
        onChangeText={handleSearch}
        placeholder="Search"
        value={query}
      />
      <FlatList
        data={}
        renderItem={renderDiseaseSupplement}
        onEndReached={HandleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default DiseaseScreen;
