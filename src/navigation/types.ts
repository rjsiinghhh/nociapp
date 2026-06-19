export type RootStackParamList = {
  Landing: undefined;
  Tabs: undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
  OrderTracking: { orderId: string };
};

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};
