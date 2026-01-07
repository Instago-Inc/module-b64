(function(){
  function encodeAscii(input){
    const s = '' + (input || '');
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let out=''; let i=0;
    while(i<s.length){
      const a=s.charCodeAt(i++)&255;
      const b=i<s.length? s.charCodeAt(i++)&255 : NaN;
      const c=i<s.length? s.charCodeAt(i++)&255 : NaN;
      const b1=a>>2;
      const b2=((a&3)<<4)|(isNaN(b)?0:(b>>4));
      const b3=isNaN(b)?64:(((b&15)<<2)|(isNaN(c)?0:(c>>6)));
      const b4=isNaN(c)?64:(c&63);
      out+=chars.charAt(b1)+chars.charAt(b2)+(b3===64?'=':chars.charAt(b3))+(b4===64?'=':chars.charAt(b4));
    }
    return out;
  }
  function decodeAscii(input){
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let out=''; let i=0;
    const s=(''+(input||'')).replace(/[^A-Za-z0-9+/=]/g,'');
    while(i<s.length){
      const e1=chars.indexOf(s.charAt(i++));
      const e2=chars.indexOf(s.charAt(i++));
      const e3=chars.indexOf(s.charAt(i++));
      const e4=chars.indexOf(s.charAt(i++));
      const c1=(e1<<2)|(e2>>4);
      const c2=((e2&15)<<4)|(e3>>2);
      const c3=((e3&3)<<6)|e4;
      out+=String.fromCharCode(c1);
      if(e3!==64) out+=String.fromCharCode(c2);
      if(e4!==64) out+=String.fromCharCode(c3);
    }
    return out;
  }
  function encodeJson(obj){
    try { return encodeAscii(JSON.stringify(obj==null?{}:obj)); } catch { return ''; }
  }
  function decodeJson(b64){
    try { return JSON.parse(decodeAscii(b64||'')); } catch { return null; }
  }
  function utf8Bytes(str){
    const bytes=[]; for(let i=0;i<str.length;i++){ let cp=str.charCodeAt(i);
      if (cp>=0xd800 && cp<=0xdbff && i+1<str.length){ const next=str.charCodeAt(i+1); if(next>=0xdc00 && next<=0xdfff){ cp=((cp-0xd800)<<10)+(next-0xdc00)+0x10000; i++; }}
      if (cp<=0x7f) bytes.push(cp);
      else if (cp<=0x7ff){ bytes.push(0xc0|(cp>>6)); bytes.push(0x80|(cp&0x3f)); }
      else if (cp<=0xffff){ bytes.push(0xe0|(cp>>12)); bytes.push(0x80|((cp>>6)&0x3f)); bytes.push(0x80|(cp&0x3f)); }
      else { bytes.push(0xf0|(cp>>18)); bytes.push(0x80|((cp>>12)&0x3f)); bytes.push(0x80|((cp>>6)&0x3f)); bytes.push(0x80|(cp&0x3f)); }
    } return bytes;
  }
  function b64url(bytes){
    const table='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let out=''; let i=0; for(; i+2<bytes.length; i+=3){ const n=(bytes[i]<<16)|(bytes[i+1]<<8)|bytes[i+2]; out+=table[(n>>18)&63]+table[(n>>12)&63]+table[(n>>6)&63]+table[n&63]; }
    if (i<bytes.length){ let n=bytes[i]<<16; let pad='=='; if (i+1<bytes.length){ n|=bytes[i+1]<<8; pad='='; }
      out+=table[(n>>18)&63]+table[(n>>12)&63]+(pad==='=='?'=':table[(n>>6)&63])+pad; }
    return out.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/g,'');
  }
  function b64urlFromUtf8(str){ return b64url(utf8Bytes(String(str||''))); }
  module.exports = { encodeAscii, decodeAscii, encodeJson, decodeJson, utf8Bytes, b64url, b64urlFromUtf8 };
})();

if (require.main === module) {
  try {
    const s = 'hello';
    const enc = module.exports.encodeAscii(s);
    const dec = module.exports.decodeAscii(enc);
    if (dec !== s) throw new Error('encode/decode ascii failed');
    const j = { a: 1 };
    const encj = module.exports.encodeJson(j);
    const decj = module.exports.decodeJson(encj);
    if (!decj || decj.a !== 1) throw new Error('encode/decode json failed');
    const u = module.exports.b64urlFromUtf8('~test');
    if (!u || u.includes('+') || u.includes('/')) {
      throw new Error('b64urlFromUtf8 failed');
    }
    console.log('ok');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
