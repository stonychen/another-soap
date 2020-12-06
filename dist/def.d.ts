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
interface IParam {
    index: number;
    name: string;
    nsList: IXmlns[];
}
declare function envelope(nsList: IXmlns[]): <T>(constructor: new () => T) => new () => T;
declare function axiosConfig(config: AxiosRequestConfig): <T>(constructor: new () => T) => new () => T;
declare function xmlns(nsList: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getXmlns(target: any, propertyKey: string): IXmlns[];
/**
 *
 * @param index the sequence of the paramters
 * @param name the name of the params, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
declare function param(index: number, name: string, nsList?: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getParam(target: any, propertyKey: string): IParam[];
declare function protocol(val: string): <T>(constructor: new () => T) => new () => T;
declare function axiosConfigForMethod(config?: AxiosRequestConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getAxiosConfig(target: any, propertyKey?: string): AxiosRequestConfig;
export { protocol, axiosConfig, axiosConfigForMethod, xmlns, envelope, param, IXmlns, IParam, NsType, getXmlns, getParam, getAxiosConfig };
