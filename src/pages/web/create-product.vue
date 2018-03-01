<template lang="pug">
v-layout(row, wrap)
  v-flex(xs12)
    v-card
      v-card-title.title Add New Product
      v-card-text
        v-form
          v-layout(row)
            v-flex(xs12, md6)
              v-layout(wrap)
                v-flex(xs12)
                  v-select(
                    light,
                    prepend-icon="mdi-truck-delivery",
                    label="Supplier",
                    :items="supplier.list",
                    v-model="supplier.selected",
                    item-value="id",
                    item-text="name"
                  )
                v-flex(xs12)
                  v-select(
                    multiple,
                    chips,
                    prepend-icon="mdi-shape",
                    persistent-hint
                    label="Product Category",
                    v-model="category.selected",
                    :items="category.list",
                    item-value="id",
                    item-text="name"
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-water-pump",
                    v-model="input.name",
                    label="Product Name",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="registerClient",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-tag-text-outline",
                    v-model="input.brand",
                    label="Brand",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="registerClient",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-tag-outline",
                    v-model="input.specification",
                    label="Specification",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="registerClient",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-note-outline",
                    v-model="input.description",
                    label="Description",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="registerClient"
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-currency-usd",
                    v-model="input.price",
                    label="Price",
                    :rules="[inputRules()['money']]",
                    @keyup.enter.native="registerClient",
                    required
                  )
                v-flex(xs12).mt-2
                  v-switch(label="Featured Product?", v-model="input.isFeatured")
            v-flex(xs12, md6)
              v-layout(wrap)
                v-flex(xs12)
                  div.ml-2.subheading Upload your product image here
      v-card-actions.display-flex.justify-end
        v-btn(color="red", flat, @click.stop="$route.push({name: 'products'})", :disabled="loading.create") Cancel
        v-btn(
          medium,
          color="primary",
          :loading="loading.create",
          @click.stop="createCategory"
        ) Add Product
</template>

<script>
/* eslint-disable no-unused-vars */
import moment from 'moment'
import { ProductService } from '@/api'
import { filter } from 'lodash/collection'

export default {
  name: 'products',
  data () {
    return {
      input: {
        name: null,
        brand: null,
        specification: null,
        description: null,
        isFeatured: false,
        price: null,
        categories: []
      },
      supplier: {
        list: [],
        selected: null
      },
      category: {
        list: [],
        selected: null
      },
      loading: {
        create: false
      }
    }
  },

  methods: {
    async loadSupplierList () {
      try {
        this.supplier.list = await ProductService.loadSupplierList('active')
      } catch (e) {
        this.displayToast('An error occured when trying to load your supplier List. Please try again', 'error')
      }
    },

    async loadCategoryList () {
      try {
        this.category.list = await ProductService.loadCategoryList('active')
      } catch (e) {
        this.displayToast('An error occured when trying to load your category List. Please try again', 'error')
      }
    }
  },

  created () {
    this.loadSupplierList()
    this.loadCategoryList()
  }
}
</script>
