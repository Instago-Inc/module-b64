const t = require('utest@latest');
const b64 = require('b64@latest');

t.test('ascii encode/decode', () => {
  const enc = b64.encodeAscii('hello');
  const dec = b64.decodeAscii(enc);
  t.expect(dec).toBe('hello');
});

t.test('json encode/decode', () => {
  const e = b64.encodeJson({ a: 1, b: 'x' });
  const d = b64.decodeJson(e);
  t.expect(d.a).toBe(1);
  t.expect(d.b).toBe('x');
});

t.test('b64urlFromUtf8', () => {
  const url = b64.b64urlFromUtf8('a/b+c=');
  t.expect(/^[A-Za-z0-9_-]+$/.test(url)).toBe(true);
});

module.exports = { run: async (opts) => { await t.run(Object.assign({ quiet: true }, opts)); t.reset(); } };
