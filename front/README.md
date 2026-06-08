# 管理画面付きポートフォリオサイト front

## 概要

このディレクトリは、管理画面付きポートフォリオサイトのフロントエンドアプリです。
Nuxt.js + TypeScript で構成しており、公開トップページ・問い合わせページ・ログインページ・管理画面を提供します。
管理画面のAPI呼び出しでは Firebase Authentication の ID トークンを使います。

---

## 使用技術

- Nuxt.js
- TypeScript
- Vue 3
- Firebase Authentication

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
- 認証保護

---

## 起動方法

1. 依存関係をインストールします。
2. 必要な環境変数を設定します。
3. フロントエンドアプリを起動します。

例:

```bash
npm install
npm run dev
```

開発サーバーは通常 `http://localhost:3000` で起動します。

---

## 環境変数

Firebase Authentication を使うため、以下の公開環境変数を設定します。

- `NUXT_PUBLIC_FIREBASE_API_KEY`
- `NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NUXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NUXT_PUBLIC_FIREBASE_APP_ID`

---

## 認証保護

- `/login` からログインします。
- `/admin` は未認証時に 404 として扱います。
- 管理API呼び出し時は Firebase Authentication の ID トークンを Bearer トークンとして送信します。

---

## 補足

- ローカル開発環境では、API接続先を開発用URLとして設定しています。
- 詳しい設計メモはルートの `docs/design.md` を参照してください。
- この README はフロントエンド側の最小説明用です。
