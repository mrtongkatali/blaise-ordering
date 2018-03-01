<template lang="pug">
  v-layout(row, wrap)
    v-flex(xs12)
      v-text-field(append-icon="search", label="Search", single-line, hide-details, v-model="search").mb-2

      v-data-table.elevation-1(:headers="headers", :items="productList", :search="search", :rows-per-page-items="rowPerPageItems")
        template(slot="headerCell", slot-scope="props")
          v-tooltip(bottom)
            span(slot="activator")
              | {{ props.header.text }}
            span
              | {{ props.header.text }}
        template(slot="items", slot-scope="props")
          tr.pointer
            td {{ props.item.id }}
            td {{ props.item.name }}
            td {{ props.item.address }}
            td {{ props.item.currency }}
            td.text-xs-left {{ props.item.status }}
            td.text-xs-left {{ dateFormat(props.item.created_at) }}
            td.text-xs-left
              v-btn( light, small, color="red", @click.native.stop="deleteSupplier(props.item)").white--text Delete

    v-btn(fab, bottom, right, color="green", dark, fixed, @click.stop="$router.push({name: 'product-create'})")
      v-icon add
</template>

<script>
import moment from 'moment'
import { ProductService } from '@/api'

export default {
  name: 'products',
  data () {
    return {
      rowPerPageItems: [15, 25, 50, {'text': 'All', 'value': -1}],
      headers: [
        {text: 'ID', align: 'left', sortable: true, value: 'id'},
        {text: 'Supplier Name', align: 'left', sortable: true, value: 'name'},
        {text: 'Address', align: 'left', value: 'address'},
        {text: 'Currency', align: 'left', value: 'currency'},
        {text: 'Status', align: 'left', value: 'status'},
        {text: 'Created', align: 'left', value: 'created_at'},
        {text: 'Actions', align: 'left', value: 'id'}
      ],
      search: null,
      input: {
        name: null,
        price: null,
        categories: [],
        supplierId: null
      },
      productList: [],
      products: {
        show: false,
        selected: null
      },
      loading: {
        create: false
      }
    }
  },

  methods: {
    dateFormat (datetime) {
      return (datetime ? moment(datetime).format(this.timeformat()) : '')
    },

    async createSupplier () {
      this.loading.create = false
      if (!this.$refs.createProductForm.validate()) return

      try {
        this.loading.create = true
        await ProductService.createSupplier(this.input)

        this.loadSupplierList()
        this.displayToast('Successfully added new supplier', 'success')
        this.products.show = false
        this.loading.create = false
      } catch (e) {
        this.loading.create = false
        this.displayToast(this.parseErrorRes(e) || 'An error occured. Please try again', 'error')
      }
    },

    async loadProductList () {
      try {
        this.productList = await ProductService.loadProductList('active')
      } catch (e) {
        this.displayToast('An error occured when trying to load your product List. Please try again', 'error')
      }
    }
  },

  components: {},

  mounted () {
    this.loadProductList()
  }
}
</script>
