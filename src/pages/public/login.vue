<template lang="pug">
#app
  v-app(dark)
    v-toolbar.white
      img(src="/static/images/logo.png", height="64px", width="128px")
      v-spacer
      public-navigation

    v-content
      v-container(fill-height, fluid)
        v-layout(align-center, justify-center)
          v-flex(xs12).display-flex.justify-center
            v-card(light, width="30%")
              v-card-title(primary-title) Login eh?
              v-card-text
                p this is a sample login text
              v-card-actions
                v-btn.submit.primaryFont--text(
                  flat,
                  color="primary",
                  @click.native.stop="login"
                ) Login
</template>

<script>
export default {
  name: 'login',
  data () {
    return {}
  },

  methods: {
    login () {
      alert(1)
    }
  },

  components: {
    publicNavigation: () => import('@/components/public-navigation')
  }
}
</script>
