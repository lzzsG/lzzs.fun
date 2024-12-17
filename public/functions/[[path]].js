export async function onRequest(context) {
    const url = new URL(context.request.url);

    // 静态资源不重写，直接返回
    if (url.pathname.match(/\.(js|css|png|jpg|svg|json|ico|txt|html)$/)) {
        return fetch(context.request);
    }

    // 所有非静态资源路径返回 index.html
    return fetch(new URL("/index.html", context.request.url));
}
