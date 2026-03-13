<script setup lang="ts">
type Profile = {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
};

type Work = {
  id: number;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  sortOrder: number;
};

type Skill = {
  id: number;
  name: string;
  level: number;
  sortOrder: number;
};

type PortfolioResponse = {
  profile: Profile | null;
  works: Work[];
  skills: Skill[];
};

const profileImageError = ref(false);

const { data, error } = useFetch<PortfolioResponse>(
  "http://localhost:3001/portfolio",
);
</script>

<template>
  <div v-if="error">
    <p>データの取得に失敗しました</p>
  </div>
  <main v-else class="page">
    <header class="page-header">
      <p class="page-header-logo">Portfolio</p>
      <nav class="page-header-nav">
        <NuxtLink to="/contact" class="page-header-link">お問い合わせ</NuxtLink>
        <NuxtLink to="/login" class="page-header-link">管理者ログイン</NuxtLink>
      </nav>
    </header>

    <section class="section section-first">
      <h2 class="section-title">Profile</h2>

      <div v-if="data?.profile">
        <p class="profile-name">{{ data.profile.name }}</p>
        <p class="profile-bio">{{ data.profile.bio }}</p>
        <img
          v-if="data.profile.imageUrl && !profileImageError"
          :src="data.profile.imageUrl"
          alt="プロフィール画像"
          class="profile-image"
          @error="profileImageError = true"
        />
      </div>

      <p v-else>プロフィール情報はまだ登録されていません</p>
    </section>

    <section class="section">
      <h2 class="section-title">Works</h2>

      <div v-if="data?.works?.length">
        <div v-for="work in data.works" :key="work.id" class="work-item">
          <p class="work-title">{{ work.title }}</p>
          <p class="work-description">{{ work.description }}</p>
          <a :href="work.url" class="work-link">{{ work.url }}</a>
          <img
            v-if="work.imageUrl"
            :src="work.imageUrl"
            alt="作品画像"
            class="work-image"
          />
        </div>
      </div>

      <p v-else>制作実績はまだありません</p>
    </section>

    <section class="section">
      <h2 class="section-title">Skills</h2>

      <div v-if="data?.skills?.length">
        <div v-for="skill in data.skills" :key="skill.id" class="skill-item">
          <p class="skill-name">{{ skill.name }}</p>
          <p class="skill-level">{{ skill.level }}</p>
        </div>
      </div>

      <p v-else>スキル情報はまだありません</p>
    </section>
  </main>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #d1d5db;
}

.page-header-logo {
  font-size: 28px;
  font-weight: 700;
}

.page-header-nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.page-header-link {
  display: inline-block;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
}

.page-header-link:hover {
  background-color: #f9fafb;
}

.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

.section {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #d1d5db;
}

.section-first {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.section-title {
  margin-bottom: 16px;
  font-size: 24px;
}

.profile-name,
.work-title,
.skill-name {
  margin-bottom: 8px;
  font-weight: 600;
}

.profile-bio,
.work-description,
.skill-level {
  margin-bottom: 12px;
  line-height: 1.6;
}

.work-item,
.skill-item {
  margin-bottom: 20px;
}

.work-link {
  display: inline-block;
  margin-top: 4px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.profile-image {
  display: block;
  max-width: 40%;
  height: auto;
  margin-top: 12px;
}

.work-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin-top: 12px;
}
</style>
