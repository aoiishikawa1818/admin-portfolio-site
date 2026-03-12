<script setup lang="ts">
const { user, isAuthReady, initAuth } = useAuth();

const profileForm = reactive({
  name: "",
  bio: "",
  imageUrl: "",
});

const workForm = reactive({
  title: "",
  description: "",
  url: "",
  imageUrl: "",
  sortOrder: 1,
});

const skillForm = reactive({
  name: "",
  level: "",
  sortOrder: 1,
});

onMounted(() => {
  initAuth();
});
</script>

<template>
  <main class="admin-page">
    <section class="admin-section">
      <h1 class="admin-title">管理画面</h1>
      <p class="admin-description">
        このページでは、プロフィール、作品、スキルの管理を行います。
      </p>

      <p v-if="!isAuthReady" class="admin-status">
        認証状態を確認しています...
      </p>
      <p v-else class="admin-status">
        {{ user ? "ログイン状態を確認できました。" : "未ログイン状態です。" }}
      </p>
    </section>

    <section class="admin-section">
      <h2 class="admin-subtitle">プロフィール管理</h2>
      <p class="admin-placeholder">
        管理画面からプロフィール情報を編集できるようにします。
      </p>

      <form class="admin-form">
        <div class="admin-form-group">
          <label class="admin-label" for="profile-name">名前</label>
          <input
            id="profile-name"
            v-model="profileForm.name"
            class="admin-input"
            type="text"
            placeholder="例: 石川 葵"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="profile-bio">自己紹介</label>
          <textarea
            id="profile-bio"
            v-model="profileForm.bio"
            class="admin-textarea"
            rows="5"
            placeholder="自己紹介を入力してください"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="profile-image-url">画像URL</label>
          <input
            id="profile-image-url"
            v-model="profileForm.imageUrl"
            class="admin-input"
            type="text"
            placeholder="/images/profile/profile.png"
          />
        </div>

        <button class="admin-button" type="button">保存</button>
      </form>
    </section>

    <section class="admin-section">
      <h2 class="admin-subtitle">作品管理</h2>
      <p class="admin-placeholder">
        管理画面から作品情報を追加できるようにします。
      </p>

      <form class="admin-form">
        <div class="admin-form-group">
          <label class="admin-label" for="work-title">作品名</label>
          <input
            id="work-title"
            v-model="workForm.title"
            class="admin-input"
            type="text"
            placeholder="例: Portfolio Site"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="work-description">説明</label>
          <textarea
            id="work-description"
            v-model="workForm.description"
            class="admin-textarea"
            rows="4"
            placeholder="作品の説明を入力してください"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="work-url">URL</label>
          <input
            id="work-url"
            v-model="workForm.url"
            class="admin-input"
            type="text"
            placeholder="https://example.com"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="work-image-url">画像URL</label>
          <input
            id="work-image-url"
            v-model="workForm.imageUrl"
            class="admin-input"
            type="text"
            placeholder="/images/works/work.png"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="work-sort-order">表示順</label>
          <input
            id="work-sort-order"
            v-model="workForm.sortOrder"
            class="admin-input"
            type="number"
            min="1"
          />
        </div>

        <button class="admin-button" type="button">作品を追加</button>
      </form>
    </section>

    <section class="admin-section">
      <h2 class="admin-subtitle">スキル管理</h2>
      <p class="admin-placeholder">
        管理画面からスキル情報を追加できるようにします。
      </p>

      <form class="admin-form">
        <div class="admin-form-group">
          <label class="admin-label" for="skill-name">スキル名</label>
          <input
            id="skill-name"
            v-model="skillForm.name"
            class="admin-input"
            type="text"
            placeholder="例: TypeScript"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="skill-level">レベル</label>
          <input
            id="skill-level"
            v-model="skillForm.level"
            class="admin-input"
            type="text"
            placeholder="例: 実務レベル / 学習中"
          />
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="skill-sort-order">表示順</label>
          <input
            id="skill-sort-order"
            v-model="skillForm.sortOrder"
            class="admin-input"
            type="number"
            min="1"
          />
        </div>

        <button class="admin-button" type="button">スキルを追加</button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.admin-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.admin-section {
  margin-bottom: 32px;
  padding: 24px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #ffffff;
}

.admin-title {
  margin: 0 0 12px;
  font-size: 32px;
}

.admin-description {
  margin: 0 0 16px;
  line-height: 1.7;
}

.admin-status {
  margin: 0;
  color: #374151;
  font-size: 14px;
}

.admin-subtitle {
  margin: 0 0 8px;
  font-size: 24px;
}

.admin-placeholder {
  margin: 0;
  color: #4b5563;
}

.admin-form {
  margin-top: 20px;
}

.admin-form-group {
  margin-bottom: 20px;
}

.admin-label {
  display: inline-block;
  margin-bottom: 8px;
  font-weight: 600;
}

.admin-input,
.admin-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font: inherit;
  box-sizing: border-box;
}

.admin-textarea {
  resize: vertical;
}

.admin-button {
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font: inherit;
  cursor: pointer;
}
</style>
