import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SupplementScreen from './screens/SupplementScreen';
import DiseaseScreen from './screens/DiseaseScreen';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createStackNavigator} from '@react-navigation/stack';
import ListIngredientScreen from './screens/ListIngredientScreen';
import OtherIngredientScreen from './screens/OtherIngredientScreen';
import ActiveIngredientScreen from './screens/ActiveIngredientScreen';
import DietScreen from './screens/DietScreen';
import DietSearchScreen from './screens/DietSearchScreen';
import MethodologyScreen from './screens/MethodologyScreen';
import ReviewScreen from './screens/ReviewScreen';
import ConditionSupplementScreen from './screens/ConditionSupplementScreen';
import SymptomSupplementScreen from './screens/SymptomSupplementScreen';

export type HomeStackParamList = {
  Home: undefined;
  Supplement: {supplementSlug: string};
  Disease: {diseaseSlug: string};
  ListIngredients: {supplementSlug: string};
  OtherIngredient: {ingredientSlug: string};
  ActiveIngredient: {activeIngredientSlug: string};
  Diet: {dietSlug: string};
  DietSearch: {dietSearchSlug: string};
  Methodology: undefined;
  Review: {supplementSlug: string};
  ConditionSupplement: {supplementSlug: string};
  SymptomSupplement: {supplementSlug: string};
};
const queryClient = new QueryClient();

const HomeStack = createStackNavigator<HomeStackParamList>();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Supplement"
            component={SupplementScreen}
            options={{headerShown: false}}
          />
          <HomeStack.Screen name="Disease" component={DiseaseScreen} />
          <HomeStack.Screen
            name="ListIngredients"
            component={ListIngredientScreen}
          />
          <HomeStack.Screen
            name="OtherIngredient"
            component={OtherIngredientScreen}
          />
          <HomeStack.Screen
            name="ActiveIngredient"
            component={ActiveIngredientScreen}
          />
          <HomeStack.Screen name="Diet" component={DietScreen} />
          <HomeStack.Screen name="DietSearch" component={DietSearchScreen} />
          <HomeStack.Screen name="Methodology" component={MethodologyScreen} />
          <HomeStack.Screen name="Review" component={ReviewScreen} />
          <HomeStack.Screen
            name="ConditionSupplement"
            component={ConditionSupplementScreen}
          />
          <HomeStack.Screen
            name="SymptomSupplement"
            component={SymptomSupplementScreen}
          />
          {/*<HomeStack.Screen name="Symptom" component={SymptomScreen} />*/}
        </HomeStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
