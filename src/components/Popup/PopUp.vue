<template>
  <div class="popup">
    <div class="popup-inner">
      <div>
        <slot />
        <div>
          <img :src="avatar" class="avatar" alt="" />
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
  data() {
    return {
      avatar: this.clientData.avatar,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  background: #fff;
  padding: 32px;
}

.avatar {
  height: 128px;
  width: 128px;
}
</style>
