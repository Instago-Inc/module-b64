# module/b64 - V8 module

This module offers a small set of helpers for safely packaging short strings and JSON into Base64 for workflows and scripts. It is designed to keep simple data transformations predictable and easy to reason about.

Use it when you need a lightweight way to turn small payloads into Base64 (including URL-safe tokens) without bringing in extra dependencies. Learn more at https://instago.ai.

## Technical reference

### Exports
- `encodeAscii(str)` -> Base64 string for ASCII input.
- `decodeAscii(b64)` -> ASCII string from Base64 input.
- `encodeJson(obj)` -> Base64 string for JSON-serialized input, or `''` on failure.
- `decodeJson(b64)` -> parsed JSON object or `null` on parse failure.
- `utf8Bytes(str)` -> array of UTF-8 bytes.
- `b64url(bytes)` -> URL-safe Base64 string without padding.
- `b64urlFromUtf8(str)` -> URL-safe Base64 string from UTF-8 input.

### Usage
- Load with `require('b64@latest')`.
- Use `encodeAscii`/`decodeAscii` for ASCII-only data.
- Use `encodeJson`/`decodeJson` to round-trip JSON payloads.
- Use `b64url`/`b64urlFromUtf8` for URL-safe tokens (no `+`, `/`, or `=` padding).

### Configuration
- None. `env.json` declares no required or optional keys.

### Examples
```js
const b64 = require('b64@latest');

const encoded = b64.encodeAscii('hello');
const decoded = b64.decodeAscii(encoded);

const payload = b64.encodeJson({ a: 1 });
const obj = b64.decodeJson(payload);

const token = b64.b64urlFromUtf8('user:123');
```
