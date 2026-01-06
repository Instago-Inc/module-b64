# module/b64 - V8 module

Simple helpers for turning strings and JSON into Base64 and back, plus URL-safe Base64 for tokens and IDs. This module is designed for small, predictable transformations that are easy to use in workflows and scripts.

Use it when you want clear, low-friction encoding without relying on Node.js APIs. Learn more at https://instago.ai.

## Technical reference

### Exports
- `encodeAscii(str)` -> base64 string for ASCII input.
- `decodeAscii(b64)` -> ASCII string from base64 input.
- `encodeJson(obj)` -> base64 string for JSON-serialized input.
- `decodeJson(b64)` -> parsed JSON object or `null` on parse failure.
- `utf8Bytes(str)` -> array of UTF-8 bytes.
- `b64url(bytes)` -> URL-safe base64 string without padding.
- `b64urlFromUtf8(str)` -> URL-safe base64 string from UTF-8 input.

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
