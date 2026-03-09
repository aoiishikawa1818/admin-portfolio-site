# タスク0 要件整理・技術選定・実装方針決定

## 目的

30時間以内で、管理画面付きポートフォリオサイト課題を現実的に完成させるために、実装前の前提を固める。

---

## 1. 技術構成

### フロントエンド

- Nuxt.js
- TypeScript

### バックエンド

- Express.js
- TypeScript

### ORM

- Prisma

### DB

- PostgreSQL

### 認証

- Firebase Authentication

---

## 2. MUST要件の整理

### 開発環境

- フロントエンドは TypeScript + Nuxt.js を採用する
- バックエンドは TypeScript + Express.js を採用する
- ORM は Prisma を採用する
- DB は PostgreSQL を採用する
- バックエンドアプリには、フロントエンドアプリのサーバ機能からアクセスする

### 必要な機能

- トップページ
  - プロフィール（画像付き）
  - 実績
  - スキル
- 問い合わせフォーム
- 管理画面
  - トップページのコンテンツを管理できる
  - 管理者のみアクセス可能

### 認証・認可

- Firebase を使う
- 管理画面は認証済みユーザのみ表示する
- 未認証で `/admin` にアクセスした場合は 404 を返す
- Firebase config は環境変数で管理する

### 画像管理

- 画像データを登録・更新できるようにする
- 画像は DB で管理する
- AWS を使う場合は S3 も可

---

## 3. 追加要素

今回、追加要素は広げすぎず、以下に絞る。

- バリデーション
- 例外処理
- クライアント側エラー表示
- 最低限のAPI設計書

---

## 4. ADVANCE

- AWS 上に構築する
- HTTPS でアクセスできるようにする

---

## 5. 必要画面

- `/`
  - 公開トップページ
- `/contact`
  - 問い合わせページ
- `/login`
  - 管理者ログインページ
- `/admin`
  - 管理画面

---

## 6. データ構成

### profile

- id
- name
- bio
- imageUrl

### works

- id
- title
- description
- url
- imageUrl
- sortOrder

### skills

- id
- name
- level
- sortOrder

### contacts

- id
- name
- email
- message
- createdAt

---

## 7. API最小構成

### まず実装対象にするAPI

- `GET /portfolio`
- `POST /contacts`
- `PUT /admin/profile`
- `POST /admin/works`
- `PUT /admin/works/:id`
- `POST /admin/skills`
- `PUT /admin/skills/:id`

### 余裕があれば追加するAPI

- `DELETE /admin/works/:id`
- `DELETE /admin/skills/:id`

---

## 8. 認証・認可方針

- Firebase Authentication を使う
- `/login` で管理者がログインする
- ログイン成功後に `/admin` へ遷移する
- `/admin` 表示時に認証状態を確認する
- 未認証の場合は 404 を返す
- 管理APIも認証必須にする

---

## 9. 画像管理方針

- 画像は `profile` と `works` で扱う
- 各データに `imageUrl` を持たせる
- 管理画面から登録・更新できるようにする
- AWS に進む場合は S3 へ切り替えられる余地を残す

---

## 10. 実装順

1. 初期構築
2. 最小の設計整理
3. DB / API基盤
4. 公開トップページ
5. 問い合わせフォーム
6. ログイン
7. 管理画面
8. 認証保護
9. 追加要素
10. README / デモ会整理
11. 余裕があれば AWS + HTTPS

---

## 11. 時間配分

- タスク0：3時間
- 初期構築：5時間
- 最低限の設計整理：2時間
- DB / API基盤：6時間
- 公開トップページ + 問い合わせ：4時間
- ログイン + 管理画面：5時間
- 認証保護 + 追加要素：3時間
- README / デモ会整理 / 最終確認：2時間

合計：30時間

---

## 12. 縮小案

### 絶対にやること

- MUST本体
- 最低限のAPI設計書
- README最低限
- デモ会で説明できる最低限の整理

### 余裕があればやること

- バリデーション強化
- 例外処理強化
- エラー表示改善
- 削除機能
- UI改善
- AWS + HTTPS

### 後回しにすること

- テスト
- カバレッジ
- ログ強化
- 詳細設計書
- UI演出
- 問い合わせ一覧管理
- 複数画像対応

---

## 13. 現時点の方針まとめ

- 新しい技術学習のため、フロントは Nuxt.js を採用する
- 30時間で完成を目指すため、バックエンドは Express.js + Prisma + PostgreSQL の現実的な構成にする
- 管理画面は `/admin` の1ページでまとめて管理する
- 認証は Firebase Authentication を使い、未認証時の `/admin` は 404 にする
- 追加要素は最小限に絞り、まず MUST 達成を優先する
