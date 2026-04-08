---
title: Webhook subscriptions
sidebar_position: 2
---

# Webhook subscriptions

### 1. Overview

As Pixellot’s solution contains many components, getting notifications about significant occurrences is one of its key functionalities. The manner in which this can be achieved is with the **webhooks subscription** mechanism.

To use this mechanism, you inform Pixellot of your endpoint, your tenant, and the type of data to which you want to subscribe. In response, every time an occurrence happens for such data, Pixellot will `POST` data to your endpoint along with the header `X-Pixellot-Signature`, which includes a hash of the data.

### 2. How to subscribe

`POST [Base-URL]/subscriptions`

Use the same base URL as the [Partner API] (for example `https://api.pixellot.tv/v1` in production).

Request body schema:

| Field | Type | Description |
| --- | --- | --- |
| `messageType` | string | Subscription name: `EventChanges`, `EventTimestamp`, `ClipNotification`. |
| `url` | string | URL to which Pixellot’s platform will `POST` webhook payloads. |
| `tenant` | string | Your tenant identifier. |
| `secret` | string | If provided, used as the HMAC key to generate the hex digest in `X-Pixellot-Signature`. Use this to authenticate the message when received. |
| `emails` | string | One or more email addresses, comma-separated, where Pixellot sends notifications for misbehaving subscriptions. |

Example body:

```json
{
  "tenant": "tenantName",
  "messageType": "EventChanges",
  "url": "https://webhook.dev.example.com/9f031f7e-ad8c-42b5-94a0",
  "secret": "some-secret",
  "emails": "example@pixellot.tv"
}
```

Webhook handlers on Pixellot’s side are designed to ignore broken URLs after reaching a significant number of retries.

If webhook messages are not received within a reasonable time, verify that the target URL is valid and accepts incoming requests. During testing of a new integration, you may want to clean up old testing data that will not be needed later.

### 3. How to verify a message

The `X-Pixellot-Signature` header authenticates the message when received. Compare it to an HMAC-SHA1 hex digest of the **raw request body** using your subscription `secret`.

Sample Node.js verification:

```javascript
const crypto = require('crypto');

const originalSecret = 'secret';
const receivedMessage = 'Hook data'; // Use the raw POST body string
const expectedDigest = '...'; // Value from X-Pixellot-Signature

const computedDigest = crypto
  .createHmac('sha1', originalSecret)
  .update(receivedMessage)
  .digest('hex');

if (computedDigest === expectedDigest) {
  console.log('Data is consistent.');
} else {
  console.log('Data is not consistent.');
}
```

### 4. How to update a subscription

`PUT [Base-URL]/subscriptions/{id}`

`{id}` is the identifier of the subscription to update.

### 5. How to unsubscribe

`DELETE [Base-URL]/subscriptions/{id}`

`{id}` is the identifier of the subscription to remove.

### 6. What do you get when you subscribe?

You can subscribe to several message types: **EventChanges**, **EventTimestamp**, **ClipNotification**, and **TeamChange**.

#### 6.1 EventTimestamp

When you subscribe to `EventTimestamp`, payloads match this shape:

```text
{
    eventId: string,
    what: string,
    when: Date,
    event: {
        name: string,
        venueId: string,
        status: string,
        startDate: Date,
        endDate: Date,
        productionType: string,
        location: string
    }
}
```

`what` is one of:

- `scheduled`
- `eventInitStarted`
- `eventEndReached`

These messages are sent when each of the above stages occurs for an event.

The order of messages per event can differ. That is expected and should be handled accordingly by your integration.

#### 6.2 EventChanges

Event changes are most important for users who do not manage their own event scheduling, but they are useful for any integration: you can monitor your own changes and confirm they were applied.

When you subscribe to `EventChanges`, payloads match this shape:

```text
{
    eventId: string,
    name: string,
    status: string,
    startDate: string,
    endDate: string,
    productionType: string,
    location: string,
    labels: {
        clubId: string,
        tags: [string],
        teams: {
            homeTeamId: string,
            awayTeamId: string
        }
    }
}
```

`status` is one of:

| Value | Meaning |
| --- | --- |
| `active` | Corresponds to “upcoming” through “live” stages of the event. |
| `archiving` | Intermediate status before transitioning to archived. |
| `archived` | Event has transitioned to VOD—after being live or after a manual upload. Event updates are still allowed for VOD. |
| `vodDeleted` | Event recordings were removed from storage per the tenant’s content lifecycle policy. |
| `deleted` | Similar to `vodDeleted`, but the event record is also removed from CMS. |

Additional parameters may be added to `labels` later.

This message is sent with only the changed data when an event is created, updated, or deleted.

#### 6.3 ClipNotification

When you subscribe to `ClipNotification`, payloads match this shape:

```text
{
    eventId: string,
    url: string,
    when: Date,
    clipType: string,
    userId: string,
    format: string
}
```

`clipType` is one of:

- `userGeneratedHighlightFromClips`
- `userGeneratedHighlightFromTags`
- `userGeneratedClip`
- `adminTagBasedAutomaticHighlight`
- `adminUploadedHighlight`
- `automaticProductionHighlight`
- `playerHighlight`

This message is sent when a new clip or highlight is created.

**Webhook examples**

Automatic production highlight:

```json
{
  "eventId": "5ea556414a48ef1badad31cd",
  "tenant": "Tenant",
  "when": "2020-04-26T11:17:27.855Z",
  "clipType": "automaticProductionHighlight",
  "format": "hls",
  "clipId": "b4a0e6f124dfgb497a942e9"
}
```

Player highlight from a basketball event using crowdsource:

```json
{
  "eventId": "5ea55641c9ca8ef1adad37cd",
  "tenant": "Tenant",
  "when": "2020-04-27T09:31:06.554Z",
  "clipType": "playerHighlight",
  "clipDurationSeconds": 11,
  "format": "hls",
  "clipId": "5ea6b65ab44558b4dcf34e6b",
  "playerNumber": "2",
}
```
