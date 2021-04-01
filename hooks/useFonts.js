import * as Font from "expo-font";
import { BerkshireSwash_400Regular } from "@expo-google-fonts/berkshire-swash";
import { Inter_300Light } from "@expo-google-fonts/inter";
import {
  Muli_300Light,
  Muli_400Regular,
  Muli_800ExtraBold,
  Muli_900Black,
} from "@expo-google-fonts/muli";
import {
  Poppins_300Light,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export default useFonts = async () => {
  await Font.loadAsync({
    Berkshire: BerkshireSwash_400Regular,
    Inter: Inter_300Light,
    Muli: Muli_300Light,
    MuliRegular: Muli_400Regular,
    MuliBold: Muli_800ExtraBold,
    MuliExtraBold: Muli_900Black,
    Poppins: Poppins_300Light,
    PoppinsRegular: Poppins_400Regular,
  });
};
