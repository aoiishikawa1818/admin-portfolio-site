# 管理画面付きポートフォリオサイト

## 概要

このリポジトリは、管理画面付きポートフォリオサイト課題の成果物です。
公開トップページ・問い合わせページ・ログインページ・管理画面を持つ構成で、公開機能と管理機能を分けて実装しています。
管理APIは Firebase Authentication の ID トークンを使って認証保護しています。

---

## 技術構成

- フロントエンド: Nuxt.js + TypeScript
- バックエンド: Express.js + TypeScript
- ORM: Prisma
- DB: PostgreSQL
- 認証: Firebase Authentication

---

## 画面構成

- `/`
  - 公開トップページ
  - profile / works / skills を表示します。

- `/contact`
  - 問い合わせページ
  - 名前 / メールアドレス / お問い合わせ内容を送信できます。

- `/login`
  - 管理者ログインページ
  - Firebase Authentication のメールアドレス / パスワード認証を使います。

- `/admin`
  - 管理画面
  - profile の保存、works の追加、skills の追加を行えます。
  - 未認証時は 404 として扱います。

---

## 主な機能

- 公開トップページで portfolio 情報を表示
- 問い合わせフォーム送信
- ログイン機能
- 管理画面での profile / works / skills の更新・追加
- 管理画面の最小バリデーション
- 画面側と API 側の認証保護

---

## セットアップ手順

### front

```bash
cd front
npm install
npm run dev
```

通常は `http://localhost:3000` で起動します。

### api

```bash
cd api
npm install
npm run dev
```

通常は `http://localhost:3001` で起動します。

---

## ディレクトリ構成

- `front`
  - フロントエンドアプリ
  - 詳細は `front/README.md` を参照してください。

- `api`
  - API サーバー
  - 詳細は `api/README.md` を参照してください。

- `docs/design.md`
  - 最小設計メモ
  - データ設計 / API設計 / 認証方針を整理しています。

---

## 認証保護

- `/login` からログインします。
- `/admin` は未認証時に 404 として扱います。
- 管理APIは未認証時に 401 Unauthorized を返します。
- 管理API呼び出し時は Firebase Authentication の ID トークンを Bearer トークンとして送信します。

---

## 補足

- ローカル開発用として、一部の API 接続先 URL を直書きしている箇所があります。
- Firebase サービスアカウント鍵 JSON は Git 管理対象外です。
- 詳しい設計メモは `docs/design.md` を参照してください。
