# Security Policy

## Supported Versions

We actively support the latest version of this website and its dependencies. Security updates are applied as soon as vulnerabilities are discovered.

## Reporting a Vulnerability

If you discover a security vulnerability, please **do not** open a public issue. Instead, please report it via one of the following methods:

- Email: [Your email or security contact]
- GitHub Security Advisory: Use GitHub's private vulnerability reporting feature if available

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Updates

We take security seriously and will:
- Respond to security reports within 48 hours
- Provide regular security updates for dependencies
- Maintain a security audit process using `npm audit` and `go list -m -u`
- Document security fixes in CHANGELOG.md

## Dependency Security

This project uses:
- **npm** for Node.js dependencies - regularly audited with `npm audit`
- **Go modules** for Hugo theme dependencies - checked with `go list -m -u`

### Recent Security Updates

- **2025-01-19**: Updated mermaid from 9.2.1 to 11.12.1 to fix DOMPurify vulnerabilities
- **2025-01-19**: Replaced deprecated popper.js with @popperjs/core
- **2025-01-19**: Fixed 8 npm security vulnerabilities
- **2025-01-19**: Updated Hugo Toha theme to v4.12.0

## Best Practices

- Always keep dependencies up to date
- Run `npm audit` regularly
- Review security advisories for all dependencies
- Test thoroughly after security updates

## Security Checklist

When contributing, please ensure:
- [ ] No hardcoded secrets or credentials
- [ ] Dependencies are up to date
- [ ] No known security vulnerabilities (`npm audit` passes)
- [ ] Input validation is performed where appropriate
- [ ] Security headers are properly configured

Thank you for helping keep this project secure!

