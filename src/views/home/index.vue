<template>
  <div class="h-full px-5 pt-4 bg-[#100C2A]">
    <div ref="TEREF" class="h-[calc(100%-4rem)]"></div>
  </div>
  <!-- <div class="hoverinfo absolute top-2 right-2 border" ref="hoverinfoRef"></div> -->
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Plotly from 'plotly.js-dist'
import { x1, x2, x3, y1, y2, y3, x4, y4 } from "@/assets/data1.js"
// import HelloWorld from './components/HelloWorld.vue'

const TEREF = ref(null)
var trace1 = ref({
  x: x1,
  y: y1,
  mode: "lines",
  name: "线1",
  type: "scatter",
  line: { color: 'grey' }
});

var trace2 = {
  x: x2,
  y: y2,
  mode: "lines",
  name: '线2',
  // type: "scatter",
  fill: 'tonexty',
  line: { color: 'green' }
};

var trace3 = {
  x: x3,
  y: y3,
  mode: "lines",
  name: '线3',
  // type: "scatter",
  // fill: 'red',
  line: { color: 'red' }
};
var trace4 = {
  x: x4,
  y: y4,
  mode: "lines",
  name: '线4',
  // type: "scatter",
  // fill: 'red',
  line: { color: 'orange' }
};
var data = [trace1.value, trace2, trace3, trace4];
// var layout = { title: 'Click Here<br>to Edit Chart Title' };
var layout = {
  hovermode: 'x unified',
  xaxis: {
    showgrid: false
  },
  yaxis: {
    showgrid: false
  }
}
console.log(TEREF)


const hoverinfoRef = ref(null)
onMounted(() => {
  Plotly.newPlot(TEREF.value, data, layout);
  TEREF.value.on('plotly_hover', function (data) {
    console.log(data)
    var infotext = data.points.map(function (d) {
      return (`x: ${d.x}<br>y: ${d.y} (${d.fullData.name})`);
    }).join('<br>');
  })
})
</script>

<style scoped>
.hoverinfo {
  border: 1px solid #000;
  padding: 20px;
}
</style>