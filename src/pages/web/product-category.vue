<template lang="pug">
v-layout(row, wrap)
  v-flex(xs12)
    v-text-field(append-icon="search", label="Search", single-line, hide-details, v-model="search").mb-2

    v-data-table.elevation-1(:headers="headers", :items="categoryList", :search="search", :rows-per-page-items="rowPerPageItems")
      template(slot="headerCell", slot-scope="props")
        v-tooltip(bottom)
          span(slot="activator")
            | {{ props.header.text }}
          span
            | {{ props.header.text }}
      template(slot="items", slot-scope="props")
        tr(@click.stop="selectCategory").pointer
          td {{ props.item.id }}
          td {{ props.item.name }}
          td.text-xs-left {{ props.item.description }}

  v-dialog(v-model="categoryDialog.show", max-width="500px", persistent)
      v-form(ref="createCategoryForm")
        v-card
          v-card-title.title Add New Category
          v-card-text
            v-layout(row, wrap)
              v-flex(xs12)
                v-text-field(
                  light,
                  single-line,
                  prepend-icon="mdi-shape",
                  v-model="input.categoryName",
                  label="Category Name",
                  :rules="[inputRules()['required']]",
                  @keyup.enter.native="createCategory",
                  required
                )
              v-flex(xs12)
              v-text-field(
                light,
                single-line,
                textarea,
                v-model="input.categoryDescription",
                label="Description",
                @keyup.enter.native="createCategory"
              )
        v-card-actions.display-flex.justify-end
          v-btn(color="red", flat, @click.stop="categoryDialog.show = false", :disabled="loading.create") Close
          v-btn(
            medium,
            color="primary",
            :loading="loading.create",
            @click.native.stop="createCategory"
          ) Add Category

  v-btn(fab, bottom, right, color="green", dark, fixed, @click.stop="categoryDialog.show = true")
    v-icon add
</template>

<script>
import { ProductService } from '@/api'

export default {
  name: 'product-category',
  data () {
    return {
      rowPerPageItems: [15, 25, 50, {'text':'All','value':-1}],
      headers: [
        {text: 'ID', align: 'left', sortable: true, value: 'id'},
        {text: 'Category Name', align: 'left', sortable: true, value: 'name'},
        {text: 'Description', align: 'left', value: 'description'}
      ],
      search: null,
      input: {
        categoryName: null,
        categoryDescription: null
      },
      categoryList: [],
      categoryDialog: {
        show: false,
        selected: {}
      },
      loading: {
        create: false
      }
    }
  },

  methods: {
    selectCategory () {
      alert(1)
    },

    async createCategory () {
      this.loading.create = false
      if (!this.$refs.createCategoryForm.validate()) return

      try {
        this.loading.create = true
        let payload = {
          name: this.input.categoryName,
          description: this.input.categoryDescription
        }

        await ProductService.createCategory(payload)

        this.loadCategoryList()
        this.displayToast('Successfully added new category', 'success')
        this.categoryDialog.show = false
        this.loading.create = false

        this.input = {
          categoryName: null,
          categoryDescription: null
        }
      } catch (e) {
        console.log(`ee`, e)
        this.loading.create = false
        this.displayToast(this.parseErrorRes(e) || 'An error occured. Please try again', 'error')
      }
    },

    async loadCategoryList () {
      try {
        this.categoryList = await ProductService.loadCategoryList()
      } catch (e) {
        this.displayToast('An error occured when trying to load your category List. Please try again', 'error')
      }
    }
  },

  components: {},

  mounted () {
    this.loadCategoryList()
  }
}
</script>
