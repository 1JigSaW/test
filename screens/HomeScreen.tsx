import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import VerticalSpace from '../base/VerticalSpace';
import LogoWithText from '../components/icons/LogoWithText';
import Row from '../base/Row';
import TheText from '../base/TheText';
import BottleHome from '../components/icons/BottleHome';
import {useTopDiseases} from '../queries/diseases';
import {useTopSupplements} from '../queries/supplements';
import {Disease} from '../api/diseases.api';
import {TopSupplement} from '../api/supplements.api';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../App';

type Props = StackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const topDiseases = useTopDiseases();
  const topSupplements = useTopSupplements();
  const renderTopDisease: ListRenderItem<Disease> = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          navigation.navigate('Disease', {
            diseaseSlug: item.disease__slug,
          });
        }}>
        <TheText>{item.disease__title}</TheText>
      </TouchableOpacity>
    );
  };
  const renderTopSupplement: ListRenderItem<TopSupplement> = ({item}) => {
    return (
      <TouchableOpacity
        style={{padding: 1}}
        onPress={() => {
          navigation.navigate('Supplement', {
            supplementSlug: item.slug,
          });
        }}>
        <TheText>{item.title}</TheText>
        <TheText>{item.brand_name}</TheText>
        <TheText>{item.slug}</TheText>
        <TheText>{item.pic_reg}</TheText>
        <TheText>{item.full_title}</TheText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <VerticalSpace height={40} />
      <View style={styles.insideContainer}>
        <LogoWithText />
        <View style={styles.bottleBlock}>
          <Row>
            <BottleHome />
            {/*<TheText fontSize={30} bold>*/}
            {/*  {supplement.data?.title}*/}
            {/*</TheText>*/}
          </Row>
        </View>
      </View>
      <FlatList data={topDiseases.data} renderItem={renderTopDisease} />
      <FlatList data={topSupplements.data} renderItem={renderTopSupplement} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F0EA',
  },
  insideContainer: {
    marginLeft: 25,
  },
  textLogo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  bottleBlock: {
    marginTop: 30,
  },
});
