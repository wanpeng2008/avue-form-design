<template>
  <div id="app">
    <avue-form-design
      :formData="formData"
      @submit="handleSubmit"
      :storage="false"
    ></avue-form-design>
  </div>
</template>

<script>
export default {
  name: "form-design-page",
  data() {
    return {
      formData: {},
    };
  },
  created() {
    let id = this.$route.params.id;
    let formsStr = localStorage.getItem("forms");

    let forms = JSON.parse(formsStr || "[]") || [];
    if (forms.length) {
      this.formData = forms.find((item) => item.id == id);
    }
  },
  methods: {
    handleSubmit(val) {
      console.log(val);
    },
  },
};
</script>
