# rx-deep-subject

RxJS util for converting plain JS-object to object in which every property is either object or BehaviorSubject of primitive.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Install

    npm install rx-deep-subject --save

    or

    yarn add rx-deep-subject

# Usage

```typescript
import { fromObject, toObject } from "rx-deep-subject";
const deepSubject = fromObject({
    a: {
        b: "Hello",
    },
    d: "World",
});
// Set next value for BehaviorSubject
deepSubject.a.b.next("Goodbye");
const obj = toObject(deepSubject);
console.log(obj); // { a: { b: 'Goodbye' }, d: 'World' }
```

# API

```typescript

fromObject<T extends { [index: string]: any }>(obj: T): DeepSubject<T>;

toObject<T>(obj: T): UnpackedDeepSubject<T>;

type DeepSubject<T extends { [index: string]: any }> = {
    [P in keyof T]: T[P] extends object ?
    DeepSubject<T[P]> :
    BehaviorSubject<T[P]>; };
type UnpackedDeepSubject<T extends { [index: string]: any }> = {
    [P in keyof T]: T[P] extends BehaviorSubject<infer U> ?
    U : T[P] extends { [index: string]: any } ? UnpackedDeepSubject<T[P]> : T[P];
};
```

# Test

    npm install
    npm test

[npm-image]: https://badge.fury.io/js/rx-deep-subject.svg
[npm-url]: https://npmjs.org/package/rx-deep-subject
[travis-image]: https://travis-ci.org/arvitaly/rx-deep-subject.svg?branch=master
[travis-url]: https://travis-ci.org/arvitaly/rx-deep-subject
[daviddm-image]: https://david-dm.org/arvitaly/rx-deep-subject.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arvitaly/rx-deep-subject
[coveralls-image]: https://coveralls.io/repos/arvitaly/rx-deep-subject/badge.svg
[coveralls-url]: https://coveralls.io/r/arvitaly/rx-deep-subject