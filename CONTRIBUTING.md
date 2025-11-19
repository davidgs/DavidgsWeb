# Contributing to DavidgsWeb

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the bug
- Expected vs actual behavior
- Your environment (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please create an issue describing:
- The feature or improvement you'd like to see
- Why it would be useful
- Any potential implementation ideas

### Translation Improvements

This website is available in multiple languages:
- English (native)
- French (ML translated)
- German (ML translated)
- Spanish (ML translated)
- Dutch (ML translated)

Native speakers are especially encouraged to improve translations! Please:
1. Fork the repository
2. Make your translation improvements
3. Submit a pull request with a clear description of changes

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Go dependencies:
   ```bash
   go mod download
   ```
4. Run Hugo development server:
   ```bash
   hugo server
   ```

## Dependency Updates

When updating dependencies:
- Always run `npm audit` to check for security vulnerabilities
- Update `CHANGELOG.md` with security fixes
- Test thoroughly after dependency updates
- Follow semantic versioning for major updates

## Questions?

Feel free to open an issue for any questions or concerns.

Thank you for contributing!

