import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { separatorStyles } from "../theme/styles";

const Separator = () => {
  const { colors } = useTheme();
  const styles = separatorStyles(colors);
  return <View style={styles.separator} />;
};

export default Separator;
