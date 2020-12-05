import { SoapService } from "../src/index";
declare class SampleService extends SoapService {
    /**
     *
     * @param RequestHeader the parameters of header section
     */
    setHeader(requestHeader: any): this;
    /**
     *
     * @param firstParameter the first parameter
     * @param secondParameter  the second parameter
     */
    GetAdUnitsByStatement(firstParameter: any, secondParameter: any): Promise<import("axios").AxiosResponse<any>>;
    GetAnother(): Promise<import("axios").AxiosResponse<any>>;
}
export default SampleService;
