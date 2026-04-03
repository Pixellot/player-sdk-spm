# PixellotPlayerSDK

A video player SDK for iOS applications.

## Features

- Programmatic and Storyboard / XIB support

## Requirements

- iOS 13.0+
- Swift 5.9+
- Xcode 15.0+

## Installation

### CocoaPods

Add the following to your `Podfile`:

```ruby
pod 'PixellotPlayerSDK', '~> 1.0.3'
```

Then run:

```bash
pod install
```

## Setup

Add your Pixellot project identifier to the host app's `Info.plist`:

```xml
<key>PixellotProjectID</key>
<string>your-project-id</string>
```

## Usage

### Programmatic

```swift
import PixellotPlayerSDK

// 1. Create configuration
let config = VideoPlayerConfiguration(isAutoPlay: true, isLooping: false)

// 2. Create and add the player view
let playerView = VideoPlayerView(configuration: config)
playerView.translatesAutoresizingMaskIntoConstraints = false
view.addSubview(playerView)

NSLayoutConstraint.activate([
    playerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
    playerView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
    playerView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
    playerView.heightAnchor.constraint(equalTo: playerView.widthAnchor, multiplier: 9.0 / 16.0)
])

// 3. Subscribe to events
playerView.onEvent = { event in
    switch event {
    case .ready(let highlights): print("Ready (\(highlights.count) highlights)")
    case .playing:  print("Playing")
    case .paused:   print("Paused")
    case .buffering: print("Buffering…")
    case .finished: print("Finished")
    case .failed(let error): print("Error: \(error.localizedDescription)")
    }
}

// 4. Load an event
playerView.load(eventID: "your-event-id", token: "your-token", signature: "your-signature")
```

When the player is ready, ``VideoPlayerEvent/ready(highlights:)`` delivers event highlights provided.

### Storyboard / XIB

1. Drop a `UIView` onto your layout and set its **Custom Class** to `VideoPlayerView`.
2. In `viewDidLoad`, assign a configuration before loading:

```swift
playerView.configuration = VideoPlayerConfiguration(isAutoPlay: true)
playerView.onEvent = { event in /* … */ }
playerView.load(eventID: "your-event-id", token: "your-token", signature: "your-signature")
```

## License

See the LICENSE file for more info.
