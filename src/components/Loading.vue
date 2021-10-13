<template>
  <div class="loading" @click="hideLoadingAnimation">
    <div class="loading__overlay"></div>
    <img src="../../static/loading.gif" alt="Loading" class="loading__image" />
  </div>
</template>

<script>
export default {
  methods: {
    hideLoadingAnimation() {
      this.$store.commit('searchResults/changeLoadingStatus');
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  @include init-position;
  z-index: 2;

  &__overlay {
    @include init-position;
    opacity: 0.7;
    background-color: #141414;
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    opacity: 0.7;
  }
}
</style>
