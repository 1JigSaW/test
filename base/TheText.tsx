import React, {useCallback} from 'react';

import {TextProps, Text} from 'react-native';
import {
  Black,
  Bold,
  ExtraBold,
  ExtraLight,
  Light,
  Medium,
  Regular,
  SemiBold,
  Thin,
} from '../fonts';
// import {BLACK} from '../../colors';

interface Props {
  bold?: boolean;
  extraBold?: boolean;
  black?: boolean;
  extraLight?: boolean;
  light?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  thin?: boolean;
  fontSize?: number;
  color?: string;
  letterSpacingPercent?: number;
}

const TheText = ({
  children,
  style,
  bold,
  extraLight,
  extraBold,
  black,
  light,
  medium,
  semiBold,
  thin,
  fontSize,
  color,
  letterSpacingPercent,
  ...restProps
}: TextProps & Props) => {
  const fontFamily = useCallback(() => {
    if (bold) {
      return Bold;
    }
    if (extraLight) {
      return ExtraLight;
    }
    if (extraBold) {
      return ExtraBold;
    }
    if (black) {
      return Black;
    }
    if (light) {
      return Light;
    }
    if (medium) {
      return Medium;
    }
    if (semiBold) {
      return SemiBold;
    }
    if (thin) {
      return Thin;
    }
    return Regular;
  }, [black, bold, extraBold, extraLight, light, medium, semiBold, thin]);

  const getFontSize = useCallback(() => {
    return fontSize || 20;
  }, [fontSize]);

  return (
    <Text
      {...restProps}
      style={[
        {
          letterSpacing: letterSpacingPercent
            ? getFontSize() * letterSpacingPercent * 0.01
            : undefined,
          fontFamily: fontFamily(),
          fontSize: getFontSize(),
          color: color || "black",
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TheText;