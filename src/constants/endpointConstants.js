const env = process.env.NODE_ENV;
const api_urls = {
    // local: 'http://localhost:9090',
    local: 'https://um4ajvns2b.execute-api.us-west-2.amazonaws.com',
    prod: 'https://um4ajvns2b.execute-api.us-west-2.amazonaws.com'
}

export const ENDPOINT = {
    POST_LOGIN: `${api_urls[env] || api_urls.local || api_urls.local}/dev/user/login`,
    POST_NEW_PRODUCT: `${api_urls[env] || api_urls.local || api_urls.local}/dev/product`,
    POST_SALES_BY_DATES: `${api_urls[env] || api_urls.local}/dev/sale-by-dates`,
    GET_PRODUCTS: `${api_urls[env] || api_urls.local}/dev/product`,
    PUT_UPDATE_PRODUCT: `${api_urls[env] || api_urls.local}/dev/product`,
    DEL_DELETE_PRODUCT: `${api_urls[env] || api_urls.local}/dev/product`,
    NEW_SALE: `${api_urls[env] || api_urls.local}/dev/sale`,
    OPEN_SALES: `${api_urls[env] || api_urls.local}/dev/sales-open`,
    UPDATE_SALE: `${api_urls[env] || api_urls.local}/dev/update-sale`,
    POST_PAY_SALE: `${api_urls[env] || api_urls.local}/dev/pay-open-sale`,
    GET_PENDING_SALES: `${api_urls[env] || api_urls.local}/dev/sales-pending`,
    CLOSE_PENDING_SALES: `${api_urls[env] || api_urls.local}/dev/close-sales-pending`
}