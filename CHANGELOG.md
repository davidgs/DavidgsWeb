# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security
- Updated `mermaid` from 9.2.1 to 11.12.1 to fix high-severity security vulnerabilities (DOMPurify XSS and prototype pollution)
- Replaced deprecated `popper.js` (v1.16.1) with `@popperjs/core` (v2.11.8) for Bootstrap 5 compatibility
- Fixed 8 npm security vulnerabilities (6 automatically fixed, 2 via mermaid update)
- Updated Hugo Toha theme from v4.6.0 to v4.12.0

### Changed
- Updated npm dependencies to latest secure versions
- Migrated from deprecated popper.js to @popperjs/core

## [Previous Versions]

Previous changes were not tracked in this changelog format.

