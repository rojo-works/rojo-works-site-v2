// Cloudflare Pages Functions のミドルウェア。
// 本番ドメイン（rojo.works）以外のホスト（dev.rojo.works、*.pages.dev など）
// からの応答に、検索エンジンに載せない指示（X-Robots-Tag: noindex）を足す。
// ビルドは全ホストで同じ静的ファイルを配るため、ホストの区別はここでしか
// できない（2026-09-27の決定。案件ノート・設計書8章）。
const PRODUCTION_HOST = 'rojo.works';

export async function onRequest({ request, next }) {
  const response = await next();
  const host = new URL(request.url).hostname;

  if (host === PRODUCTION_HOST) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('X-Robots-Tag', 'noindex');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
