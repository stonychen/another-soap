import { SoapService } from "../src/index";
declare class WeatherService extends SoapService {
    getRegionCountry(): Promise<import("axios").AxiosResponse<any>>;
    getRegionDataset(): Promise<import("axios").AxiosResponse<any>>;
}
export default WeatherService;
