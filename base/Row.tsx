import React from 'react';

import {View, StyleSheet, ViewProps} from 'react-native';

const Row = ({style, children, ...restProps}: ViewProps) => {
  return (
    <View {...restProps} style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});