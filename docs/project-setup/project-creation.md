---
title: Project Creation
sidebar_position: 1
---

# Project Creation

## Registration

Contact your Pixellot representative and provide:

- **Project name** — a name to be associated with your project
- **Tenant** — the tenant associated with the project

Once processed, Pixellot will return a **Project ID** which you will use for:
- [Project Activation](./project-activation.md)
- Configuring thde mobile SDK
    - [iOS](../player-sdk/ios.md)
    - [Android](../player-sdk/android.md)

## Environments

Pixellot SDKs support two environments:

| Environment | Use case | Partner API endpoint |
|---|---|---|
| `production` | Release builds (App Store / Google Play) | `https://api.pixellot.tv/v1` |
| `staging` | Development and testing | `https://api.stage.pixellot.tv/v1` |

:::tip
You will typically want to activate your project in **both** environments — staging for development and production for release.
:::
<!-- 
## Example Projects

Browse full working examples in this repository:

- [iOS Sample App](https://github.com/your-org/pixellot-sdk-docs/tree/main/examples/ios)
- [Android Sample App](https://github.com/your-org/pixellot-sdk-docs/tree/main/examples/android)
-->