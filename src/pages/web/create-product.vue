<template lang="pug">
v-layout(row, wrap)
  v-flex(xs12)
    v-card
      v-card-title.title Add New Product
      v-card-text
        v-form(ref="createProductForm")
          v-layout(row)
            v-flex(xs12, md6)
              v-layout(wrap)
                v-flex(xs12)
                  v-select(
                    light,
                    required,
                    return-object
                    prepend-icon="mdi-truck-delivery",
                    label="Supplier",
                    v-model="supplier.selected",
                    item-text="name",
                    :items="supplier.list",
                    :rules="[inputRules()['required']]"
                  )
                v-flex(xs12)
                  v-select(
                    multiple,
                    chips,
                    required,
                    prepend-icon="mdi-shape",
                    persistent-hint
                    label="Product Category",
                    v-model="category.selected",
                    item-value="id",
                    item-text="name"
                    :rules="[inputRules()['multipleRequired']]",
                    :items="category.list",
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-water-pump",
                    v-model="input.name",
                    label="Product Name",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="addProducts",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-tag-text-outline",
                    v-model="input.brand",
                    label="Brand",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="addProducts",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-tag-outline",
                    v-model="input.specification",
                    label="Specification",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="addProducts",
                    required
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-note-outline",
                    v-model="input.description",
                    label="Description",
                    :rules="[inputRules()['required']]",
                    @keyup.enter.native="addProducts"
                  )
                v-flex(xs12)
                  v-text-field(
                    light,
                    prepend-icon="mdi-currency-usd",
                    v-model="input.price",
                    label="Price",
                    :rules="[inputRules()['money']]",
                    @keyup.enter.native="addProducts",
                    required
                  )
                v-flex(xs12).mt-2
                  v-switch(label="Featured Product?", v-model="input.isFeatured")
            v-flex(xs12, md6)
              v-layout(wrap)
                v-flex(xs12).mt-3
                  div.ml-3.subheading Upload your product image here
                  vue-dropzone#dropzone.ml-3(
                    ref="imageDropzone",
                    :options="dropzoneOptions",
                    v-on:vdropzone-success-multiple="onProductImageSuccess",
                    v-on:vdropzone-sending="uploadProductImage"
                  )

      v-card-actions.display-flex.justify-end
        v-btn(color="red", flat, @click.stop="$route.push({name: 'products'})", :disabled="loading.create") Cancel
        v-btn(
          medium,
          color="primary",
          :loading="loading.create",
          @click.stop="addProducts"
        ) Add Product
</template>

<script>
/* eslint-disable no-unused-vars */
import moment from 'moment'
import { mapGetters } from 'vuex'
import { ProductService } from '@/api'
import { filter } from 'lodash/collection'
import { merge } from 'lodash/object'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

export default {
  name: 'products',
  data () {
    return {
      product: {},
      dropzoneOptions: {
        acceptedFiles: 'image/jpg, image/jpeg',
        autoProcessQueue: false,
        url: process.env.API_SERVER_URL + '/api/product/upload/image',
        thumbnailWidth: 150,
        maxFilesize: 3,
        uploadMultiple: true
      },
      input: {
        name: null,
        brand: null,
        specification: null,
        description: null,
        isFeatured: false,
        price: null
      },
      productImages: [],
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
    async uploadProductImage (file, xhr, formData) {
      formData.append('productId', 1)
      formData.append('productImage', file)
      console.log(`file`, file)
      if (this.product && this.product.id) {
        // formData.append('productId', 1)
        // formData.append('productImage', file.dataURL)
      }
    },

    async addProducts () {
      this.$refs.imageDropzone.processQueue()
      if (!this.$refs.createProductForm.validate()) return
      try {
        this.loading.create = true
        let payload = merge(this.input, {
          categories: this.category.selected,
          supplierId: this.supplier.selected.id
        })

        this.product = await ProductService.createProduct(payload)
        this.$refs.imageDropzone.processQueue()
        console.log(`this.product`, this.product)
      } catch (e) {
        console.log(`e`, e)
        this.loading.create = false
        this.displayToast(this.parseErrorRes(e) || 'An error occur when trying to create order. Please try again', 'error')
      }
    },

    onProductImageSuccess (file, response) {
      this.displayToast('Product has been created.', 'success')
      this.loading.create = true
    },

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

  computed: {
    ...mapGetters([
      'getToken'
    ])
  },

  components: {
    vueDropzone: vue2Dropzone
  },

  mounted () {
    this.$refs.imageDropzone.setOption('headers', {'Authorization': `Bearer ${this.getToken}`})
  },

  created () {
    this.loadSupplierList()
    this.loadCategoryList()
  }
}
</script>
