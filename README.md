# PixellotPlayerSDK

A cross-platform video player SDK — lightweight, event-driven, and easy to integrate.

---

## Overview

PixellotPlayerSDK lets you embed a fully featured video player into your app with just a few lines of code. It supports live and on-demand playback, highlight access, and a clean event-driven API that works consistently across platforms.

**Key features:**

- Programmatic and layout-file integration (Storyboard/XIB on iOS, XML on Android)
- Event-driven player lifecycle (`ready`, `playing`, `paused`, `buffering`, `finished`, `failed`)
- Highlight list delivered on player ready
- Auto-play and looping configuration

---

## Platform Guides

Choose your target platform to get started:

| Platform | Package | Min OS | Guide |
|---|---|---|---|
| **iOS** | CocoaPods `~> 1.0.3` | iOS 13.0+ | [iOS Integration Guide](README_IOS.md) |
| **Android** | Gradle `1.0.1` | SDK 29+ | [Android Integration Guide](README_ANDROID.md) |

---

## Requirements Summary

| | iOS | Android |
|---|---|---|
| **Min OS** | iOS 13.0+ | minSdk 29 |
| **Language** | Swift 5.9+ | Kotlin 2.0+ / Java 17 |
| **Tooling** | Xcode 15.0+ | compileSdk 36 |
| **Package manager** | CocoaPods | Gradle (Kotlin DSL) |

---

## License

See the [LICENSE](LICENSE) file for more information.
