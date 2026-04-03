# PixellotPlayerSDK

A video player SDK for Android applications.

## Features

- Programmatic and XML layout support

## Requirements

- **minSdk**: 29
- **compileSdk**: 36
- **Kotlin**: 2.0+
- **Java**: 17

## Installation

<details>
<summary><strong>Gradle (Kotlin DSL)</strong></summary>

Add the dependency to your module's `build.gradle.kts`:

```kotlin
dependencies {
    implementation("tv.pixellot.video:player:1.0.1")
}
```

</details>

## Setup

Add your Pixellot project identifier to the host app's `AndroidManifest.xml` inside `<application>`:

```xml
<meta-data
    android:name="tv.pixellot.video.player.PROJECT_ID"
    android:value="your-project-id" />
```

The host app also needs network access (for example `android.permission.INTERNET` in the manifest).

## Usage

### Programmatic

```kotlin
import android.widget.LinearLayout
import tv.pixellot.video.player.VideoPlayerConfiguration
import tv.pixellot.video.player.VideoPlayerEvent
import tv.pixellot.video.player.VideoPlayerView

// 1. Create configuration
val config = VideoPlayerConfiguration(isAutoPlay = true, isLooping = false)

// 2. Create and add the player view
val playerView = VideoPlayerView(this).apply {
    layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT,
    )
    configuration = config
}
val root = LinearLayout(this).apply {
    orientation = LinearLayout.VERTICAL
    addView(playerView)
}
setContentView(root)

// 3. Subscribe to events
playerView.onEvent = { event ->
    when (event) {
        is VideoPlayerEvent.Ready -> println("Ready (${event.highlights.size} highlights)")
        VideoPlayerEvent.Playing -> println("Playing")
        VideoPlayerEvent.Paused -> println("Paused")
        VideoPlayerEvent.Buffering -> println("Buffering…")
        VideoPlayerEvent.Finished -> println("Finished")
        is VideoPlayerEvent.Failed -> println("Error: ${event.error.message}")
    }
}

// 4. Load an event
playerView.load(
    eventId = "your-event-id",
    token = "your-token",
    signature = "your-signature",
)
```

When the player is ready, `VideoPlayerEvent.Ready` includes the highlight list for the loaded event.

### XML layouts

1. Add `VideoPlayerView` to your layout:

```xml
<tv.pixellot.video.player.VideoPlayerView
    android:id="@+id/playerView"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

2. In `onCreate` / `onViewCreated`, assign configuration and load:

```kotlin
playerView.configuration = VideoPlayerConfiguration(isAutoPlay = true)
playerView.onEvent = { event -> /* … */ }
playerView.load(
    eventId = "your-event-id",
    token = "your-token",
    signature = "your-signature",
)
```

## License

See the LICENSE file for more info.
