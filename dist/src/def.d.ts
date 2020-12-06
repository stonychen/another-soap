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
interface IParameter {
    index: number;
    name: string;
    nsList: IXmlns[];
}
declare function Envelope(nsList: IXmlns[]): <T>(constructor: new () => T) => new () => T;
declare function AxiosConfig(config: AxiosRequestConfig): <T>(constructor: new () => T) => new () => T;
declare function Xmlns(nsList: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getXmlns(target: any, propertyKey: string): IXmlns[];
/**
 *
 * @param index the sequence of the paramters
 * @param name the name of the parameters, it will be compiled into request XML
 * @param nsList the xmlns definition
 */
declare function Parameter(index: number, name: string, nsList?: IXmlns[]): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getParameter(target: any, propertyKey: string): IParameter[];
declare function Protocol(val: string): <T>(constructor: new () => T) => new () => T;
declare function AxiosConfigForMethod(config?: AxiosRequestConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function getAxiosConfig(target: any, propertyKey?: string): AxiosRequestConfig;
export { Protocol, AxiosConfig, AxiosConfigForMethod, Xmlns, Envelope, Parameter, IXmlns, IParameter, NsType, getXmlns, getParameter, getAxiosConfig };
