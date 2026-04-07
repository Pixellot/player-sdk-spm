---
title: Partner API (PAPI)
sidebar_position: 1
---

# Partner API (PAPI)

Use the Pixellot Partner API to manage events, retrieve event IDs, and integrate with your backend.

:::info Full API Reference
[https://app.swaggerhub.com/apis/Pixellot/partner_api/1.22.0](https://app.swaggerhub.com/apis/Pixellot/partner_api/1.22.0)
:::

## Base Endpoints

| Environment | URL |
|---|---|
| Production | `https://api.pixellot.tv/v1` |
| Staging | `https://api.stage.pixellot.tv/v1` |

## Authentication

All Partner API calls require a token obtained via the login endpoint:

```bash
curl -X POST 'https://api.pixellot.tv/v1/login' \
  -H 'Content-Type: application/json' \
  -d '{"username":"your-user","password":"your-password"}'
```

Use the returned token in the `Authorization` header of all subsequent calls:

```bash
-H 'Authorization: <token>'
```

## Fetching Events

Events contain the video content. Retrieve a list of events:

```bash
curl -X GET 'https://api.pixellot.tv/v1/events' \
  -H 'Authorization: <token>'
```

The `_id` field in each event object is the **event ID** used when loading the Player SDK.

## Fetching a Single Event

```bash
curl -X GET 'https://api.pixellot.tv/v1/events/<event-id>' \
  -H 'Authorization: <token>'
```

Pass the event ID to the player:

```swift
// iOS
playerView.load(eventID: "<event-id>", token: "your-token", signature: "your-signature")
```

```kotlin
// Android
playerView.load(eventId = "<event-id>", token = "your-token", signature = "your-signature")
```
