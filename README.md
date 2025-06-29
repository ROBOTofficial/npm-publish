# Npm Publish Action

## Usage

```yml
on:
  push:
    branches: main

jobs:
  publish:
    name: Release (NPM)

    permissions:
      contents: read
      id-token: write

    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: "https://registry.npmjs.org"

      - name: Publish
        uses: ROBOTofficial/npm-publish@v1
        with:
          npm-token: ${{ secrets.NPM_TOKEN }}
```

## Inputs

| Name              | Type   | Default                                  | Description                              |
| ----------------- | ------ | ---------------------------------------- | ---------------------------------------- |
| `npm-token`       | string | **required**                             | Npm registry's token                     |
| `published-check` | bool   | true                                     | check if this version has been published |
| `run`             | string |                                          | run command before publish               |
| `install`         | string | npm install                              | custom install command                   |
| `publish`         | string | npm publish --provenance --access public | custom publish command                   |
