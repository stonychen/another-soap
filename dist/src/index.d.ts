import "reflect-metadata";
import { AxiosRequestConfig } from "axios";
import { AxiosConfig, AxiosConfigForCls, XmlnsForCls, XmlnsForMethod, XmlnsForParameters, IXmlns, NsType } from "./def";
/**
 * The most easiest Soap Service for node.js
 */
declare class SoapService {
    private header;
    private headerXmlnsList;
    private protocol;
    private axiosConfig;
    private nsList;
    private _reflectOnce;
    private _flag;
    private reflect;
    /**
     * Used fot setup header for XML header
     * @param parameters the parameters of the XML header
     */
    setHeader(...parameters: any[]): this;
    /**
     *
     * @param method the name of the request action under XML Body, like "GetData"
     * @param parameters the parameters of the method
     */
    request(method: string, ...parameters: any[]): Promise<import("axios").AxiosResponse<any>>;
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
export { AxiosConfig, AxiosConfigForCls, IXmlns, AxiosRequestConfig, XmlnsForCls, XmlnsForMethod, XmlnsForParameters, SoapService, NsType };
