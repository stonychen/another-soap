import { XmlDef } from './xml-def';
declare class Soap {
    xmlDef: XmlDef;
    arrayNodes: RegExp[];
    escape: boolean;
    post(url: string, headers?: {}, options?: {}): Promise<unknown>;
    get(url: string, headers?: {}, options?: {}): Promise<unknown>;
    delete(url: string, headers?: {}, options?: {}): Promise<unknown>;
    put(url: string, headers?: {}, options?: {}): Promise<unknown>;
    request(url: string, method: 'post' | 'get' | 'delete' | 'put', headers?: {}, options?: {}): Promise<unknown>;
}
export default Soap;
