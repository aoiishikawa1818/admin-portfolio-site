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

const config = useRuntimeConfig();
const profileImageError = ref(false);

const { data, error } = useFetch<PortfolioResponse>(
  `${config.public.apiBaseUrl}/portfolio`,
);
</script>

<template>
  <div v-if="error">
    <p>データの取得に失敗しました</p>
  </div>
  <main v-else class="page">
    <h1 class="page-title">Portfolio</h1>
    <p class="page-description">公開トップページです。</p>

    <section class="section">
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
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 48px;
}

.page-title {
  margin-bottom: 8px;
  font-size: 32px;
}

.page-description {
  margin-bottom: 24px;
}

.section {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #d1d5db;
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
