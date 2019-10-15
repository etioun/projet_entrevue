<template>
  <div id="app">
    <Filter_ :types="types" v-on:change="on_change_filter($event)"></Filter_>
    <GmapMap
      :center="{lat:48.4492061, lng:-68.5252555}"
      :zoom="14"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :label="m.label"
        :title="m.title"
      />
    </GmapMap>
  </div>
</template>

<script>
import Filter_ from "./components/Filter_.vue";

const REST_SERVICE_HOST = "192.168.99.100:8081";

export default {
  name: "app",
  components: { Filter_ },
  data: function data() {
    return {
      types: [],
      markers: []
    };
  },
  created() {
    this.fetchTypes();
    this.fetchMarkers();
  },
  methods: {
    fetchTypes: function() {
      fetch("http://" + REST_SERVICE_HOST + "/institution-types/?format=json")
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.types = data.map(value => {
            return { name: value, selected: true };
          });
        });
    },
    fetchMarkers: function() {
      let url = "http://" + REST_SERVICE_HOST + "/institutions/?format=json";
      if (this.types.length > 0) {
        let filtered = this.types
          .filter(value => value.selected == true)
          .map(value => value.name)
          .reduce((prev, current) => {
            return prev == "" ? current : prev + "," + current;
          }, "");
        url += "&types=" + filtered;
      }

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.markers = data.map((value, index) => {
            return {
              id: index,
              label: value.name,
              title: value.name,
              position: { lat: value.lat, lng: value.long }
            };
          });
        });
    },
    on_change_filter: function() {
      this.fetchMarkers();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
