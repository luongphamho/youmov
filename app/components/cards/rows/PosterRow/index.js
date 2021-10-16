import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import ImagesModal from '../../../modals/ImagesModal';
import VideoModal from '../../../modals/VideoModal';
import { TouchableOpacity } from '../../../common/TouchableOpacity';
import { Image } from '../../../common/Image';

import { getResponsiveWidth } from '../../../../utils/dimensions';
import { getImageApi } from '../../../../utils/images';
import { getAvarageRating } from '../../../../utils/rating';

import styles from './styles';

const PLAY_WIDTH = getResponsiveWidth(7);
const STAR_HEIGHT = getResponsiveWidth(6);

const PosterRow = ({
  title,
  backdropPath,
  voteAverage,
  images,
  video,
  showImage,
  onPress
}) => {
  const videoModalRef = useRef(null);

  const handlePlayVideo = () => {
    videoModalRef.current?.open();
  };
  const {colors} = useTheme();
  return (
    <View style={styles.containerMainPhoto}>
      <Image
        accessibilityLabel={`${title} image`}
        uri={getImageApi(backdropPath)}
        resizeMode="cover"
        width="100%"
        height="100%"
      />
      {video && video.site === 'YouTube' && (
        <>
          <TouchableOpacity style={{...styles.play, backgroundColor: colors.pink}} onPress={handlePlayVideo}>
            <FontAwesome
              name="play"
              size={PLAY_WIDTH}
              color={colors.white}
              style={styles.buttonPlay}
            />
          </TouchableOpacity>
          <VideoModal
            ref={videoModalRef}
            keyId={video.key}
            style={styles.bottomModal}
            onClose={handlePlayVideo}
          />
        </>
      )}
      <TouchableOpacity
        style={styles.containerMainPhotoInfo}
        activeOpacity={images.length ? 0.5 : 1}
        onPress={images.length ? onPress : null}
      >
        <View style={styles.containerBackgroundPhotoInfo}>
          <Text numberOfLines={2} style={{...styles.photoInfo, color: colors.white}}>
            {title}
          </Text>
          <Text style = {{...styles.photoInfo, color: colors.white}}>
            {video.key}
          </Text>
          <View style={styles.photoStar}>
            {getAvarageRating(voteAverage).map((value) => (
              <FontAwesome
                key={value}
                name="star"
                size={STAR_HEIGHT}
                color={colors.white}
                style={styles.star}
              />
            ))}
          </View>
        </View>
      </TouchableOpacity>
      {images.length ? (
        <ImagesModal showImage={showImage} images={images} onClose={onPress} />
      ) : null}
    </View>
  );
};

export default PosterRow;
