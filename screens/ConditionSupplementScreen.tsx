import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {
  FlatList,
  LayoutAnimation,
  ListRenderItem,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTableDiseases} from '../queries/diseases';
import TheText from '../base/TheText';
import {DiseaseSymptomTable} from '../api/diseases.api';
import WhiteBlock from '../base/WhiteBlock';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type Props = StackScreenProps<HomeStackParamList, 'ConditionSupplement'>;

const ConditionSupplementScreen = ({route, navigation}: Props) => {
  const {supplementSlug} = route.params;
  const [page, setPage] = useState<number>(1);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const conditions_supplement = useTableDiseases(supplementSlug, page);
  const [disease, setDisease] = useState<DiseaseSymptomTable[]>([]);

  // useMemo(() => {
  //   if (conditions_supplement.data) {
  //     setDisease(prevSupplements => [
  //       ...prevSupplements,
  //       ...conditions_supplement.data,
  //     ]);
  //   }
  // }, [conditions_supplement.data]);

  const HandleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleAccordion = (key: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveKey(activeKey === key ? null : key);
    setExpanded(!expanded);
  };

  const renderDiseaseSupplement: ListRenderItem<DiseaseSymptomTable> = ({
    item,
  }) => {
    return (
      <View key={item.id}>
        <WhiteBlock>
          <TouchableWithoutFeedback onPress={() => toggleAccordion(item.id)}>
            <TheText>{item.freq}</TheText>
            <TheText>{item.slug}</TheText>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Disease', {
                diseaseSlug: item.slug,
              });
            }}>
            <TheText>{item.disease}</TheText>
          </TouchableOpacity>
        </WhiteBlock>
        {expanded && activeKey === item.id && (
          <View>
            {item.without_symptoms ? (
              <View>
                {item.result?.map((sub_table, index) => (
                  <View key={index}>
                    <TheText>{sub_table.review}</TheText>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {item.result?.map((sub_table, index) => (
                  <View key={index}>
                    <TheText>{sub_table.symp}</TheText>
                    <TheText>{sub_table.freq2}</TheText>
                    {sub_table?.review?.map(review => (
                      <TheText>{review!}</TheText>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (conditions_supplement.data) {
      setDisease(prevSupplements => [
        ...prevSupplements,
        ...conditions_supplement.data,
      ]);
      setDisease(prevSupplements => [
        ...prevSupplements,
        ...conditions_supplement.data,
      ]);
    }
  }, [conditions_supplement.data]);

  return (
    <View>
      <TextInput
        style={{padding: 10, borderBottomWidth: 1}}
        placeholder="Search"
      />
      <FlatList
        data={disease}
        renderItem={renderDiseaseSupplement}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={HandleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default ConditionSupplementScreen;
