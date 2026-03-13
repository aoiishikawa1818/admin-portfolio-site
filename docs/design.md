# design

## このメモの目的

このファイルは、管理画面付きポートフォリオサイト課題の最小設計メモです。
30時間の制約の中で、実装に必要な内容だけを整理し、DB / API / 認証の実装時に見返せるようにすることを目的とします。

## データ設計

### profile

ポートフォリオ運営者本人の基本情報を表すデータです。
公開トップページで表示し、管理画面で編集します。
今回は 1 件運用とします。

- id: 必須
- name: 必須
- bio: 必須
- imageUrl: 必須

### works

制作実績を表すデータです。
公開トップページで一覧表示し、管理画面で追加・編集します。

- id: 必須
- title: 必須
- description: 必須
- url: 必須
- imageUrl: 必須
- sortOrder: 必須

### skills

スキル情報を表すデータです。
公開トップページで一覧表示し、管理画面で追加・編集します。

- id: 必須
- name: 必須
- level: 必須
- sortOrder: 必須

### contacts

問い合わせフォームから送信された内容を保存するデータです。
公開トップページには表示せず、問い合わせ記録として保存します。

- id: 必須
- name: 必須
- email: 必須
- message: 必須
- createdAt: 必須

### 補足

- works.sortOrder と skills.sortOrder は表示順を決めるために使います
- contacts.createdAt は問い合わせ保存時の日時を表し、自動で入る前提です
- profile は複数件ではなく 1 件だけ管理する前提です

## API設計

### 公開API

- GET /portfolio
  - 公開トップページ表示用の API
  - profile / works / skills をまとめて返します
  - works と skills は sortOrder をもとに表示順をそろえて返す前提です
  - フロント側の公開トップページから参照します
  - 認証不要

- POST /contacts
  - 問い合わせ内容を保存する API
  - 受け取る項目は name / email / message です
  - 公開の問い合わせフォームから送信します
  - 成功時は保存完了メッセージを返す前提です
  - 認証不要

### 管理API

- PUT /admin/profile
  - 管理画面のプロフィール保存で使う API
  - name / bio / imageUrl を受け取って profile 1 件を更新します
  - Firebase Authentication の ID トークンによる認証が必要です

- POST /admin/works
  - 管理画面の作品追加で使う API
  - title / description / url / imageUrl / sortOrder を受け取って works を 1 件追加します
  - Firebase Authentication の ID トークンによる認証が必要です

- PUT /admin/works/:id
  - 管理画面の作品編集で使う API
  - :id で対象の works を指定して更新します
  - Firebase Authentication の ID トークンによる認証が必要です

- POST /admin/skills
  - 管理画面のスキル追加で使う API
  - name / level / sortOrder を受け取って skills を 1 件追加します
  - Firebase Authentication の ID トークンによる認証が必要です

- PUT /admin/skills/:id
  - 管理画面のスキル編集で使う API
  - :id で対象の skills を指定して更新します
  - Firebase Authentication の ID トークンによる認証が必要です

### レスポンス / エラー方針

- GET /portfolio は表示に必要なデータをそのまま返します
- POST /contacts は最小構成として成功メッセージを返します
- 管理APIは追加 / 更新後のデータを返します
- バリデーションエラーは 400
- 認証エラーは 401
- サーバー内部エラーは 500

## 認証保護

### 画面側

- /login は管理画面に入るためのログインページです
- /admin はログイン済みのときだけ表示します
- /admin は未認証時に 404 として扱います

### API側

- 管理APIはすべて認証必須です
- Nuxt から管理APIを呼ぶときは Firebase Authentication の IDトークンを送ります
- Authorization ヘッダーに Bearer トークンとして付与します
- Express 側で認証 middleware によりトークンを検証します
- トークンがない、または無効な場合は 401 Unauthorized を返します

## 実装方針メモ

- 次のタスクでは、まず Prisma schema にこのデータ設計を反映します
- その後、Express で公開APIと管理APIの土台を作ります
- 管理APIには認証 middleware を付ける前提で進めます
- フロント側は公開ページ、問い合わせ、ログイン、管理画面の順で進めます
