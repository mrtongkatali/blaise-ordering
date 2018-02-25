<template lang="pug">
  div
    v-alert(type='success', :value='true')
      | This is a success alert.
    v-alert(type='info', :value='true')
      | This is a info alert.
    v-alert(type='warning', :value='true')
      | This is a warning alert.
    v-alert(type='error', :value='true')
      | This is a error alert.
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {}
  },

  components: {
    publicNavigation: () => import('@/components/public-navigation')
  }
}
</script>
