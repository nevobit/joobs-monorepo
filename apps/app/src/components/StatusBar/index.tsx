import {View, StatusBar as DefaultStatusBar, Platform, StatusBarProps} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 0 : DefaultStatusBar.currentHeight;

const StatusBar = ({backgroundColor, barStyle, ...props}: StatusBarProps) => {
  return (
    <View
      style={{
        height: STATUSBAR_HEIGHT,
        marginTop: -10,
        backgroundColor: backgroundColor
      }}>
      <DefaultStatusBar translucent barStyle={barStyle} backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default StatusBar;