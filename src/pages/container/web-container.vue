<template lang="pug">
  v-app#inspire
    v-navigation-drawer(fixed, :clipped="$vuetify.breakpoint.mdAndUp", app, v-model="drawer")
      v-list(dense)
        template(v-for="item in items")
          v-layout(row, v-if="item.heading", align-center, :key="item.heading")
            v-flex(xs6)
              v-subheader(v-if="item.heading")
                | {{ item.heading }}
            v-flex.text-xs-center(xs6)
              a.body-2.black--text(href="#!") EDIT
          v-list-group(v-else-if="item.children", v-model="item.model", :key="item.text", :prepend-icon="item.model ? item.icon : item['icon-alt']", append-icon)
            v-list-tile(slot="activator")
              v-list-tile-content
                v-list-tile-title
                  | {{ item.text }}
            v-list-tile(v-for="(child, i) in item.children", :key="i", @click="")
              v-list-tile-action(v-if="child.icon")
                v-icon {{ child.icon }}
              v-list-tile-content
                v-list-tile-title
                  | {{ child.text }}
          v-list-tile(v-else, @click="", :key="item.text")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title
                | {{ item.text }}
    v-toolbar(color="blue darken-3", dark, app, :clipped-left="$vuetify.breakpoint.mdAndUp", fixed)
      v-toolbar-title.ml-0.pl-3(style="width: 300px")
        v-toolbar-side-icon(@click.stop="drawer = !drawer")
        span.hidden-sm-and-down Blaise Ordering v0.1
      v-spacer
      v-btn(icon)
        v-icon apps
      v-btn(icon)
        v-icon notifications
      v-btn(icon, large)
        v-avatar(size="32px", tile)
          img(src="https://scontent.fmnl4-3.fna.fbcdn.net/v/t1.0-9/24909985_10208150294635202_1303972830500063392_n.jpg?_nc_eui2=v1%3AAeFfuP3rF2bs2FHuVS2hbZwtbVYOSmVWzQ9XyMNrJ0X39GYKWWH3uLnCrq5ITPKKuIF_DgXdOKgSValmpOJHwXQM07xPuhuoYfP5b9P_fgkiJg&oh=74f4db153b4c57da4f56fddfdf48ec99&oe=5B059F9A")
    v-content
      v-container(fluid, fill-height)
        router-view
</template>

<script>
export default {
  name: 'web-container',
  data () {
    return {
      drawer: null,
      items: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard' },
        { icon: 'mdi-account-multiple-outline', text: 'Client Management' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Product Management',
          model: false,
          children: [
            { icon: 'mdi-download-network', text: 'Supplier' },
            { icon: 'mdi-shape', text: 'Category' },
            { icon: 'mdi-water-pump', text: 'Products' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Quotations',
          model: false,
          children: [
            { icon: 'mdi-shape', text: 'Pending' },
            { icon: 'mdi-view-list', text: 'Quotation List' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Reports',
          model: false,
          children: [
            { icon: 'mdi-file-chart', text: 'Sales' },
            { icon: 'mdi-chart-timeline', text: 'Delivery Receipt' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'User Management',
          model: false,
          children: [
            { icon: 'mdi-account-plus', text: 'Users' },
            { icon: 'mdi-verified', text: 'User Roles' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'mdi-logout', text: 'Logout' }
      ]
    }
  },

  components: {}
}
</script>
