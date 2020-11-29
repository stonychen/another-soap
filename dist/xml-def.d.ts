import Entity from './entity';
declare class XmlDef {
    protocol: string;
    env: string;
    envUrl: string;
    tem: string;
    private _temUrl;
    set temUrl(val: string);
    get temUrl(): string;
    defaultEnt: string;
    get defaultEntUrl(): string;
    arr: string;
    private _arrUrl;
    get arrUrl(): string;
    method: string;
    methodNs?: string;
    methodNsUrl?: string;
    headerEntities: Array<Entity>;
    bodyEntities: Array<Entity>;
    customNamespaces: string;
    toXML(): string;
    private encapsulateEnvelope;
    private encapsulateHeader;
    private encapsulateBody;
    private encapsulateEntity;
    private generateXml;
}
export { XmlDef, Entity };
