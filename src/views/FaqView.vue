<template>
  <div class="faq-container p-4">
    <div class="faq-box">
      <h2>All your question answered here...</h2>

      <ul>
        <li v-for="faq of faqs" :key="faq.question">
          {{ faq.question }}
          <div>
            <span>{{ faq.answer }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const faqs = ref([
      {
        question: "What is this?",
        answer: "This is a dashboard to showcase CRUD of user and APIs",
      },
      {
        question: "Why are my user after 10 are ID 11",
        answer:
          "JSON placeholder doesnt actually create user 11, rather it mocks it after the creation. Hence when you create more user after 10, the ID after the 10th user will be set as 11",
      },
      {
        question: "Why can't I update user 11",
        answer:
          "Refering to question above this, user 11 doesnt actually exist hence a warning message will be displayed. On a real server it should be updated. But do try update user before 11",
      },
    ]);
    return {
      faqs,
    };
  },
});
</script>

<style lang="less" scoped>
li {
  margin: 10px 0px;
  span {
    margin-left: 1rem;
  }
}
</style>
