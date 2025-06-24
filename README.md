# Npm Publish Action

## Usage

```yml
on:
  push:
    branches: main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - uses: ROBOTofficial/npm-publish@1
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
