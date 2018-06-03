"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const _1 = require(".");
describe("RxDeepSubject tests", () => {
    it("fromObject", () => {
        const deepSubject = _1.fromObject({
            a: {
                b: {
                    c: {
                        d: "World",
                    },
                },
            },
            e: "Hello",
        });
        expect(deepSubject.e.getValue() + ", " + deepSubject.a.b.c.d.getValue() + "!").toBe("Hello, World!");
        deepSubject.e.next("Goodbye");
        deepSubject.a.b.c.d.next("Earth");
        expect(deepSubject.e.getValue() + ", " + deepSubject.a.b.c.d.getValue() + "!").toBe("Goodbye, Earth!");
    });
    it("toObject", () => {
        const source = {
            b: new rxjs_1.BehaviorSubject("Hello"),
            c: {
                d: {
                    e: new rxjs_1.BehaviorSubject("World"),
                },
            },
        };
        const obj = _1.toObject(source);
        expect(obj.b + ", " + obj.c.d.e + "!").toBe("Hello, World!");
    });
});
