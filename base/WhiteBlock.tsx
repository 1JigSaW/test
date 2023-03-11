import React from 'react';

import {StyleSheet, ViewProps, Pressable, PressableProps} from 'react-native';

const WhiteBlock = ({
  style,
  children,
  ...restProps
}: PressableProps & ViewProps) => {
  return (
    <Pressable {...restProps} style={[styles.container, style]}>
      {children}
    </Pressable>
  );
};

export default WhiteBlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 32,
    padding: 24,
    overflow: 'hidden',
  },
});
