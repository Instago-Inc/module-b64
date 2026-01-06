# @instago/b64

Base64 helpers for ASCII/JSON/UTF-8 and URL-safe encoding.

- Version: 1.0.0
- Entry: index.js
- Exports: `{ encodeAscii, decodeAscii, encodeJson, decodeJson, utf8Bytes, b64url, b64urlFromUtf8 }`
- Dependencies: none

## API
- `encodeAscii(str)` / `decodeAscii(b64)` – standard base64 for ASCII strings.
- `encodeJson(obj)` / `decodeJson(b64)` – base64-encode JSON payloads.
- `utf8Bytes(str)` – UTF-8 byte array from a string.
- `b64url(bytes)` / `b64urlFromUtf8(str)` – URL-safe base64 without padding.

## Example
```js
const b64 = require('b64@1.0.0');

const encoded = b64.encodeAscii('hello');
const decoded = b64.decodeAscii(encoded);

const token = b64.b64urlFromUtf8('user:123');
```

## Notes
- Pure JS, no dependencies.

---
For more details, visit https://instago.ai.
