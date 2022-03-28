# Security

## Dependencies audit

From time to time it's reasonable to audit dependencies for security issues and fix found issues.

### Manual (local)

Use the following command to perform audit check and apply automatic fixes if possible.

```bash
yarn audit:fix
```

### Automated (CI)

The dependencies audit procedure should be automated by leveraging tools like [Dependabot](https://github.com/dependabot), or [GitHub Actions](https://github.com/features/actions) in conjunction with [Snyk](https://snyk.io/) and similar tools.

## Code scanning

Source code should be regularly checked for vulnerabilities by leveraging [GitHub Actions](https://github.com/features/actions) with tools like [CodeQL](https://codeql.github.com/) and similar. See more here [CodeQL Action](https://github.com/github/codeql-action)

## Shell scripts

Always inspect shell scripts before executing it on your machine.
