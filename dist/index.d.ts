import "reflect-metadata";
import { AxiosRequestConfig } from "axios";
import { axiosConfig, axiosConfigForMethod, envelope, xmlns, param, IXmlns, NsType } from "./def";
declare class SoapService {
    private header;
    private headerIXmlnsList;
    private protocol;
    private axiosConfig;
    private nsList;
    private _reflectOnce;
    private _requestXml;
    get requestXml(): string;
    private _flag;
    private reflect;
    /**
     * Used fot setup header for XML header
     * @param params the params of the XML header
     */
    setHeader(...params: any[]): this;
    /**
     *
     * @param method the name of the request action under XML Body, like "GetData"
     * @param params the params of the method
     */
    request(method: string, ...params: any[]): Promise<import("axios").AxiosResponse<any>>;
    private buildNs;
    private toXml;
    private buildSection;
    private encapsulateEntities;
    private generateXml;
    private getNs;
    private get tem();
    private get ns();
    private get arr();
    private get ent();
}
export { SoapService, envelope, axiosConfig, axiosConfigForMethod, xmlns, param, IXmlns, NsType, AxiosRequestConfig };
