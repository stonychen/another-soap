import "reflect-metadata";
import { AxiosRequestConfig } from "axios";
import { AxiosConfig, XmlnsForClass, XmlnsForMethod, XmlnsForParameters, IXmlns, NsType } from "./def";
/**
 * The most easiest Soap Service for node.js
 */
declare class SoapService {
    private header;
    private headerXmlnsList;
    private body;
    private protocol;
    private _axiosConfig;
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
    request(method: string, ...parameters: any[]): Promise<unknown>;
    private buildNs;
    private toXml;
    private encapsulateSection;
    private encapsulateEnt;
    private getNs;
    private get tem();
    private get ns();
    private get arr();
    private get ent();
}
export { AxiosConfig, IXmlns, AxiosRequestConfig, XmlnsForClass, XmlnsForMethod, XmlnsForParameters, SoapService, NsType };
