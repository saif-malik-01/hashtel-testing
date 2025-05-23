/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation CheckoutAddLine($id: ID!, $productVariantId: ID!) {\n  checkoutLinesAdd(id: $id, lines: [{quantity: 1, variantId: $productVariantId}]) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          name\n          product {\n            name\n          }\n        }\n      }\n    }\n    errors {\n      message\n    }\n  }\n}": types.CheckoutAddLineDocument,
    "mutation CheckoutAddPromo($checkoutId: ID!, $promoCode: String!) {\n  checkoutAddPromoCode(id: $checkoutId, promoCode: $promoCode) {\n    errors {\n      message\n    }\n  }\n}": types.CheckoutAddPromoDocument,
    "mutation CheckoutAssign($checkoutId: ID!, $customerId: ID!) {\n  checkoutCustomerAttach(id: $checkoutId, customerId: $customerId) {\n    errors {\n      message\n      code\n      field\n    }\n  }\n}": types.CheckoutAssignDocument,
    "mutation CheckoutCreate($channel: String!) {\n  checkoutCreate(input: {channel: $channel, lines: []}) {\n    checkout {\n      id\n      email\n      lines {\n        id\n        quantity\n        totalPrice {\n          gross {\n            amount\n            currency\n          }\n        }\n        variant {\n          product {\n            id\n            name\n            slug\n            thumbnail {\n              url\n              alt\n            }\n            category {\n              name\n            }\n          }\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          name\n          id\n        }\n      }\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      code\n    }\n  }\n}": types.CheckoutCreateDocument,
    "mutation CheckoutDeleteLines($checkoutId: ID!, $lineIds: [ID!]!) {\n  checkoutLinesDelete(id: $checkoutId, linesIds: $lineIds) {\n    errors {\n      message\n    }\n  }\n}": types.CheckoutDeleteLinesDocument,
    "query CheckoutFind($id: ID!) {\n  checkout(id: $id) {\n    id\n    lines {\n      id\n      quantity\n      undiscountedTotalPrice {\n        amount\n      }\n      variant {\n        product {\n          id\n          name\n          slug\n          thumbnail {\n            url\n            alt\n          }\n          category {\n            name\n          }\n        }\n        pricing {\n          price {\n            gross {\n              amount\n            }\n            tax {\n              amount\n            }\n          }\n        }\n        name\n        id\n      }\n    }\n    billingAddress {\n      id\n      streetAddress1\n      city\n      countryArea\n      postalCode\n      firstName\n      lastName\n    }\n    shippingAddress {\n      id\n      streetAddress1\n      city\n      countryArea\n      postalCode\n      firstName\n      lastName\n    }\n    discountName\n    discount {\n      amount\n    }\n    subtotalPrice {\n      gross {\n        amount\n      }\n      tax {\n        amount\n      }\n    }\n    totalPrice {\n      gross {\n        amount\n      }\n      tax {\n        amount\n      }\n    }\n    shippingPrice {\n      gross {\n        amount\n      }\n      tax {\n        amount\n      }\n    }\n    shippingMethods {\n      id\n      active\n    }\n    deliveryMethod {\n      __typename\n    }\n  }\n}": types.CheckoutFindDocument,
    "mutation CheckoutUpdateLine($checkoutId: ID!, $lineId: ID!, $quantity: Int!) {\n  checkoutLinesUpdate(\n    id: $checkoutId\n    lines: {lineId: $lineId, quantity: $quantity}\n  ) {\n    errors {\n      message\n    }\n  }\n}": types.CheckoutUpdateLineDocument,
    "mutation CompleteCheckout($checkoutId: ID!) {\n  checkoutComplete(id: $checkoutId) {\n    order {\n      id\n    }\n    errors {\n      field\n      message\n    }\n  }\n}": types.CompleteCheckoutDocument,
    "mutation ConfirmUser($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    errors {\n      field\n      code\n    }\n    user {\n      id\n      email\n      isActive\n      isConfirmed\n      checkoutIds\n    }\n  }\n}": types.ConfirmUserDocument,
    "query CurrentUser {\n  me {\n    ...UserDetails\n  }\n}": types.CurrentUserDocument,
    "fragment UserDetails on User {\n  id\n  email\n  firstName\n  lastName\n  checkoutIds\n  orders(first: 10) {\n    edges {\n      node {\n        ...OrderFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  defaultShippingAddress {\n    firstName\n    lastName\n    streetAddress1\n    city\n    countryArea\n    postalCode\n  }\n  metadata {\n    key\n    value\n  }\n  avatar {\n    url\n    alt\n  }\n}": types.UserDetailsFragmentDoc,
    "query FilteredProductItemList($channel: String!, $slugs: [ID!], $gte: Float, $lte: Float, $sortBy: OrderDirection!, $after: String, $search: String) {\n  products(\n    first: 10\n    channel: $channel\n    filter: {categories: $slugs, price: {gte: $gte, lte: $lte}}\n    search: $search\n    sortBy: {direction: $sortBy, field: NAME}\n    after: $after\n  ) {\n    edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.FilteredProductItemListDocument,
    "query OrderFind($id: ID!) {\n  order(id: $id) {\n    ...OrderFragment\n  }\n}": types.OrderFindDocument,
    "fragment OrderFragment on Order {\n  id\n  voucherCode\n  lines {\n    id\n    quantity\n    undiscountedTotalPrice {\n      net {\n        amount\n      }\n      gross {\n        amount\n      }\n    }\n    variant {\n      product {\n        id\n        name\n        slug\n        thumbnail {\n          url\n          alt\n        }\n        category {\n          name\n        }\n      }\n      pricing {\n        price {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n      name\n      id\n    }\n  }\n  billingAddress {\n    id\n    streetAddress1\n    city\n    countryArea\n    postalCode\n    firstName\n    lastName\n  }\n  shippingAddress {\n    id\n    streetAddress1\n    city\n    countryArea\n    postalCode\n    firstName\n    lastName\n  }\n  discounts {\n    amount {\n      amount\n    }\n  }\n  subtotal {\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n    tax {\n      amount\n    }\n  }\n  total {\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n    tax {\n      amount\n    }\n  }\n  shippingPrice {\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n    tax {\n      amount\n    }\n  }\n  statusDisplay\n  status\n  created\n  updatedAt\n  number\n  shippingMethods {\n    maximumDeliveryDays\n    minimumDeliveryDays\n    name\n  }\n  shippingMethodName\n}": types.OrderFragmentFragmentDoc,
    "fragment ProductCategoryItem on Category {\n  id\n  description\n  slug\n  name\n  backgroundImage {\n    url\n    alt\n  }\n}": types.ProductCategoryItemFragmentDoc,
    "query ProductCategoryList {\n  categories(first: 10) {\n    edges {\n      node {\n        ...ProductCategoryItem\n      }\n    }\n  }\n}": types.ProductCategoryListDocument,
    "query ProductDetails($slug: String!, $channel: String!) {\n  product(slug: $slug, channel: $channel) {\n    id\n    slug\n    name\n    description\n    seoTitle\n    seoDescription\n    rating\n    thumbnail(size: 360, format: WEBP) {\n      url\n      alt\n    }\n    collections {\n      id\n      slug\n      name\n    }\n    category {\n      id\n      name\n      slug\n    }\n    variants {\n      ...VariantDetails\n    }\n  }\n}": types.ProductDetailsDocument,
    "query ProductListByCategory($slugs: [String!]) {\n  categories(filter: {slugs: $slugs}, first: 10) {\n    edges {\n      node {\n        products(first: 10, channel: \"default-channel\") {\n          edges {\n            node {\n              ...ProductListItem\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.ProductListByCategoryDocument,
    "query ProductListByCollection($slug: String!, $channel: String!) {\n  collection(slug: $slug, channel: $channel) {\n    name\n    description\n    products(first: 10) {\n      edges {\n        node {\n          ...ProductListItem\n        }\n      }\n    }\n  }\n}": types.ProductListByCollectionDocument,
    "fragment ProductListItem on Product {\n  id\n  name\n  slug\n  rating\n  thumbnail(format: WEBP, size: 220) {\n    url\n    alt\n  }\n  defaultVariant {\n    id\n    pricing {\n      price {\n        gross {\n          amount\n        }\n      }\n      priceUndiscounted {\n        gross {\n          amount\n        }\n      }\n    }\n  }\n  category {\n    name\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductListItemBySlug($slug: String!) {\n  product(slug: $slug, channel: \"default-channel\") {\n    ...ProductListItem\n  }\n}": types.ProductListItemBySlugDocument,
    "mutation RegisterUser($email: String!, $password: String!, $channel: String!, $firstName: String!, $lastName: String!, $redirectUrl: String, $phoneNumber: String!) {\n  accountRegister(\n    input: {email: $email, password: $password, redirectUrl: $redirectUrl, channel: $channel, firstName: $firstName, lastName: $lastName, metadata: [{key: \"phoneNumber\", value: $phoneNumber}]}\n  ) {\n    errors {\n      field\n      code\n      message\n    }\n    user {\n      email\n      isActive\n      isConfirmed\n    }\n  }\n}": types.RegisterUserDocument,
    "mutation UpdateCheckoutBilling($billingAddress: AddressInput!, $id: ID!) {\n  checkoutBillingAddressUpdate(\n    billingAddress: $billingAddress\n    id: $id\n    validationRules: {checkFieldsFormat: false, checkRequiredFields: false, enableFieldsNormalization: false}\n  ) {\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.UpdateCheckoutBillingDocument,
    "mutation UpdateCheckoutShipping($shippingAddress: AddressInput!, $id: ID!) {\n  checkoutShippingAddressUpdate(\n    shippingAddress: $shippingAddress\n    id: $id\n    validationRules: {checkFieldsFormat: false, checkRequiredFields: false, enableFieldsNormalization: false}\n  ) {\n    errors {\n      field\n      message\n      code\n    }\n  }\n}": types.UpdateCheckoutShippingDocument,
    "mutation UpdateCheckoutShippingMethod($checkoutId: ID!, $methodId: ID!) {\n  checkoutDeliveryMethodUpdate(id: $checkoutId, deliveryMethodId: $methodId) {\n    errors {\n      field\n      code\n      message\n    }\n  }\n}": types.UpdateCheckoutShippingMethodDocument,
    "mutation UpdateUser($id: ID, $updates: AccountInput!) {\n  accountUpdate(customerId: $id, input: $updates) {\n    user {\n      id\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}": types.UpdateUserDocument,
    "fragment VariantDetails on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  quantityLimitPerCustomer\n  attributes {\n    attribute {\n      name\n    }\n    values {\n      name\n    }\n  }\n  weight {\n    unit\n    value\n  }\n  media {\n    url(format: WEBP, size: 1024)\n    alt\n  }\n  pricing {\n    price {\n      gross {\n        currency\n        amount\n      }\n    }\n    priceUndiscounted {\n      gross {\n        currency\n        amount\n      }\n    }\n  }\n}": types.VariantDetailsFragmentDoc,
    "mutation VerifyUser($redirectUrl: String!, $channel: String!) {\n  sendConfirmationEmail(redirectUrl: $redirectUrl, channel: $channel) {\n    errors {\n      field\n      code\n    }\n  }\n}": types.VerifyUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutAddLine($id: ID!, $productVariantId: ID!) {\n  checkoutLinesAdd(id: $id, lines: [{quantity: 1, variantId: $productVariantId}]) {\n    checkout {\n      id\n      lines {\n        id\n        quantity\n        variant {\n          name\n          product {\n            name\n          }\n        }\n      }\n    }\n    errors {\n      message\n    }\n  }\n}"): typeof import('./graphql').CheckoutAddLineDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutAddPromo($checkoutId: ID!, $promoCode: String!) {\n  checkoutAddPromoCode(id: $checkoutId, promoCode: $promoCode) {\n    errors {\n      message\n    }\n  }\n}"): typeof import('./graphql').CheckoutAddPromoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutAssign($checkoutId: ID!, $customerId: ID!) {\n  checkoutCustomerAttach(id: $checkoutId, customerId: $customerId) {\n    errors {\n      message\n      code\n      field\n    }\n  }\n}"): typeof import('./graphql').CheckoutAssignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutCreate($channel: String!) {\n  checkoutCreate(input: {channel: $channel, lines: []}) {\n    checkout {\n      id\n      email\n      lines {\n        id\n        quantity\n        totalPrice {\n          gross {\n            amount\n            currency\n          }\n        }\n        variant {\n          product {\n            id\n            name\n            slug\n            thumbnail {\n              url\n              alt\n            }\n            category {\n              name\n            }\n          }\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          name\n          id\n        }\n      }\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n    }\n    errors {\n      field\n      code\n    }\n  }\n}"): typeof import('./graphql').CheckoutCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutDeleteLines($checkoutId: ID!, $lineIds: [ID!]!) {\n  checkoutLinesDelete(id: $checkoutId, linesIds: $lineIds) {\n    errors {\n      message\n    }\n  }\n}"): typeof import('./graphql').CheckoutDeleteLinesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CheckoutFind($id: ID!) {\n  checkout(id: $id) {\n    id\n    lines {\n      id\n      quantity\n      undiscountedTotalPrice {\n        amount\n      }\n      variant {\n        product {\n          id\n          name\n          slug\n          thumbnail {\n            url\n            alt\n          }\n          category {\n            name\n          }\n        }\n        pricing {\n          price {\n            gross {\n              amount\n            }\n            tax {\n              amount\n            }\n          }\n        }\n        name\n        id\n      }\n    }\n    billingAddress {\n      id\n      streetAddress1\n      city\n      countryArea\n      postalCode\n      firstName\n      lastName\n    }\n    shippingAddress {\n      id\n      streetAddress1\n      city\n      countryArea\n      postalCode\n      firstName\n      lastName\n    }\n    discountName\n    discount {\n      amount\n    }\n    subtotalPrice {\n      gross {\n        amount\n      }\n      tax {\n        amount\n      }\n    }\n    totalPrice {\n      gross {\n        amount\n      }\n      tax {\n        amount\n      }\n    }\n    shippingPrice {\n      gross {\n        amount\n      }\n      tax {\n        amount\n      }\n    }\n    shippingMethods {\n      id\n      active\n    }\n    deliveryMethod {\n      __typename\n    }\n  }\n}"): typeof import('./graphql').CheckoutFindDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CheckoutUpdateLine($checkoutId: ID!, $lineId: ID!, $quantity: Int!) {\n  checkoutLinesUpdate(\n    id: $checkoutId\n    lines: {lineId: $lineId, quantity: $quantity}\n  ) {\n    errors {\n      message\n    }\n  }\n}"): typeof import('./graphql').CheckoutUpdateLineDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CompleteCheckout($checkoutId: ID!) {\n  checkoutComplete(id: $checkoutId) {\n    order {\n      id\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"): typeof import('./graphql').CompleteCheckoutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ConfirmUser($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    errors {\n      field\n      code\n    }\n    user {\n      id\n      email\n      isActive\n      isConfirmed\n      checkoutIds\n    }\n  }\n}"): typeof import('./graphql').ConfirmUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentUser {\n  me {\n    ...UserDetails\n  }\n}"): typeof import('./graphql').CurrentUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserDetails on User {\n  id\n  email\n  firstName\n  lastName\n  checkoutIds\n  orders(first: 10) {\n    edges {\n      node {\n        ...OrderFragment\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  defaultShippingAddress {\n    firstName\n    lastName\n    streetAddress1\n    city\n    countryArea\n    postalCode\n  }\n  metadata {\n    key\n    value\n  }\n  avatar {\n    url\n    alt\n  }\n}"): typeof import('./graphql').UserDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FilteredProductItemList($channel: String!, $slugs: [ID!], $gte: Float, $lte: Float, $sortBy: OrderDirection!, $after: String, $search: String) {\n  products(\n    first: 10\n    channel: $channel\n    filter: {categories: $slugs, price: {gte: $gte, lte: $lte}}\n    search: $search\n    sortBy: {direction: $sortBy, field: NAME}\n    after: $after\n  ) {\n    edges {\n      node {\n        ...ProductListItem\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): typeof import('./graphql').FilteredProductItemListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OrderFind($id: ID!) {\n  order(id: $id) {\n    ...OrderFragment\n  }\n}"): typeof import('./graphql').OrderFindDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment OrderFragment on Order {\n  id\n  voucherCode\n  lines {\n    id\n    quantity\n    undiscountedTotalPrice {\n      net {\n        amount\n      }\n      gross {\n        amount\n      }\n    }\n    variant {\n      product {\n        id\n        name\n        slug\n        thumbnail {\n          url\n          alt\n        }\n        category {\n          name\n        }\n      }\n      pricing {\n        price {\n          gross {\n            amount\n            currency\n          }\n        }\n      }\n      name\n      id\n    }\n  }\n  billingAddress {\n    id\n    streetAddress1\n    city\n    countryArea\n    postalCode\n    firstName\n    lastName\n  }\n  shippingAddress {\n    id\n    streetAddress1\n    city\n    countryArea\n    postalCode\n    firstName\n    lastName\n  }\n  discounts {\n    amount {\n      amount\n    }\n  }\n  subtotal {\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n    tax {\n      amount\n    }\n  }\n  total {\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n    tax {\n      amount\n    }\n  }\n  shippingPrice {\n    gross {\n      amount\n    }\n    net {\n      amount\n    }\n    tax {\n      amount\n    }\n  }\n  statusDisplay\n  status\n  created\n  updatedAt\n  number\n  shippingMethods {\n    maximumDeliveryDays\n    minimumDeliveryDays\n    name\n  }\n  shippingMethodName\n}"): typeof import('./graphql').OrderFragmentFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCategoryItem on Category {\n  id\n  description\n  slug\n  name\n  backgroundImage {\n    url\n    alt\n  }\n}"): typeof import('./graphql').ProductCategoryItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductCategoryList {\n  categories(first: 10) {\n    edges {\n      node {\n        ...ProductCategoryItem\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductCategoryListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductDetails($slug: String!, $channel: String!) {\n  product(slug: $slug, channel: $channel) {\n    id\n    slug\n    name\n    description\n    seoTitle\n    seoDescription\n    rating\n    thumbnail(size: 360, format: WEBP) {\n      url\n      alt\n    }\n    collections {\n      id\n      slug\n      name\n    }\n    category {\n      id\n      name\n      slug\n    }\n    variants {\n      ...VariantDetails\n    }\n  }\n}"): typeof import('./graphql').ProductDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductListByCategory($slugs: [String!]) {\n  categories(filter: {slugs: $slugs}, first: 10) {\n    edges {\n      node {\n        products(first: 10, channel: \"default-channel\") {\n          edges {\n            node {\n              ...ProductListItem\n            }\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductListByCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductListByCollection($slug: String!, $channel: String!) {\n  collection(slug: $slug, channel: $channel) {\n    name\n    description\n    products(first: 10) {\n      edges {\n        node {\n          ...ProductListItem\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductListByCollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  id\n  name\n  slug\n  rating\n  thumbnail(format: WEBP, size: 220) {\n    url\n    alt\n  }\n  defaultVariant {\n    id\n    pricing {\n      price {\n        gross {\n          amount\n        }\n      }\n      priceUndiscounted {\n        gross {\n          amount\n        }\n      }\n    }\n  }\n  category {\n    name\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductListItemBySlug($slug: String!) {\n  product(slug: $slug, channel: \"default-channel\") {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductListItemBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterUser($email: String!, $password: String!, $channel: String!, $firstName: String!, $lastName: String!, $redirectUrl: String, $phoneNumber: String!) {\n  accountRegister(\n    input: {email: $email, password: $password, redirectUrl: $redirectUrl, channel: $channel, firstName: $firstName, lastName: $lastName, metadata: [{key: \"phoneNumber\", value: $phoneNumber}]}\n  ) {\n    errors {\n      field\n      code\n      message\n    }\n    user {\n      email\n      isActive\n      isConfirmed\n    }\n  }\n}"): typeof import('./graphql').RegisterUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCheckoutBilling($billingAddress: AddressInput!, $id: ID!) {\n  checkoutBillingAddressUpdate(\n    billingAddress: $billingAddress\n    id: $id\n    validationRules: {checkFieldsFormat: false, checkRequiredFields: false, enableFieldsNormalization: false}\n  ) {\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): typeof import('./graphql').UpdateCheckoutBillingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCheckoutShipping($shippingAddress: AddressInput!, $id: ID!) {\n  checkoutShippingAddressUpdate(\n    shippingAddress: $shippingAddress\n    id: $id\n    validationRules: {checkFieldsFormat: false, checkRequiredFields: false, enableFieldsNormalization: false}\n  ) {\n    errors {\n      field\n      message\n      code\n    }\n  }\n}"): typeof import('./graphql').UpdateCheckoutShippingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateCheckoutShippingMethod($checkoutId: ID!, $methodId: ID!) {\n  checkoutDeliveryMethodUpdate(id: $checkoutId, deliveryMethodId: $methodId) {\n    errors {\n      field\n      code\n      message\n    }\n  }\n}"): typeof import('./graphql').UpdateCheckoutShippingMethodDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($id: ID, $updates: AccountInput!) {\n  accountUpdate(customerId: $id, input: $updates) {\n    user {\n      id\n    }\n    errors {\n      message\n      field\n      code\n    }\n  }\n}"): typeof import('./graphql').UpdateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment VariantDetails on ProductVariant {\n  id\n  name\n  sku\n  quantityAvailable\n  quantityLimitPerCustomer\n  attributes {\n    attribute {\n      name\n    }\n    values {\n      name\n    }\n  }\n  weight {\n    unit\n    value\n  }\n  media {\n    url(format: WEBP, size: 1024)\n    alt\n  }\n  pricing {\n    price {\n      gross {\n        currency\n        amount\n      }\n    }\n    priceUndiscounted {\n      gross {\n        currency\n        amount\n      }\n    }\n  }\n}"): typeof import('./graphql').VariantDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyUser($redirectUrl: String!, $channel: String!) {\n  sendConfirmationEmail(redirectUrl: $redirectUrl, channel: $channel) {\n    errors {\n      field\n      code\n    }\n  }\n}"): typeof import('./graphql').VerifyUserDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
