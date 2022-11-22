<template>
  <div class="popup">
    <div class="card" style="width: 18rem">
      <div class="pt-3 pb-2">
        <img :src="clientData.avatar" class="card-img-top avatar ml-1" alt="" />
      </div>
      <div class="pb-4 pt-2 px-4">
        <h5 class="card-title fw-bolder">
          {{ checkClientValues("name") }}
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
        const newName = this.containsHTML(this.clientData.name);
        return newName ? newName : "No Name!";
      } else if (newKey === "title") {
        const newTitle = this.containsHTML(this.clientData.title);
        return newTitle ? newTitle : "No Title!";
      } else if (newKey === "nationality") {
        const newNationality = this.containsHTML(this.clientData.nationality);
        return newNationality ? newNationality : "No Nationality!";
      } else if (newKey === "quote") {
        const newQuote = this.containsHTML(this.clientData.quote);
        return newQuote ? newQuote : "No Quote!";
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
