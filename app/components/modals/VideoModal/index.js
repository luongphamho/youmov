import React, { forwardRef, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Modal } from '../Modal';
import Spinner from '../../common/Spinner';
import { getResponsiveHeight } from '../../../utils/dimensions';
import { useTheme } from '@react-navigation/native';
import styles from './styles';

const Loading = () => { 
  const {colors} = useTheme();
  return(<Spinner style={{...styles.container, backgroundColor: colors.white}} />)};

const VideoModal = forwardRef(({ keyId, onVisible, style }, ref) => {
  const webViewRef = useRef(null);
  const initialHeight = getResponsiveHeight(100);
  const [height, setHeight] = useState(initialHeight - 150);
  const handleLayout = ({ layout }) => {
    setHeight(layout.height);
  };
  const {colors} = useTheme();
  return (
    <Modal ref={ref} onClose={onVisible} style={style} onLayout={handleLayout}>
      <WebView
        ref={webViewRef}
        source={{ uri: `https://www.youtube.com/embed/${keyId}?start=0` }}
        startInLoadingState
        renderLoading={Loading}
        style={{ height }}
      />
    </Modal>
  );
});

export default VideoModal;
