import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
const ChildrenSymbol = Symbol("Deep subject's children");
export type DeepSubject<T extends { [index: string]: any }> = {
    [P in keyof T]: T[P] extends object ?
    DeepSubject<T[P]> :
    BehaviorSubject<T[P]>; };
export function fromObject<T extends { [index: string]: any }>(obj: T): DeepSubject<T> {
    const res: any = {};
    let children: Array<BehaviorSubject<any>> = [];
    Object.keys(obj).map((fieldName) => {
        if (typeof (obj[fieldName]) === "object") {
            const child: any = fromObject(obj[fieldName]);
            children = children.concat(child[ChildrenSymbol]);
            res[fieldName] = child;
        } else {
            res[fieldName] = new BehaviorSubject(obj[fieldName]);
            children.push(res[fieldName]);
        }
    });
    Object.defineProperty(res, ChildrenSymbol, {
        enumerable: false,
        configurable: false,
        value: children,
        writable: false,
    });
    return res;
}
export function fromDeepSubject<T>(deepSubject: T): Observable<UnpackedDeepSubject<T>> {
    return combineLatest(...(deepSubject as any)[ChildrenSymbol])
        .pipe(map(() => toObject(deepSubject))) as any;
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
