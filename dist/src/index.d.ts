import "reflect-metadata";
import { AxiosRequestConfig } from "axios";
declare enum NsType {
    Namespace = 0,
    EntityNS = 1,
    XMLSchema = 2,
    XMLSchemaInstance = 3,
    Array = 4,
    Tem = 5,
    Undefined = 6
}
declare function Xmlns(namespace: string, namespaceUrl: string, namespaceType?: NsType): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function XmlnsForParameters(index: number, name: string, nsList: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
interface IXmlns {
    ns: string;
    nsUrl: string;
    nsType?: NsType;
}
interface IEntity {
    param: any;
    xmlnsList: IXmlns[];
}
declare function AxiosConfig(config?: AxiosRequestConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
/**
 * The most easiest Soap Service for node.js
 */
declare class SoapService {
    /**
     * envelope is used for override, and put namespaces
     */
    envelope: null;
    private header;
    private headerXmlnsList;
    private body;
    private bodyXmlnsList;
    private _protocol;
    private _envNs;
    private _method;
    private _axiosConfig;
    private _parseFlag;
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
}
export { AxiosConfig, IXmlns, IEntity, AxiosRequestConfig, Xmlns, XmlnsForParameters, SoapService, NsType };
