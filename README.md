# PixellotPlayerSDK

Pre-built XCFramework distribution of the [Pixellot](https://pixellot.tv) video player SDK for iOS.

> **Source code** is maintained in a separate private repository.  
> This repository contains only the compiled binary release artifacts.

---

## Requirements

- iOS 13.0+
- Swift 5.9+
- Xcode 15+

---

## Installation

### Swift Package Manager

Add the package in Xcode via **File → Add Package Dependencies** and enter:

```
https://github.com/Pixellot/player-sdk-spm
```

Or add it to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/Pixellot/player-sdk-spm.git", from: "1.0.0")
],
targets: [
    .target(
        name: "YourTarget",
        dependencies: ["PixellotPlayerSDK"]
    )
]
```

### CocoaPods

Add to your `Podfile`:

```ruby
pod 'PixellotPlayerSDK', '~> 1.0'
```

Then run:

```bash
pod install
```

---

## Quick Start

```swift
import PixellotPlayerSDK

// Create the player view
let playerView = VideoPlayerView()
view.addSubview(playerView)

// Configure and load
let config = VideoPlayerConfiguration(autoplay: true)
playerView.load(url: URL(string: "https://example.com/stream.m3u8")!, configuration: config)
```

---

## Releases

Binary artifacts are published automatically on each tagged release.  
See the [Releases](https://github.com/Pixellot/player-sdk-spm/releases) page for the full changelog.

---

## License

PixellotPlayerSDK is available under the MIT license. See the [LICENSE](LICENSE) file for details.

This SDK includes [NpawPlugin](https://npaw.com) (MIT) and [GCDWebServer](https://github.com/swisspol/GCDWebServer) (BSD).
