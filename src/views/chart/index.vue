<template>
  <!-- <div class="bg-black h-full w-full"> -->
  <div class="h-12 handle-box">
    <div class="flex times">
      <div class="item">秒</div>
      <div class="item">日</div>
      <div class="item">周</div>
    </div>
  </div>
  <div class="w-[calc(100%-2rem)] h-[calc(100%-4rem)] flex">
    <div class="w-14 h-full bg-white mr-3">
      123    
    </div>
    <div id="chart" class="h-full w-full" />
  </div>
  <!-- </div> -->
</template>
<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { init, dispose } from "klinecharts";

onMounted(() => {
  const chart = init("chart");

  function genData(timestamp = new Date().getTime(), length = 8000) {
    let basePrice = 5000;
    timestamp =
      Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000;
    const dataList = [];
    for (let i = 0; i < length; i++) {
      const prices = [];
      for (let j = 0; j < 4; j++) {
        prices.push(basePrice + Math.random() * 60 - 30);
      }
      prices.sort();
      const open = +prices[Math.round(Math.random() * 3)].toFixed(2);
      const high = +prices[3].toFixed(2);
      const low = +prices[0].toFixed(2);
      const close = +prices[Math.round(Math.random() * 3)].toFixed(2);
      const volume = Math.round(Math.random() * 100) + 10;
      const turnover = ((open + high + low + close) / 4) * volume;
      dataList.push({ timestamp, open, high, low, close, volume, turnover });

      basePrice = close;
      timestamp += 60 * 1000;
    }

    console.log(dataList);
    return dataList;
  }
  chart.applyNewData(genData());

  chart.createIndicator("MA", false, { id: "candle_pane" });
  chart.createIndicator("VOL", false, {
    id: "xxx",
    style: {
      lines: [
        {
          size: 1,
          style: "solid",
          dashedValue: [2, 2],
          color: "#FF9600",
        },
      ],
    },
  });
  chart.createIndicator("MACD");
  // chart.createIndicator('OBV')
  // chart.createIndicator('PVT')
  // chart.createIndicator('PSY')
  chart.createIndicator("ROC");
  chart.createIndicator("RSI");
  // chart.createIndicator('SMA')
  // chart.createIndicator('KDJ')
  // chart.createIndicator('SAR')
  // chart.createIndicator('TRIX')
  chart.setStyles({
    // indicator: {
    //   showRule: 'rect'
    // },
    candle: {
      tooltip: {
        showType: 'rect',
        // showRule: "rect",
        // custom: (data) => {
        //   const { prev, current } = data;
        //   const prevClose = prev?.close ?? current.open;
        //   const change = ((current.close - prevClose) / prevClose) * 100;
        //   return [
        //     { title: "open", value: current.open.toFixed(2) },
        //     { title: "close", value: current.close.toFixed(2) },
        //     {
        //       title: "Change: ",
        //       value: {
        //         text: `${change.toFixed(2)}%`,
        //         color: change < 0 ? "#EF5350" : "#26A69A",
        //       },
        //     },
        //   ];
        // },
      },
    },
  });
});

onUnmounted(() => {
  dispose("chart");
});
</script>
<style scoped>
.handle-box {
  border-bottom: 1px solid #000;
  padding-left: 50px
}
.times {
  @apply h-full;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.times .item {
  width: 50px;
  @apply h-full bg-slate-400 text-center leading-[3rem] text-white mr-1 cursor-pointer;
}
</style>
