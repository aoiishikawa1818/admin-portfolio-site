<script setup lang="ts">
const config = useRuntimeConfig();

const name = ref("");
const email = ref("");
const message = ref("");
const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const nameError = ref("");
const emailError = ref("");
const messageError = ref("");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleSubmit = async () => {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  nameError.value = "";
  emailError.value = "";
  messageError.value = "";

  const trimmedName = name.value.trim();
  const trimmedEmail = email.value.trim();
  const trimmedMessage = message.value.trim();

  if (!trimmedName) {
    nameError.value = "お名前を入力してください。";
  }

  if (!trimmedEmail) {
    emailError.value = "メールアドレスを入力してください。";
  } else if (!emailPattern.test(trimmedEmail)) {
    emailError.value = "メールアドレスの形式が正しくありません。";
  }

  if (!trimmedMessage) {
    messageError.value = "お問い合わせ内容を入力してください。";
  }

  if (nameError.value || emailError.value || messageError.value) {
    isSubmitting.value = false;
    return;
  }

  try {
    await $fetch(`${config.public.apiBaseUrl}/contacts`, {
      method: "POST",
      body: {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      },
    });
    successMessage.value = "お問い合わせを送信しました。";
    name.value = "";
    email.value = "";
    message.value = "";
  } catch {
    errorMessage.value = "お問い合わせの送信に失敗しました。";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <main class="contact-page">
    <section class="contact-section">
      <h1 class="contact-title">お問い合わせ</h1>
      <p class="contact-description">
        こちらのページからお問い合わせを送信できます。
      </p>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label" for="name">お名前</label>
          <input id="name" v-model="name" type="text" class="form-input" />
          <p v-if="nameError" class="field-error">{{ nameError }}</p>
        </div>

        <div class="form-group">
          <label class="form-label" for="email">メールアドレス</label>
          <input id="email" v-model="email" type="email" class="form-input" />
          <p v-if="emailError" class="field-error">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label class="form-label" for="message">お問い合わせ内容</label>
          <textarea
            id="message"
            v-model="message"
            class="form-textarea"
          ></textarea>
          <p v-if="messageError" class="field-error">{{ messageError }}</p>
        </div>

        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? "送信中..." : "送信する" }}
        </button>
      </form>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  padding: 40px 24px;
}

.contact-section {
  max-width: 720px;
  margin: 0 auto;
}

.contact-title {
  margin: 0 0 16px;
  font-size: 32px;
  font-weight: 700;
}

.contact-description {
  margin: 0 0 24px;
  line-height: 1.7;
}

.success-message {
  margin: 0 0 16px;
  color: #166534;
}

.error-message {
  margin: 0 0 16px;
  color: #b91c1c;
}

.contact-form {
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

.field-error {
  margin: 0;
  color: #b91c1c;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px;
  font: inherit;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-sizing: border-box;
}

.form-textarea {
  min-height: 160px;
  resize: vertical;
}

.submit-button {
  width: fit-content;
  padding: 12px 20px;
  font: inherit;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: 1;
}
</style>
