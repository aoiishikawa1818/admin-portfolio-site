<script setup lang="ts">
const { user, isAuthReady, initAuth } = useAuth();

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
      <p class="admin-placeholder">このセクションはこれから実装します。</p>
    </section>

    <section class="admin-section">
      <h2 class="admin-subtitle">作品管理</h2>
      <p class="admin-placeholder">このセクションはこれから実装します。</p>
    </section>

    <section class="admin-section">
      <h2 class="admin-subtitle">スキル管理</h2>
      <p class="admin-placeholder">このセクションはこれから実装します。</p>
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
</style>
