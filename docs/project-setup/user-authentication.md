---
title: User Authentication
sidebar_position: 3
---

# User Authentication

Generate tokens and signatures on your backend, then authenticate users in the Mobile SDK.

:::info Prerequisites
Complete [Project Activation](./project-activation.md) before proceeding — you'll need the RSA private key generated there.
:::

## Backend — Generate Token & Signature

For each user, create a JSON payload:

```json
{
  "user_id": "your_internal_user_id",
  "timestamp": 1542179044,
  "expires_in": 1542179900
}
```

Then:

1. **Base64-encode** the JSON → this is the **token**
2. **Sign** the base64 string with your RSA private key using `SHA256` → this is the **signature**

Return both `token` and `signature` to your mobile app (e.g. via a REST endpoint).

:::tip Reference Implementation
See a full Node.js signing example at:
[https://gitlab.com/pixellot/sdk-data-signing](https://gitlab.com/pixellot/sdk-data-signing)
:::
