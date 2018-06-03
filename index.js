"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function fromObject(obj) {
    const res = {};
    Object.keys(obj).map((fieldName) => {
        res[fieldName] = typeof (obj[fieldName]) === "object" ?
            fromObject(obj[fieldName]) : new rxjs_1.BehaviorSubject(obj[fieldName]);
    });
    return res;
}
exports.fromObject = fromObject;
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
