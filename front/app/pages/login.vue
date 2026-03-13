<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "../lib/firebase";
const router = useRouter();
const email = ref("");
const password = ref("");
const isSubmitting = ref(false);
const loginError = ref("");

const auth = useFirebaseAuth();

const handleLogin = async () => {
  if (isSubmitting.value) {
    return;
  }
  loginError.value = "";

  isSubmitting.value = true;

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    await router.push("/admin");
  } catch {
    loginError.value = "ログインに失敗しました。";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
<template>
  <main class="login-page">
    <section class="login-card">
      <NuxtLink to="/" class="back-link">← トップページへ戻る</NuxtLink>
      <h1 class="login-title">ログイン</h1>
      <p class="login-description">
        管理画面を利用するために、登録済みのアカウントでログインしてください。
      </p>

      <form class="login-form" @submit.prevent="handleLogin">
        <p v-if="loginError" class="login-error">{{ loginError }}</p>
        <div class="form-group">
          <label class="form-label" for="email">メールアドレス</label>
          <input
            id="email"
            class="form-input"
            v-model="email"
            type="email"
            placeholder="sample@example.com"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">パスワード</label>
          <input
            id="password"
            class="form-input"
            v-model="password"
            type="password"
            placeholder="パスワードを入力"
          />
        </div>

        <button class="login-button" type="submit" :disabled="isSubmitting">
          ログイン
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  padding: 40px 16px;
}

.login-card {
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  background-color: #ffffff;
}

.back-link {
  display: inline-block;
  margin: 0 0 20px;
  color: inherit;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.login-title {
  margin: 0 0 12px;
  font-size: 28px;
}

.login-description {
  margin: 0 0 24px;
  line-height: 1.6;
  color: #555555;
}

.login-error {
  margin: 0;
  color: #d14343;
  font-weight: 600;
}

.login-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-label {
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font: inherit;
}

.login-button {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
</style>
