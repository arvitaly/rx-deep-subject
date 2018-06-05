"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ChildrenSymbol = Symbol("Deep subject's children");
function fromObject(obj) {
    const res = {};
    let children = [];
    Object.keys(obj).map((fieldName) => {
        if (typeof (obj[fieldName]) === "object") {
            const child = fromObject(obj[fieldName]);
            children = children.concat(child[ChildrenSymbol]);
            res[fieldName] = child;
        }
        else {
            res[fieldName] = new rxjs_1.BehaviorSubject(obj[fieldName]);
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
exports.fromObject = fromObject;
function fromDeepSubject(deepSubject) {
    return rxjs_1.combineLatest(...deepSubject[ChildrenSymbol])
        .pipe(operators_1.map(() => toObject(deepSubject)));
}
exports.fromDeepSubject = fromDeepSubject;
function toObject(obj) {
    const res = {};
    Object.keys(obj).map((fieldName) => {
        res[fieldName] = typeof (obj[fieldName]).getValue === "function" ?
            obj[fieldName].getValue() :
            toObject(obj[fieldName]);
    });
    return res;
}
exports.toObject = toObject;
