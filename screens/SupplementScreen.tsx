import React, {useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Button,
  View,
  LayoutAnimation,
} from 'react-native';
import TheText from '../base/TheText';
import {useSupplement} from '../queries/supplements';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';
import {usePrice} from '../queries/price';
import {useTableDiseases} from '../queries/diseases';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import WhiteBlock from '../base/WhiteBlock';

type Props = StackScreenProps<HomeStackParamList, 'Supplement'>;

const SupplementScreen = ({route, navigation}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<number | null>(null);

  const {supplementSlug} = route.params;
  console.log(supplementSlug);
  const supplement = useSupplement(supplementSlug);
  console.log(supplement.data);
  const price = usePrice(supplementSlug);
  console.log(price.data);
  const table_disease = useTableDiseases(supplementSlug);

  const toggleAccordion = (key: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveKey(activeKey === key ? null : key);
    setExpanded(!expanded);
  };

  return (
    <ScrollView>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <TheText>{supplement.data?.title}</TheText>
      <TheText>{supplement.data?.brand}</TheText>
      <TheText>{supplement.data?.serving_size}</TheText>
      <TheText>{supplement.data?.servings_per_container}</TheText>
      <TheText>{supplement.data?.serving_size_unit}</TheText>
      <TheText>{supplement.data?.suggested_use}</TheText>
      <TheText>{supplement.data?.slug}</TheText>
      <TheText>{supplement.data?.pic_reg}</TheText>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Methodology');
        }}>
        <TheText>{supplement.data?.rating}</TheText>
        <TheText>{supplement.data?.ingredient_count}</TheText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ListIngredients', {
            supplementSlug: supplement.data?.slug!,
          });
        }}>
        <TheText>List Ingredients</TheText>
      </TouchableOpacity>
      {supplement.data?.active_ingredients?.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ActiveIngredient', {
                activeIngredientSlug: item.slug,
              });
            }}>
            <TheText>{item.id}</TheText>
            <TheText>{item.title}</TheText>
            <TheText>{item.quantity}</TheText>
            <TheText>{item.units}</TheText>
            <TheText>{item.per_unit}</TheText>
            <TheText>{item.per_unit2}</TheText>
            <TheText>{item.ihearb_price_per_unit}</TheText>
          </TouchableOpacity>
        </View>
      ))}
      {supplement.data?.cards?.map(item => (
        <View key={item.id}>
          <TouchableOpacity
            style={{padding: 1}}
            onPress={() => {
              navigation.navigate('Diet', {
                dietSlug: item.slug,
              });
            }}>
            <TheText>{item.id}</TheText>
            <TheText>{item.title}</TheText>
            <TheText>{item.slug}</TheText>
            <TheText>{item.value}</TheText>
          </TouchableOpacity>
        </View>
      ))}
      <View>
        <TheText>{price.data?.status}</TheText>
        <TheText>{price.data?.old_price}</TheText>
        <TheText>{price.data?.current_price}</TheText>
        <TheText>{price.data?.shop_title}</TheText>
        <TheText>{price.data?.supplement_url}</TheText>
      </View>
      {table_disease?.data?.map(item => (
        <View key={item.id}>
          <WhiteBlock>
            <TouchableWithoutFeedback onPress={() => toggleAccordion(item.id)}>
              <TheText>{item.freq}</TheText>
              <TheText>{item.slug}</TheText>
              <TheText>{item.disease}</TheText>
            </TouchableWithoutFeedback>
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
      ))}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Review', {
            supplementSlug: supplement.data?.slug!,
          });
        }}>
        <TheText>Read more →</TheText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SupplementScreen;
