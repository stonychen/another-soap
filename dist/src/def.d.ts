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
interface IXmlns {
    ns: string;
    nsUrl: string;
    nsType?: NsType;
}
interface IXmlnsForParameters {
    index: number;
    name: string;
    Nss: IXmlns[];
}
declare function XmlnsForClass(nsList: IXmlns[]): <T>(constructor: new () => T) => new () => T;
declare function XmlnsForMethod(nsList: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getXmlns(target: any, propertyKey: string): IXmlns[];
declare function XmlnsForParameters(index: number, name: string, nsList: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getXmlnsForParameters(target: any, propertyKey: string): IXmlnsForParameters[];
declare function Protocol(val: string): <T>(constructor: new () => T) => new () => T;
declare function AxiosConfig(config?: AxiosRequestConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getAxiosConfig(target: any, propertyKey?: string): AxiosRequestConfig;
export { Protocol, AxiosConfig, XmlnsForMethod, XmlnsForClass, XmlnsForParameters, IXmlns, IXmlnsForParameters, NsType, getXmlns, getXmlnsForParameters, getAxiosConfig };
