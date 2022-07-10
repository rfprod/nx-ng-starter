# tools/ts

Tools that should be used with `ts-node`.

- `colors.ts` - coloring utility;
- `coverage-stats.ts` - generates coverage stats from jest json reports, and outputs as `UNIT_COVERAGE.md` file;
- `package-commands.ts` - outputs (optionally filters) commands defined in the `package.json`;
- `update.ts` - partially automates dependencies update process, uses `ncu`, and `nx migrate`;

## Usage

All commands should be used via angular cli.

### Help (package commands)

```bash
ng run tools:help
```

### Coverage stats

```bash
ng run tools:coverage-stats
```

### Update

```bash
ng run tools:update
```
