# @mjeightyfive/moments-cli

> Rename Photos.app exported folders

CLI app to help convert exported folders from e.g.:
```
.
├── Amsterdam Airport Schiphol - Schiphol, North Holland, 10 June 2019
├── Griffintown - Montréal, QC, 11 June 2019
└── Oban - Scotland, 10 June 2019
```

to:

```
.
├── 2019-06-10 - Amsterdam Airport Schiphol - Schiphol, North Holland
├── 2019-06-10 - Oban - Scotland
└── 2019-06-11 - Griffintown - Montréal, QC
```

## Install

```
$ npm i -g @mjeightyfive/moments-cli
```

## Usage

```
$ moments
```

```
❯ moments --help

  Usage
    ❯ moments [path] [Default '.']

  Examples
    ❯ moments ./exported
    ✔ 2019-06-25
    ✔ 2019-06-26 - Riverside - Glasgow, Scotland
    ✔ 2019-06-27 - Ad Lib - Merchant City - Ingram Street
    ✔ 2019-06-28 - Walk In The Park
```

## License

MIT © [mjeightyfive](https://mje.fi)
