import { assertEquals, assertStrictEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import { mimelite, mime } from './mime.ts'

Deno.test("getType() function", () => {
  // Upper/lower case
  assertEquals(mime.getType('text.txt'), 'text/plain');
  assertEquals(mime.getType('TEXT.TXT'), 'text/plain');

  // Bare extension
  assertEquals(mime.getType('txt'), 'text/plain');
  assertEquals(mime.getType('.txt'), 'text/plain');
  assertStrictEquals(mime.getType('.mousse'), undefined);
  assertStrictEquals(mime.getType('mousse'), undefined);

  // File paths
  assertEquals(mime.getType('dir/text.txt'), 'text/plain');
  assertEquals(mime.getType('dir\\text.txt'), 'text/plain');
  assertEquals(mime.getType('.text.txt'), 'text/plain');
  assertEquals(mime.getType('.txt'), 'text/plain');
  assertEquals(mime.getType('txt'), 'text/plain');
  assertEquals(mime.getType('/path/to/page.html'), 'text/html');
  assertEquals(mime.getType('c:\\path\\to\\page.html'), 'text/html');
  assertEquals(mime.getType('page.html'), 'text/html');
  assertEquals(mime.getType('path/to/page.html'), 'text/html');
  assertEquals(mime.getType('path\\to\\page.html'), 'text/html');
  assertStrictEquals(mime.getType('/txt'), undefined);
  assertStrictEquals(mime.getType('\\txt'), undefined);
  assertStrictEquals(mime.getType('text.nope'), undefined);
  assertStrictEquals(mime.getType('/path/to/file.mousse'), undefined);
  assertStrictEquals(mime.getType('/path/to/json'), undefined);
  assertStrictEquals(mime.getType('/path/to/.json'), undefined);
  assertStrictEquals(mime.getType('/path/to/.config.json'), 'application/json');
  assertStrictEquals(mime.getType('.config.json'), 'application/json');
});

Deno.test("getExtension() function", () => {
    assertEquals(mime.getExtension('text/html'), 'html');
    assertEquals(mime.getExtension(' text/html'), 'html');
    assertEquals(mime.getExtension('text/html '), 'html');
    assertStrictEquals(mime.getExtension('application/x-mousse'), undefined);
    assertStrictEquals(mime.getExtension('mousse'), undefined);
});

Deno.test("MDN in lite", () => {
  const MDN : Map<string, string> = new Map([
    ["aac", 'audio/aac'],
    ["abw", 'application/x-abiword'],
    ["arc", 'application/x-freearc'],
    ["avi", 'video/x-msvideo'],
    ["azw", 'application/vnd.amazon.ebook'],
    ["bin", 'application/octet-stream'],
    ["bmp", 'image/bmp'],
    ["bz", 'application/x-bzip'],
    ["bz2", 'application/x-bzip2'],
    ["csh", 'application/x-csh'],
    ["css", 'text/css'],
    ["csv", 'text/csv'],
    ["doc", 'application/msword'],
    ["docx", 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ["eot", 'application/vnd.ms-fontobject'],
    ["epub", 'application/epub+zip'],
    ["gz", 'application/gzip'],
    ["gif", 'image/gif'],
    ["htm", 'text/html'],
    ["html", 'text/html'],
    ["ico", 'image/vnd.microsoft.icon'],
    ["ics", 'text/calendar'],
    ["jar", 'application/java-archive'],
    ["jpeg", 'image/jpeg'],
    ["jpg", 'image/jpeg'],
    ["js", 'application/javascript'],
    ["json", 'application/json'],
    ["jsonld", 'application/ld+json'],
    ["mid", 'audio/midi'],
    ["midi", 'audio/midi'],
    ["mjs", 'application/javascript'],
    ["mp3", 'audio/mpeg'],
    ["mpeg", 'video/mpeg'],
    ["mpkg", 'application/vnd.apple.installer+xml'],
    ["odp", 'application/vnd.oasis.opendocument.presentation'],
    ["ods", 'application/vnd.oasis.opendocument.spreadsheet'],
    ["odt", 'application/vnd.oasis.opendocument.text'],
    ["oga", 'audio/ogg'],
    ["ogv", 'video/ogg'],
    ["ogx", 'application/ogg'],
    ["opus", 'audio/x-opus'],
    ["otf", 'font/otf'],
    ["png", 'image/png'],
    ["pdf", 'application/pdf'],
    ["php", 'application/php'],
    ["ppt", 'application/vnd.ms-powerpoint'],
    ["pptx", 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    ["rar", 'application/vnd.rar'],
    ["rtf", 'application/rtf'],
    ["sh", 'application/x-sh'],
    ["svg", 'image/svg+xml'],
    ["swf", 'application/x-shockwave-flash'],
    ["tar", 'application/x-tar'],
    ["tif", 'image/tiff'],
    ["tiff", 'image/tiff'],
    ["ts", 'video/mp2t'],
    ["ttf", 'font/ttf'],
    ["txt", 'text/plain'],
    ["vsd", 'application/vnd.visio'],
    ["wav", 'audio/wav'],
    ["weba", 'audio/webm'],
    ["webm", 'video/webm'],
    ["webp", 'image/webp'],
    ["woff", 'font/woff'],
    ["woff2", 'font/woff2'],
    ["xhtml", 'application/xhtml+xml'],
    ["xls", 'application/vnd.ms-excel'],
    ["xlsx", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    ["xml", 'application/xml'],
    ["xul", 'application/vnd.mozilla.xul+xml'],
    ["zip", 'application/zip'],
    ["3gp", 'video/3gpp'],
    ["3g2", 'video/3gpp2'],
    ["7z", 'application/x-7z-compressed'],
  ]);
  for (var ext of MDN.keys()) {
    assertEquals(mime.getType(ext), MDN.get(ext));
  }
})