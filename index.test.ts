import { BehaviorSubject } from "rxjs";
import { fromObject, toObject } from ".";

describe("RxDeepSubject tests", () => {
    it("fromObject", () => {
        const deepSubject = fromObject({
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
            b: new BehaviorSubject("Hello"),
            c: {
                d: {
                    e: new BehaviorSubject("World"),
                },
            },
        };
        const obj = toObject(source);
        expect(obj.b + ", " + obj.c.d.e + "!").toBe("Hello, World!");
    });
});
