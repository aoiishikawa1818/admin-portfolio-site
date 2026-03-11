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
  <main v-else>
    <h1>Portfolio</h1>
    <p>公開トップページのベースです。</p>

    <section>
      <h2>Profile</h2>

      <div v-if="data?.profile">
        <p>{{ data.profile.name }}</p>
        <p>{{ data.profile.bio }}</p>
        <img
          v-if="data.profile.imageUrl && !profileImageError"
          :src="data.profile.imageUrl"
          alt="プロフィール画像"
          @error="profileImageError = true"
        />
      </div>

      <p v-else>プロフィール情報はまだ登録されていません</p>
    </section>

    <section>
      <h2>Works</h2>

      <div v-if="data?.works?.length">
        <div v-for="work in data.works" :key="work.id">
          <p>{{ work.title }}</p>
          <p>{{ work.description }}</p>
          <a :href="work.url">{{ work.url }}</a>
        </div>
      </div>

      <p v-else>制作実績はまだありません</p>
    </section>

    <section>
      <h2>Skills</h2>

      <div v-if="data?.skills?.length">
        <div v-for="skill in data.skills" :key="skill.id">
          <p>{{ skill.name }}</p>
          <p>{{ skill.level }}</p>
        </div>
      </div>

      <p v-else>スキル情報はまだありません</p>
    </section>
  </main>
</template>
