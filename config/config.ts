// packages imports
import Constants from 'expo-constants';

// types imports
import { EnvironmentVariablesProps } from './../types/EnvironmentVariables';

// env
const env: EnvironmentVariablesProps = {
    ...(Constants.manifest?.extra ?? {}),
}

// exporting the env
export default env;
