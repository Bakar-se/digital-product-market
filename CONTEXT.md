# Store

A store where a buyer obtains a digital product from the owner. The first version has one seller. A product is paid for once, or it is free.

## Language

**Store**:
A catalog of digital products offered by one seller. Anyone can browse it. A buyer signs in to obtain a product or to return to a download.
_Avoid_: Marketplace, market, shop

**Catalog**:
The products the store currently offers, newest first. A buyer narrows it by category, by name, or both.
_Avoid_: Inventory, storefront, feed

**Seller**:
The person who offers products for sale in the store. In the first version, the owner is the only seller.
_Avoid_: Vendor, merchant

**Owner**:
The person who runs the store. The owner is the seller in the first version.
_Avoid_: Admin, operator

**Buyer**:
A person who obtains a product from the store. The owner and buyers can both sign in.
_Avoid_: Customer, user, client

**Product**:
A file offered in the store, often a compressed folder, such as a theme, an app, a logo, an icon, or an image. It has a name, a description, images, and one price, paid once. The price may be zero. The store does not change those. It belongs to one or more categories, which the store records. Until it has at least one category, it is not in the catalog. When it is no longer offered, it leaves the catalog.
_Avoid_: Item, listing, SKU

**Purchase**:
The record that a buyer obtained a product. It remains on the buyer's account after the product leaves the catalog.
_Avoid_: Order, transaction

**Download**:
A buyer's access to a product's file, taken inside the store. A paid product grants it after payment. A free product grants it without payment. If the file is no longer granted, the download is not available.
_Avoid_: Attachment, asset, share link

**Category**:
A named group of products that the owner defines. A product can belong to more than one category.
_Avoid_: Collection, tag, type
