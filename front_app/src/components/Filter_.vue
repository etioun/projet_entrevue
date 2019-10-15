<template>
  <div>
    <h1>Institutions</h1>
    <span v-for="type in types" :key="type.name">
      <input
        type="checkbox"
        :name="type.name"
        :value="type.name"
        v-model="type.selected"
        @change="on_change_selection($event)"
      />
      {{type.name}}
    </span>
  </div>
</template>

<script>
export default {
  name: "Filter_",
  props: {
    types: Array
  },
  methods: {
    on_change_selection: function(event) {
      this.$emit("change", this.types);
    }
  }
};
</script>

