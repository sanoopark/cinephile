<template>
  <div class="search">
    <div class="search__background">
      <img
        src="../../static/search-background.png"
        alt="search-background"
        class="search__background-image"
      />
    </div>
    <form class="search__form" @submit.prevent>
      <fieldset>
        <legend class="search__legend">검색 결과</legend>
        <label>
          <input
            :value="keyword"
            type="search"
            name="search"
            class="search__input"
            placeholder="Input your search keywords and press Enter."
            @input="saveUserInput"
            @keyup.enter="fetchSearchResults"
          />
        </label>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    keyword() {
      return this.$store.state.searchResults.keyword;
    }
  },
  methods: {
    saveUserInput(e) {
      this.$store.commit('searchResults/saveUserInput', e.target.value);
    },
    fetchSearchResults() {
      this.$store.dispatch('searchResults/fetchSearchResults');
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  min-width: 200px;

  &__background {
    width: 100%;
    height: 100%;
  }

  &__background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__form {
    position: absolute;
    top: 44%;
    margin: 0 3rem;
    z-index: 1;
    width: 60%;
  }

  &__legend {
    @include blind;
  }

  &__input {
    display: flex;
    box-sizing: border-box;
    padding: 1rem;
    font-size: $size-font-lg;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 0px 0.5rem 1.25rem rgb(0 0 0 / 16%);
  }
}

@media screen and (max-width: $breakpoint-xs - 1) {
  .search {
    &__form {
      top: 100%;
      width: 100%;
      margin: 0;
    }

    &__input {
      font-size: $size-font-xs;
    }
  }
}

@media screen and (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm - 1) {
  .search {
    &__form {
      top: 100%;
      width: 100%;
      margin: 0;
    }

    &__input {
      font-size: $size-font-xs;
    }
  }
}

@media screen and (min-width: $breakpoint-sm) and (max-width: $breakpoint-md - 1) {
  .search {
    &__input {
      font-size: $size-font-md;
    }
  }
}
</style>
