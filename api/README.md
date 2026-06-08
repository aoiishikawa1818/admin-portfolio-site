# 管理画面付きポートフォリオサイト API

## 概要

このディレクトリは、管理画面付きポートフォリオサイトの API サーバーです。
Express.js + TypeScript + Prisma + PostgreSQL で構成しており、公開APIと管理APIを提供します。
管理APIは Firebase Authentication の ID トークンを使って認証保護しています。

---

## 使用技術

- Express.js
- TypeScript
- Prisma
- PostgreSQL
- Firebase Admin SDK

---

## 主な役割

- 公開トップページ表示用データの返却
- 問い合わせ内容の保存
- 管理画面からの profile / works / skills の更新・追加
- 管理APIの認証保護

---

## 起動方法

1. 依存関係をインストールします。
2. 環境変数や秘密情報を準備します。
3. API サーバーを起動します。

例:

```bash
npm install
npm run dev
```

---

## 主なエンドポイント

### 公開API

- `GET /portfolio`
  - 公開トップページ表示用の API です。
  - profile / works / skills をまとめて返します。

- `POST /contacts`
  - 問い合わせ内容を保存する API です。
  - `name / email / message` を受け取ります。

### 管理API

- `PUT /admin/profile`
  - profile 1 件を更新します。

- `POST /admin/works`
  - works を 1 件追加します。

- `PUT /admin/works/:id`
  - works を 1 件更新します。

- `POST /admin/skills`
  - skills を 1 件追加します。

- `PUT /admin/skills/:id`
  - skills を 1 件更新します。

---

## 認証方針

- 管理APIはすべて認証必須です。
- フロントエンドから送られた Firebase Authentication の ID トークンを Bearer トークンとして受け取ります。
- API 側では Firebase Admin SDK を使って ID トークンを検証します。
- トークンがない、または無効な場合は 401 Unauthorized を返します。

---

## 補足

- Firebase サービスアカウント鍵 JSON は Git 管理対象外です。
- 詳しい設計メモはルートの `docs/design.md` を参照してください。
- この README では API 側の構成・起動方法・認証方針をまとめています。
