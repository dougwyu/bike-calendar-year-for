# Calendar Year-For — Bike Outliner Extension

Adds a **Calendar: Year For** command that prompts for a year and generates that
year's full `Year → Month → Day` calendar — the same structure the core
[Calendar](https://github.com/bike-outliner/core-extensions/tree/main/src/calendar.bkext)
extension's `calendar:year` command creates, but for any year instead of only
the current one.

Useful for pre-creating next year's calendar (e.g. each October) or backfilling
a past year.

## Behavior

- Run **Calendar: Year For** from the command palette.
- Enter a 4-digit year (1000–9999). Invalid input re-prompts; Cancel does nothing.
- The year is inserted in chronological order among existing year rows — 2025
  lands before 2026, 2028 after 2027.
- Re-running for an existing year never duplicates rows; it reuses what's there
  and fills any gaps.

## Relationship to the core Calendar extension

This is a standalone extension. It copies the calendar-generation utilities from
the core Calendar extension so it runs independently, and it generates rows with
the same `YYYY/MM/DD` persistent IDs — so the rows it creates link to the core
Calendar's sidebar/inspector UI and are reused, never duplicated.

**Settings note:** Bike scopes extension defaults per extension, so this
extension cannot read your core Calendar settings. It uses the *default*
Calendar date formats and levels. If you have customized Calendar's formats, the
rows this extension creates will use the defaults instead (the IDs still match,
so nothing breaks — only the visible text of new rows may differ).

## Install

1. Build it with `npm install && npm run build` (see Development).
2. Quit Bike.
3. In Finder, press ⌘⇧G and go to `~/Library/Containers/com.hogbaysoftware.Bike/Data/Library/Application Support/Bike/Extensions/`.
4. Copy `out/extensions/calendar-year-for.bkext` into that folder, replacing any older copy.
5. Reopen Bike. Optionally bind a keyboard shortcut to `calendar:year-for` in Bike's keybindings.

Use Finder rather than `cp` in a shell: macOS protects Bike's container, and a shell without Full Disk Access gets `Operation not permitted`. Alternatively, `npm test` builds and installs in one step (see below).

## Development

```bash
npm install
npm run build
npm test        # run unit tests (Bike must be closed)
```

The build system is [`bike-ext`](https://github.com/bike-outliner/extension-kit).

`npm test` installs the build into Bike's sandboxed container (`~/Library/Containers/com.hogbaysoftware.Bike/...`), which macOS protects. Run it from Terminal with Full Disk Access granted (System Settings > Privacy & Security > Full Disk Access). From any other shell the install fails with `EPERM` and the tests silently run against whatever copy is already installed.

## Project structure

```
src/calendar-year-for.bkext/
├── manifest.json        no permissions
├── app/
│   ├── main.ts          command + year prompt
│   ├── parse-year.ts    parseYear validation helper
│   ├── calendar-rows.ts copied from core Calendar
│   └── util.ts          copied from core Calendar
├── dom/
│   └── protocols.ts     copied from core Calendar
└── tests/
    └── parse-year.test.ts  unit tests for parseYear
```
