import { SoapService } from "../src/index";
declare class ExampleService extends SoapService {
    /**
     *
     * @param RequestHeader the one of parameters of header section
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
export default ExampleService;
