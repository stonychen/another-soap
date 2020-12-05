import { SoapService } from "../src/index";
declare class SampleService extends SoapService {
    envelope: null;
    /**
     *
     * @param RequestHeader the parameters of header section
     */
    setHeader(RequestHeader: any): this;
    /**
     *
     * @param firstParameter the first parameter
     * @param secondParameter  the second parameter
     */
    getAdUnitsByStatement(firstParameter: any, secondParameter: any): Promise<unknown>;
    getAnother(): Promise<unknown>;
}
export default SampleService;
