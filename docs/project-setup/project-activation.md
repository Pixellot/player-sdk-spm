---
title: Project Activation
sidebar_position: 2
---

# Project Activation

Activate your project via the Partner API and configure with the Project ID.

## Assumptions

- You have your own back-end
- You use Pixellot Partner API
- You have a Project ID from the [Project Creation](./project-creation.md) step

## Activation via Partner API

### Step 1 — Login

Login to the Partner API using credentials received from Pixellot:

```bash
curl -X POST 'https://api.pixellot.tv/v1/login' \
  -H 'Content-Type: application/json' \
  -d '{"username":"your-user","password":"your-password"}'
```

Save the `token` from the response — you'll need it in Step 4.

### Step 2 — Generate RSA Keys

Generate a private/public key pair using OpenSSL:

```bash
# Generate private key
openssl genrsa -out private.pem 4096

# Generate public key from private key
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

:::warning
Keep `private.pem` secure on your backend — it is used to sign user tokens.
:::

### Step 3 — Encode Public Key

Encode your `public.pem` into base64 format:

```bash
base64 -i public.pem
```

### Step 4 — Activate the Project

Send the encoded public key to the activation endpoint:

```bash
curl -X PATCH 'https://api.pixellot.tv/v1/sdk/projects/__PROJECT_ID__/activate' \
  -H 'Content-type: application/json' \
  -H 'Authorization: __TOKEN__' \
  -d '{"publicKey": "__BASE64_ENCODED_PUBLIC_KEY__"}'
```
