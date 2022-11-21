<template>
  <div class="popup">
    <div class="popup-inner">
      <div>
        <slot />
        <div>
          <img :src="clientData.avatar" class="avatar" alt="" />
        </div>
        <div>
          Name: {{ clientData.name }}
          <br />
          Job title: {{ clientData.title }}
        </div>
      </div>
      <button class="popup-close-btn" @click="$emit('closePopUp', false)">
        Close Popup
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["clientData"],
};
</script>

<style lang="scss" scoped>
@import url("./PopUp.scss");
</style>
