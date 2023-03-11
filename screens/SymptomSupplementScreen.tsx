import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {
  FlatList,
  LayoutAnimation,
  ListRenderItem,
  TextInput,
  View,
} from 'react-native';
import TheText from '../base/TheText';
import WhiteBlock from '../base/WhiteBlock';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useTableSymptoms} from '../queries/symptom';
import {SymptomTable} from '../api/symptom.api';

type Props = StackScreenProps<HomeStackParamList, 'SymptomSupplement'>;

const SymptomSupplementScreen = ({route, navigation}: Props) => {
  const {supplementSlug} = route.params;
  const [page, setPage] = useState<number>(1);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const symptoms_supplement = useTableSymptoms(supplementSlug, page);
  const [symptom, setSymptom] = useState<SymptomTable[]>([]);

  const HandleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleAccordion = (key: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveKey(activeKey === key ? null : key);
    setExpanded(!expanded);
  };

  const renderSymptomSupplement: ListRenderItem<SymptomTable> = ({item}) => {
    return (
      <View key={item.id}>
        <WhiteBlock>
          <TouchableWithoutFeedback onPress={() => toggleAccordion(item.id)}>
            <TheText>{item.symptom}</TheText>
            <TheText>{item.frequency}</TheText>
          </TouchableWithoutFeedback>
        </WhiteBlock>
        {expanded && activeKey === item.id && (
          <View key={item.id}>
            {item.result?.map((sub_table, index) => (
              <View key={index}>
                <TheText>{sub_table.review}</TheText>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (symptoms_supplement.data) {
      setSymptom(prevSupplements => [
        ...prevSupplements,
        ...symptoms_supplement.data,
      ]);
      setSymptom(prevSupplements => [
        ...prevSupplements,
        ...symptoms_supplement.data,
      ]);
    }
  }, [symptoms_supplement.data]);

  return (
    <View>
      <TextInput
        style={{padding: 10, borderBottomWidth: 1}}
        placeholder="Search"
      />
      <FlatList
        data={symptom}
        renderItem={renderSymptomSupplement}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={HandleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
export default SymptomSupplementScreen;
