import "reflect-metadata";
import { AxiosRequestConfig } from "axios";
declare enum NamespaceType {
    Envelope = 0,
    Tem = 1,
    EntityNS = 2,
    XMLSchema = 3,
    XMLSchemaInstance = 4,
    Undefined = 5
}
declare function Xmlns(namespace: string, namespaceUrl: string, namespaceType?: NamespaceType): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare function AxiosConfig(config?: AxiosRequestConfig): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
declare class SoapService {
    envelope: null;
    header: any;
    body: any[];
    request(method: string): Promise<unknown>;
}
export { AxiosConfig, AxiosRequestConfig, Xmlns, SoapService, NamespaceType };
