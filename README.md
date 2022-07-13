## Katrade Accounts
Katrade Accounts is a authentication service that integrates with Kasetsart University API (Unofficial Project).
Katrade Accounts adapts the core concept of OAuth2.0 standard and be as an API adapter that plugs in to **myapi.ku.th**
which is a part of Kasetsart University APIs.

#### Properties you need to know before using Katrade Accounts API

| Properties  | Description                                                                                      | Example                        |
|-------------|--------------------------------------------------------------------------------------------------|--------------------------------|
| `client_id` | Client ID of your registered application                                                         | `67b176705b4620661421`         |
| `scope`     | Data scope, a permission level that allows this login session to view users data.                | (Only `0` available right now) |
| `ref`       | Reference string, use for referencing request between Katrade Accounts API and your application. | `"helloReferences"`            |
