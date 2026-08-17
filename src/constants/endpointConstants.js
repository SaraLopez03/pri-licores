const env = process.env.NODE_ENV;
const api_urls = {
  development: "http://localhost:9090",
  production: "https://um4ajvns2b.execute-api.us-west-2.amazonaws.com",
};

const baseUrl = api_urls[env] || api_urls.development;

export const ENDPOINT = {
  POST_LOGIN: `${baseUrl}/dev/user/login`,
  POST_NEW_PRODUCT: `${baseUrl}/dev/product`,
  POST_SALES_BY_DATES: `${baseUrl}/dev/sale-by-dates`,
  GET_PRODUCTS: `${baseUrl}/dev/product`,
  PUT_UPDATE_PRODUCT: `${baseUrl}/dev/product`,
  DEL_DELETE_PRODUCT: `${baseUrl}/dev/product`,
  NEW_SALE: `${baseUrl}/dev/sale`,
  OPEN_SALES: `${baseUrl}/dev/sales-open`,
  UPDATE_SALE: `${baseUrl}/dev/update-sale`,
  POST_PAY_SALE: `${baseUrl}/dev/pay-open-sale`,
  GET_PENDING_SALES: `${baseUrl}/dev/sales-pending`,
  CLOSE_PENDING_SALES: `${baseUrl}/dev/close-sales-pending`,
};
