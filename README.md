# MIME Type

An API module for MIME Type completely inspired by [node mime module](https://github.com/broofa/mime).

## Disclaimer

I needed a deno/ts compatible version of [node mime module](https://github.com/broofa/mime) for [Mousse](https://github.com/tyrenn/mousse) development but I don't deserve any credit for it. The mime types data are the plain files built [node mime module](https://github.com/broofa/mime) developers. No building logic is implemented for now so future versions will need an update for the standard and other mime types data constants based on files built by the [node mime module](https://github.com/broofa/mime) team.
Even this readme file was largely inspired by their great work so defenitely check it out.

## Install and use

Import either lite or full version of MIME object.
You can easily get the Content-Type of any extensions or the extensions of any content type.

```ts
import { mime, mimelite } from "https://github.com/tyrenn/mimetypes/mod.ts"

mime.getType('txt');                    // ⇨ 'text/plain'
mime.getExtension('text/plain');        // ⇨ 'txt'

```

## API

### MimeTypeMap interface

MimeTypeMap interface is a simple interface to type the data object on which Mime objects are defined.

### new Mime(...typeMap : MimeTypeMap)

You can build your own Mime type after importing Mime Class

```ts
// Import Mime class and MimeTypeMap
import { Mime, MimeTypeMap } from "https://github.com/tyrenn/mimetypes/mod.ts"

// Define mime type map
const mytypeMap : MimeTypeMap = {
  'text/abc': ['abc', 'alpha', 'bet'],
  'text/def': ['leppard']
};

// Create and use Mime instance
const myMime = new Mime(typeMap);
myMime.getType('abc');            // ⇨ 'text/abc'
myMime.getExtension('text/def');  // ⇨ 'leppard'
```

### mime.getType(pathOrExtension : string)

Get mime type for the given path or extension

```ts
mime.getType('js');             // ⇨ 'application/javascript'
mime.getType('json');           // ⇨ 'application/json'

mime.getType('txt');            // ⇨ 'text/plain'
mime.getType('dir/text.txt');   // ⇨ 'text/plain'
mime.getType('dir\\text.txt');  // ⇨ 'text/plain'
mime.getType('.text.txt');      // ⇨ 'text/plain'
mime.getType('.txt');           // ⇨ 'text/plain'
```

Undefined is returned in cases where an extension isn't detected, recognized or known.
```ts
mime.getType('foo/txt');  // ⇨ undefined
mime.getType('mousse');   // ⇨ undefined
```

### mime.getExtension(type : string)

In the same way you can get the extension based on mime type with charset options ignored.

```ts
mime.getExtension('text/plain');               // ⇨ 'txt'
mime.getExtension('application/json');         // ⇨ 'json'
mime.getExtension('text/html; charset=utf8');  // ⇨ 'html'
```
Undefined is returned in cases where an mime type isn't detected, recognized or known.

```ts
mime.getExtension('foo/txt');  // ⇨ undefined
mime.getExtension('mousse');   // ⇨ undefined
```

### mime.define(typeMap : MimeTypeMap, force : boolean = false)

Define more mime type mapping

```ts
mime.define({
  'text/abc': ['abc', 'alpha', 'bet'],
  'text/def': ['leppard']
});

myMime.getType('abc');            // ⇨ 'text/abc'
myMime.getExtension('text/def');  // ⇨ 'leppard'
```

