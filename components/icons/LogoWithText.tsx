import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Row from '../../base/Row';
import TheText from '../../base/TheText';
import LogoIcon from './LogoIcon';

const LogoWithText = ({easterNavigation}: {easterNavigation?: () => void}) => {
  const [easterCounter, setEasterCounter] = useState(0);

  const easterEgg = () => {
    if (easterNavigation) {
      if (easterCounter === 7) {
        setEasterCounter(0);
        easterNavigation();
      } else {
        setEasterCounter(easterCounter + 1);
      }
    }
  };

  return (
    <TouchableWithoutFeedback disabled={!easterNavigation} onPress={easterEgg}>
      <Row style={styles.container}>
        <TheText letterSpacingPercent={-3} bold>
          Self
        </TheText>
        <LogoIcon size={6} />
        <TheText letterSpacingPercent={-3} black>
          Insight
        </TheText>
      </Row>
    </TouchableWithoutFeedback>
  );
};

export default LogoWithText;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
});
