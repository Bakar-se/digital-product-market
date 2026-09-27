# How the store shows a Polar download

Polar holds the file. The buyer is signed in on our store. Our server asks Polar for a personal download URL and shows that URL on our site. The URL is created at the moment the buyer asks for it, and it expires.

## Tie the buyer to a Polar customer

When our server creates the checkout, it sends the buyer's id as `external_customer_id`. After a successful checkout, Polar creates a customer with that external id. Webhooks then expose it as `customer.external_id`. If `external_customer_id` is set, Polar pre-fills the email and disables the email field, so the order stays linked to that buyer.

Source: [Checkout API — External Customer ID](https://polar.sh/docs/features/checkout/session)

## Create a customer session

Our server calls `POST /v1/customer-sessions/` with the organization access token. The scope is `customer_sessions:write`. The body can identify the customer by `external_customer_id` (our buyer's id).

The documented responses are `201` and `422`. The `201` body includes:

- `token`
- `expires_at`
- `customer_portal_url`
- `customer_id`

`token` authenticates later calls as that customer. Customer session tokens are short-lived. Polar's portal guide says to generate a fresh link when the customer asks, rather than storing the URL.

Sources:

- [Create Customer Session](https://polar.sh/docs/api-reference/customer-portal/sessions/create)
- [Navigate Customers to the Portal](https://polar.sh/docs/features/customer-portal/navigate-customers)

## Read the download URL

Our server calls `GET /v1/customer-portal/downloadables/` with `Authorization: Bearer <token>` from the customer session. The scope on that route is `customer_portal:read` or `customer_portal:write`, via the `customer_session` bearer scheme. An optional `benefit_id` query filters to one benefit.

A `200` body is `{ items, pagination }`. Each item has `id`, `benefit_id`, and `file`. The personal URL is `file.download.url`. `file.download.expires_at` is when that URL stops working. Polar describes this URL as signed and personal.

Sources:

- [List Downloadables](https://polar.sh/docs/api-reference/customer-portal/downloadables/list)
- [Automate Customer File Downloads](https://polar.sh/docs/features/benefits/file-downloads)

## When the buyer has not been granted the file

The list endpoint's documented success response is `200` with an `items` array. It does not document a separate error for a missing grant. A file the buyer has not been granted does not appear in `items`. The store should treat "not in the list" as "no download yet", and it should not store `file.download.url` past `expires_at`.

Source: [List Downloadables](https://polar.sh/docs/api-reference/customer-portal/downloadables/list)
