<template lang="pug">
  #app
    router-view
</template>

<script>
  export default {
    name: 'electron',
  };
</script>

<style lang="scss">
@import './style/_layout.scss';

html {
  font-size: 16px;

  @include size;
  @extend %init;
  body {
    font-size: 1rem;

    @include size;
    #app {
      @extend body;
    }
  }
}
</style>
