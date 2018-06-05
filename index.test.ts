import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { fromDeepSubject, fromObject, toObject } from ".";

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
    it("observable from deep subject", () => {
        const deepObj = fromObject({
            a: {
                b: "HELLO",
            },
        });
        const subscribe = jest.fn();
        fromDeepSubject(deepObj).pipe(map((v) => v.a.b.toLowerCase())).subscribe(subscribe);
        deepObj.a.b.next("GOODBYE");
        expect(subscribe.mock.calls.length).toBe(2);
        expect(subscribe.mock.calls[0][0]).toBe("hello");
        expect(subscribe.mock.calls[1][0]).toBe("goodbye");
    });
});
