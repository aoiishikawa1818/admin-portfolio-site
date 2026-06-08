# 管理画面付きポートフォリオサイト

## 概要

このリポジトリは、公開ページと管理画面を備えたポートフォリオサイトです。

公開トップページ・問い合わせページ・ログインページ・管理画面を持つ構成で、公開機能と管理機能を分けて実装しています。

管理画面では profile / works / skills の情報を更新・追加でき、管理APIは Firebase Authentication の ID トークンを使って認証保護しています。

---

## 制作背景

ポートフォリオサイトを単なる静的ページではなく、管理画面からプロフィール・制作物・スキル情報を更新できる構成として実装しました。

公開ページと管理画面を分離し、認証付きAPIを通じてデータを管理することで、実務に近いWebアプリケーション構成を経験することを目的に制作しました。

---

## 技術構成

| 分類 | 技術 |
|------|------|
| Frontend | Nuxt.js, TypeScript |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Firebase Authentication |

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

## 工夫した点

### 公開機能と管理機能の分離

公開トップページ・問い合わせページと、管理者向けのログインページ・管理画面を分けて実装しました。

### Firebase Authentication による認証保護

管理APIでは Firebase Authentication の ID トークンを検証し、未認証時は管理データを操作できないようにしています。

### フロントエンドとAPIの分離構成

Nuxt.js と Express API を分けて構成し、画面側とサーバー側の責務を分離しました。

---

## セットアップ手順

### DB

```bash
docker compose up -d
```

PostgreSQL を Docker で起動します。

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

- ローカル開発環境では、API接続先を開発用URLとして設定しています。
- Firebase サービスアカウント鍵 JSON は Git 管理対象外です。
- 詳しい設計メモは `docs/design.md` を参照してください。
