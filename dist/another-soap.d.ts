import SoapEntity from './soap-entity';
export default class AnotherSoap {
    firstLine: string;
    env: string;
    envUrl: string;
    tem: string;
    private _temUrl;
    set temUrl(val: string);
    get temUrl(): string;
    defaultEnt: string;
    get defaultEntUrl(): string;
    arr: string;
    arrUrl: string;
    method: string;
    methodNs?: string;
    methodNsUrl?: string;
    headerEntities: Array<SoapEntity>;
    bodyEntities: Array<SoapEntity>;
    customNamespaces: string;
    toXML(): string;
    private encapsulateEnvelope;
    private encapsulateHeader;
    private encapsulateBody;
    private encapsulateEntity;
    private convert2xml;
    private handleArrayChildren;
}
