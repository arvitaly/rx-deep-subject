import { BehaviorSubject } from "rxjs";

export type DeepSubject<T extends { [index: string]: any }> = {
    [P in keyof T]: T[P] extends object ?
    DeepSubject<T[P]> :
    BehaviorSubject<T[P]>; };
export function fromObject<T extends { [index: string]: any }>(obj: T): DeepSubject<T> {
    const res: any = {};
    Object.keys(obj).map((fieldName) => {
        res[fieldName] = typeof (obj[fieldName]) === "object" ?
            fromObject(obj[fieldName]) : new BehaviorSubject(obj[fieldName]);
    });
    return res;
}
export type UnpackedDeepSubject<T extends { [index: string]: any }> = {
    [P in keyof T]: T[P] extends BehaviorSubject<infer U> ?
    U : T[P] extends { [index: string]: any } ? UnpackedDeepSubject<T[P]> : T[P];
};
export function toObject<T>(obj: T): UnpackedDeepSubject<T> {
    const res: any = {};
    Object.keys(obj).map((fieldName) => {
        res[fieldName] = typeof ((obj as any)[fieldName]).getValue === "function" ?
            (obj as any)[fieldName].getValue() :
            toObject((obj as any)[fieldName]);
    });
    return res;
}
