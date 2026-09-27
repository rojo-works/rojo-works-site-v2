// 記事の3種類（コレクション名）と、見出しの対応。
// 見出しは、CSS の text-transform ではなく、ここで大文字のまま書く
// （フォント subset の抽出漏れを防ぐため。案件ノートの決定）。
export const CONTENT_TYPES = ['articles', 'dialogs', 'rentals'] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  articles: 'ARTICLES',
  dialogs: 'DIALOGS',
  rentals: 'RENTALS',
};
