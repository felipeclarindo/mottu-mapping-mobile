import { ImageSourcePropType } from 'react-native';

export type ImageModal = {
  visible: boolean;
  onClose: () => void;
  imageSource: ImageSourcePropType;
};
