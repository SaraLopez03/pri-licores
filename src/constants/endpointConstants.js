const env = process.env.NODE_ENV;
const api_urls = {
  development: "http://localhost:9090/dev",
  production: "https://1gnn34v2s9.execute-api.us-west-2.amazonaws.com/prod",
};

const baseUrl = api_urls[env] || api_urls.development;

export const ENDPOINT = {
  POST_LOGIN: `${baseUrl}/user/login`,
  POST_NEW_PRODUCT: `${baseUrl}/product`,
  POST_SALES_BY_DATES: `${baseUrl}/sale-by-dates`,
  GET_PRODUCTS: `${baseUrl}/product`,
  PUT_UPDATE_PRODUCT: `${baseUrl}/product`,
  DEL_DELETE_PRODUCT: `${baseUrl}/product`,
  NEW_SALE: `${baseUrl}/sale`,
  OPEN_SALES: `${baseUrl}/sales-open`,
  UPDATE_SALE: `${baseUrl}/update-sale`,
  POST_PAY_SALE: `${baseUrl}/pay-open-sale`,
  GET_PENDING_SALES: `${baseUrl}/sales-pending`,
  CLOSE_PENDING_SALES: `${baseUrl}/close-sales-pending`,
};
