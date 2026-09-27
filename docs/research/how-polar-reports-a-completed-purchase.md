# How Polar reports a completed purchase

A one-time purchase in US dollars becomes an order. The store learns it completed from `order.paid`. The store learns the file was granted from `benefit_grant.created`. A free product still creates an order, and that order is marked paid immediately.

## A one-time purchase is an order

Polar creates an order when a customer checks out a non-recurring product. That order's `billing_reason` is `purchase`.

Source: [Orders — When orders are created](https://polar.sh/docs/features/orders)

## Which webhook means the purchase completed

Polar emits an event on each order state change:

- `order.created` — a new order exists. It is not necessarily paid. The changelog says the status on this event might not be `paid`, and integrations that treated `order.created` as success should switch to `order.paid`.
- `order.paid` — the order has been collected. This is the event for a completed purchase.
- `order.updated` — something on the order changed.
- `order.refunded` — a refund was issued.

`order.paid` is sent when the order is fully processed and paid.

Sources:

- [Orders — Webhooks](https://polar.sh/docs/features/orders)
- [Webhook Events](https://polar.sh/docs/integrate/webhooks/events)
- [API Changelog — New order status and webhooks](https://polar.sh/docs/changelog/api)

## Which webhook means the file was granted

File downloads are a benefit. A customer who bought a product that has the benefit gets access to it.

A benefit grant can point at the order that granted it (`order_id` on the grant). `benefit_grant.created` is sent when a new benefit grant is created. `benefit_grant.updated` and `benefit_grant.revoked` exist for later changes.

The store can also read grants back: list the grants for a benefit and check `is_granted` and `order_id`.

On the off-session charge path, Polar documents the sequence in one place: when the charge succeeds, benefits attached to the product are granted and `order.paid` fires. The checkout path is documented as two facts side by side: buying the product grants the benefit, and a paid order emits `order.paid`.

Sources:

- [Automated Benefits](https://polar.sh/docs/features/benefits/introduction)
- [Webhook Events — Benefit Grants](https://polar.sh/docs/integrate/webhooks/events)
- [List Benefit Grants](https://polar.sh/docs/api-reference/benefits/list-grants)
- [Orders — Finalize and charge](https://polar.sh/docs/features/orders)

## A free product

Catalog prices include a free price, described as "No charge". Polar's name for that price is `amount_type: free`.

An order whose total is zero is a free order. Polar marks free orders `paid` immediately, with no payment step. The examples Polar gives are a $0 subscription and a 100% discount. A free price is a zero total, so the same rule applies: the order is paid without collecting a card.

Because the order is paid, `order.paid` still fires. Because the customer bought a product that has the file benefit, the benefit is granted and `benefit_grant.created` still fires. The docs do not publish a separate event that only free products emit.

Sources:

- [Checkout API — Price types](https://polar.sh/docs/features/checkout/session)
- [Update Product Benefits — ProductPriceFree](https://polar.sh/docs/api-reference/products/update-benefits) (`amount_type` is the constant `free`; description: "A free price for a product.")
- [Orders — Order status](https://polar.sh/docs/features/orders)
- [Automated Benefits](https://polar.sh/docs/features/benefits/introduction)
