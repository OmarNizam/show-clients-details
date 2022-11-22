<template>
  <div class="popup">
    <div class="card" style="width: 18rem">
      <div class="pt-3 pb-2">
        <img :src="clientData.avatar" class="card-img-top avatar ml-1" alt="" />
      </div>
      <div class="pb-4 pt-2 px-4">
        <h5 class="card-title fw-bolder">
          {{ containsHTML(clientData.name) }}
        </h5>
        <p class="card-text text-start pt-1">
          <span class="fw-bolder me-1">Job title: </span
          >{{ checkClientValues("title") }}
        </p>
        <p class="card-text text-start">
          <span class="fw-bolder me-1">Nationality: </span
          >{{ checkClientValues("nationality") }}
        </p>
        <p class="card-text text-start">
          <span class="fw-bolder me-1">Quote: </span>
          {{ checkClientValues("quote") }}
        </p>
        <a href="#" class="btn btn-primary" @click="$emit('closePopUp', false)"
          >Go back</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["clientData"],
  methods: {
    checkClientValues(newKey) {
      if (newKey === "name") {
        return this.clientData.name ? this.clientData.name : "No Name!";
      } else if (newKey === "title") {
        return this.clientData.title ? this.clientData.title : "No Title!";
      } else if (newKey === "nationality") {
        return this.clientData.nationality
          ? this.clientData.nationality
          : "No Nationality!";
      } else if (newKey === "quote") {
        return this.clientData.quote ? this.clientData.quote : "No Quote!";
      }
    },
    containsHTML: (str) => {
      return !/<[a-z][\s\S]*>/i.test(str)
        ? str
        : `${str.replace(/<[a-z][\s\S]*>/i, "")}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("./PopUp.scss");
</style>
