import { create } from "apisauce";
import AppConfiguration from "../config/AppConfiguration";

const apiClient = create({
  baseURL: AppConfiguration.BaseURL,
});

export default apiClient;
