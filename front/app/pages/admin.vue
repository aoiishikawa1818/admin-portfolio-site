<script setup lang="ts">
const { user, isAuthReady, initAuth } = useAuth();
const hasShownAuthError = ref(false);

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
  level: 1,
  sortOrder: 1,
});

const profileMessage = ref("");
const profileNameError = ref("");
const profileBioError = ref("");
const profileImageUrlError = ref("");
const isSavingProfile = ref(false);
const workMessage = ref("");
const workTitleError = ref("");
const workSortOrderError = ref("");
const workDescriptionError = ref("");
const workUrlError = ref("");
const workImageUrlError = ref("");
const isSavingWork = ref(false);
const skillMessage = ref("");
const skillNameError = ref("");
const skillLevelError = ref("");
const skillSortOrderError = ref("");
const isSavingSkill = ref(false);

const handleSaveProfile = async () => {
  if (!user.value) {
    profileMessage.value = "ログイン状態を確認してから保存してください。";
    return;
  }

  profileNameError.value = "";
  profileBioError.value = "";
  profileImageUrlError.value = "";

  if (!profileForm.name.trim()) {
    profileNameError.value = "名前を入力してください。";
    profileMessage.value = "";
    return;
  }

  if (!profileForm.bio.trim()) {
    profileBioError.value = "自己紹介を入力してください。";
    profileMessage.value = "";
    return;
  }

  if (!profileForm.imageUrl.trim()) {
    profileImageUrlError.value = "画像URLを入力してください。";
    profileMessage.value = "";
    return;
  }

  isSavingProfile.value = true;
  profileNameError.value = "";
  profileBioError.value = "";
  profileImageUrlError.value = "";
  profileMessage.value = "";

  try {
    const idToken = await user.value.getIdToken();

    const profileApiUrl = "http://localhost:3001/admin/profile";

    await $fetch(profileApiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: {
        name: profileForm.name,
        bio: profileForm.bio,
        imageUrl: profileForm.imageUrl,
      },
    });

    profileMessage.value = "プロフィールを保存しました。";
  } catch (error: any) {
    console.error(error);
    const statusCode = error?.statusCode ?? error?.status;

    if (statusCode === 401) {
      profileMessage.value = "ログイン状態を確認してから保存してください。";
    } else {
      profileMessage.value = "プロフィールの保存に失敗しました。";
    }
  } finally {
    isSavingProfile.value = false;
  }
};

const handleCreateWork = async () => {
  if (!user.value) {
    workMessage.value = "ログイン状態を確認してから追加してください。";
    return;
  }

  workTitleError.value = "";
  workDescriptionError.value = "";
  workUrlError.value = "";
  workImageUrlError.value = "";
  workSortOrderError.value = "";

  if (!workForm.title.trim()) {
    workTitleError.value = "作品名を入力してください。";
    workMessage.value = "";
    return;
  }

  if (!workForm.description.trim()) {
    workDescriptionError.value = "説明を入力してください。";
    workMessage.value = "";
    return;
  }

  if (!workForm.url.trim()) {
    workUrlError.value = "URLを入力してください。";
    workMessage.value = "";
    return;
  }

  if (!workForm.imageUrl.trim()) {
    workImageUrlError.value = "画像URLを入力してください。";
    workMessage.value = "";
    return;
  }

  if (workForm.sortOrder < 1) {
    workSortOrderError.value = "表示順は1以上で入力してください。";
    workMessage.value = "";
    return;
  }

  isSavingWork.value = true;
  workTitleError.value = "";
  workDescriptionError.value = "";
  workUrlError.value = "";
  workImageUrlError.value = "";
  workSortOrderError.value = "";
  workMessage.value = "";

  try {
    const idToken = await user.value.getIdToken();
    const workApiUrl = "http://localhost:3001/admin/works";

    await $fetch(workApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: {
        title: workForm.title,
        description: workForm.description,
        url: workForm.url,
        imageUrl: workForm.imageUrl,
        sortOrder: workForm.sortOrder,
      },
    });

    workMessage.value = "作品を追加しました。";
    workForm.title = "";
    workForm.description = "";
    workForm.url = "";
    workForm.imageUrl = "";
    workForm.sortOrder = 1;
  } catch (error: any) {
    console.error(error);
    const statusCode = error?.statusCode ?? error?.status;

    if (statusCode === 401) {
      workMessage.value = "ログイン状態を確認してから追加してください。";
    } else {
      workMessage.value = "作品の追加に失敗しました。";
    }
  } finally {
    isSavingWork.value = false;
  }
};

const handleCreateSkill = async () => {
  if (!user.value) {
    skillMessage.value = "ログイン状態を確認してから追加してください。";
    return;
  }

  skillNameError.value = "";
  skillLevelError.value = "";
  skillSortOrderError.value = "";

  if (!skillForm.name.trim()) {
    skillNameError.value = "スキル名を入力してください。";
    skillMessage.value = "";
    return;
  }

  if (skillForm.level < 1) {
    skillLevelError.value = "レベルは1以上で入力してください。";
    skillMessage.value = "";
    return;
  }

  if (skillForm.sortOrder < 1) {
    skillSortOrderError.value = "表示順は1以上で入力してください。";
    skillMessage.value = "";
    return;
  }

  isSavingSkill.value = true;
  skillNameError.value = "";
  skillLevelError.value = "";
  skillSortOrderError.value = "";
  skillMessage.value = "";

  try {
    const idToken = await user.value.getIdToken();
    const skillApiUrl = "http://localhost:3001/admin/skills";

    await $fetch(skillApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: {
        name: skillForm.name,
        level: skillForm.level,
        sortOrder: skillForm.sortOrder,
      },
    });

    skillMessage.value = "スキルを追加しました。";
    skillForm.name = "";
    skillForm.level = 1;
    skillForm.sortOrder = 1;
  } catch (error: any) {
    console.error(error);
    const statusCode = error?.statusCode ?? error?.status;

    if (statusCode === 401) {
      skillMessage.value = "ログイン状態を確認してから追加してください。";
    } else {
      skillMessage.value = "スキルの追加に失敗しました。";
    }
  } finally {
    isSavingSkill.value = false;
  }
};

watchEffect(() => {
  if (!isAuthReady.value) {
    return;
  }

  if (!user.value && !hasShownAuthError.value) {
    hasShownAuthError.value = true;

    showError(
      createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      }),
    );
  }
});

onMounted(() => {
  initAuth();
});
</script>

<template>
  <section v-if="!isAuthReady" class="admin-page">
    <div class="admin-section">
      <p class="admin-status">認証状態を確認しています...</p>
    </div>
  </section>
  <main v-if="isAuthReady && user" class="admin-page">
    <section class="admin-section">
      <h1 class="admin-title">管理画面</h1>
      <p class="admin-description">
        このページでは、プロフィール、作品、スキルの管理を行います。
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
          <p v-if="profileNameError" class="admin-form-error">
            {{ profileNameError }}
          </p>
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
          <p v-if="profileBioError" class="admin-form-error">
            {{ profileBioError }}
          </p>
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
          <p v-if="profileImageUrlError" class="admin-form-error">
            {{ profileImageUrlError }}
          </p>
        </div>

        <p v-if="profileMessage" class="admin-form-message">
          {{ profileMessage }}
        </p>

        <button
          class="admin-button"
          type="button"
          :disabled="isSavingProfile"
          @click="handleSaveProfile"
        >
          {{ isSavingProfile ? "保存中..." : "保存" }}
        </button>
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
          <p v-if="workTitleError" class="admin-form-error">
            {{ workTitleError }}
          </p>
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
          <p v-if="workDescriptionError" class="admin-form-error">
            {{ workDescriptionError }}
          </p>
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
          <p v-if="workUrlError" class="admin-form-error">
            {{ workUrlError }}
          </p>
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
          <p v-if="workImageUrlError" class="admin-form-error">
            {{ workImageUrlError }}
          </p>
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
          <p v-if="workSortOrderError" class="admin-form-error">
            {{ workSortOrderError }}
          </p>
        </div>

        <p v-if="workMessage" class="admin-form-message">
          {{ workMessage }}
        </p>

        <button
          class="admin-button"
          type="button"
          :disabled="isSavingWork"
          @click="handleCreateWork"
        >
          {{ isSavingWork ? "追加中..." : "作品を追加" }}
        </button>
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
          <p v-if="skillNameError" class="admin-form-error">
            {{ skillNameError }}
          </p>
        </div>

        <div class="admin-form-group">
          <label class="admin-label" for="skill-level">レベル</label>
          <input
            id="skill-level"
            v-model.number="skillForm.level"
            class="admin-input"
            type="number"
            min="1"
            placeholder="例: 3"
          />
          <p v-if="skillLevelError" class="admin-form-error">
            {{ skillLevelError }}
          </p>
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
          <p v-if="skillSortOrderError" class="admin-form-error">
            {{ skillSortOrderError }}
          </p>
        </div>

        <p v-if="skillMessage" class="admin-form-message">
          {{ skillMessage }}
        </p>

        <button
          class="admin-button"
          type="button"
          :disabled="isSavingSkill"
          @click="handleCreateSkill"
        >
          {{ isSavingSkill ? "追加中..." : "スキルを追加" }}
        </button>
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

.admin-form-message {
  margin: 0 0 16px;
  color: #374151;
}

.admin-form-error {
  margin: 8px 0 0;
  color: #dc2626;
  font-size: 14px;
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

.admin-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
