// 記事の型（コンテンツコレクション）を定義する。
// 3種類（記事・対話・小さな貸し物件）は、同じ形（題名・日付・要約・タグ・本文）で持つ。
// 記事は Markdown のファイルで持ち、CMS は使わない（設計書 8章の決定）。
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 3種類に共通のフロントマター
const articleSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: articleSchema,
});

const dialogs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dialogs' }),
  schema: articleSchema,
});

const rentals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rentals' }),
  schema: articleSchema,
});

export const collections = { articles, dialogs, rentals };
