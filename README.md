## Procedure to build dist/

`tsc --build` with
```json
"module": "ESNext",
"emitDeclarationOnly": false
```
then `tsc --build` with
```json
"module": "CommonJS",
"emitDeclarationOnly": false
```