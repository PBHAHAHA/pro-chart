<template>
  <div>
    <div id="map" style="width: 800px;height: 900px;"></div>
  </div>
</template>


<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
import {tooltipFunc} from "./config"

onMounted(() => {
  getMap()
})

const getMap = () => {
  var chartDom = document.getElementById('map');
  var myChart = echarts.init(chartDom, 'dark');
  const upColor = '#32E5FF';
  const downColor = '#F70A31';

  function splitData(rawData) {
    let categoryData = [];
    let values = [];
    let volumes = [];
    for (let i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
      volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
    }
    console.log(categoryData, values, volumes);
    return {
      categoryData: categoryData,
      values: values,
      volumes: volumes
    };
  }

  function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.values.length; i < len; i++) {
      if (i < dayCount) {
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += data.values[i - j][1];
      }
      result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
  }

  const rowData = [
    ['2022-12-06', 10461.55, 10485.18, 10389.85, 10543.03, 224448680.00],
    ['2022-12-07', 10485.18, 10427.18, 10341.19, 10539.25, 197310000],
    ['2022-12-08', 10428.67, 10538.37, 10426.89, 10573.85, 186280000],
    ['2022-12-09', 10534.52, 10553.85, 10454.52, 10639.03, 260090000],
    ['2022-12-12', 10556.37, 10600.51, 10503.7, 10666.88, 254170000],
    ['2022-12-13', 10601.4, 10528.66, 10447.92, 10676.96, 224300000],
    ['2022-12-14', 10522.77, 10623.62, 10453.11, 10665.7, 214920000],
    ['2022-12-15', 10624.22, 10623.18, 10545.03, 10717.4, 219720000],
    ['2022-12-16', 10625.25, 10568.29, 10490.14, 10691.77, 234260000],
    ['2022-12-19', 10568, 10702.51, 10510.44, 10725.18, 186170000],
    ['2022-12-20', 10701.1, 10609.92, 10579.33, 10748.81, 206560000],
    ['2022-12-21', 10610.07, 10468.37, 10412.44, 10703.25, 247660000],
    ['2022-12-22', 10467.41, 10510.29, 10369.92, 10611.56, 273970000],
    ['2022-12-23', 10510.22, 10488.07, 10385.56, 10551.03, 229009593.00],
    ['2022-12-26', 10487.78, 10499.18, 10395.55, 10614.44, 224800000],
    ['2022-12-27', 10499.48, 10505.18, 10414.15, 10571.48, 183810000],
    ['2022-12-28', 10503.11, 10470.74, 10394.81, 10567.85, 227760000],
    ['2022-12-29', 10469.33, 10495.55, 10399.92, 10566.37, 187810000],
    ['2022-12-30', 10494.89, 10593.03, 10433.7, 10634.81, 182880000],
    ['2023-01-03', 10592, 10579.03, 10433.7, 10634.81, 160720000],
    ['2023-01-04', 10578.74, 10613.85, 10511.18, 10667.03, 187977674.00],
    ['2022-12-06', 10605.48, 10737.7, 10561.55, 10779.4, 277850000],
    ['2022-12-06', 10735.18, 10694.07, 10636.44, 10775.03, 280350287.00],
    ['2022-12-06', 10696.22, 10627.85, 10578.66, 10755.47, 208340000],
    ['2022-12-06', 10628.88, 10714.88, 10628.88, 10762.07, 169730000],
    ['2022-12-06', 10706.68, 10671.99, 10623.62, 10764.36, 164370000],
    ['2022-12-06', 10674.59, 10664.73, 10626.44, 10794.95, 194644290.00],
    ['2022-12-06', 10666.29, 10619.03, 10559.11, 10722.77, 133464502.00],
    ['2022-12-06', 10619.55, 10609.62, 10508.89, 10711.84, 118352409.00],
    ['2022-12-06', 10609.55, 10566.37, 10479.33, 10681.4, 126757096.00],
    ['2022-12-06', 10566.59, 10601.62, 10509.4, 10660.73, 232171544.00],
    ['2022-12-06', 10598.14, 10580.14, 10493.7, 10652.96, 148576218.00],
    ['2022-12-06', 10581.55, 10583.92, 10519.03, 10689.55, 178369740.00],
    ['2022-12-06', 10582.25, 10678.14, 10568.74, 10720.14, 124209181.00],
    ['2022-12-06', 10678.36, 10591.48, 10539.4, 10713.92, 135509039.00],
    ['2022-12-06', 10588.59, 10593.11, 10506.66, 10651.03, 93463047.00],
    ['2022-12-06', 10593.48, 10588, 10522.59, 10645.33, 143606824.00]
  ];

  var data = splitData(rowData);

  let options = {
    animation: false,
    title: [
      {
        text: 'K线图',
        left: 50,
        textStyle: {
          fontSize: '18px',
          color: 'rgba(255, 255, 255, 0.85)'
        }
      },
    ],
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      right: '8%',
      top: '2%',
      bottom: '20%',
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      align: 'left',
      formatter: (val) => {
        if (val == 'MA5') {
          return `{a|${val}}`;
        } else if (val == 'MA10') {
          return `{b|${val}}`;
        } else if (val == 'MA20') {
          return `{c|${val}}`;
        }
        return `{d|${val}}`;
      },
      textStyle: {
        height: 10,
        color: '#FF4500',
        rich: {
          a: {
            color: '#E6B005'
          },
          b: {
            color: '#32E5FF'
          },
          c: {
            color: '#2061DF'
          },
          d: {
            color: '#B74BEE'
          }
        }
      },
      data: ['001', '002', '003', '004']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textStyle: {
        color: '#000'
      },
      position: function (pos, params, el, elRect, size) {
        const obj = {
          top: 10
        };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      }
      // extraCssText: 'width: 170px'
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: 'all'
        }
      ],
      label: {
        backgroundColor: '#777'
      }
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: downColor
        },
        {
          value: -1,
          color: upColor
        }
      ]
    },
    grid: [
      {
        left: '10%',
        right: '8%',
        height: '60%'
      },
      {
        left: '10%',
        right: '8%',
        top: '80%',
        height: '16%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: data.categoryData,
        boundaryGap: true,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.65)'
        },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100
        },

      },
      {
        type: 'category',
        gridIndex: 1,
        data: data.categoryData,
        boundaryGap: true,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisLabel: {
          color: 'rgba(255, 255, 255, 0.65)'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(247, 10, 49, 0.2)'
          }
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: {
          show: true,
          formatter: (value) => {
            if (value >= 10000) {
              value = value / 10000 + ' 万';
            }
            if (value >= 1000) {
              value = value / 1000 + ' 千';
            }
            return value;
          }
        },
        axisLine: {
          showMaxLabel: false,
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)'
          }
        },
        axisTick: { show: false },
        splitLine: { show: true }
      }
    ],
    series: [
      {
        name: '条数',
        type: 'candlestick',
        data: data.values,
        itemStyle: {
          color: upColor,
          color0: undefined,
          borderColor: upColor,
          borderColor0: downColor
        },
        tooltip: {
          formatter: function (param) {
            param = param[0];
            return [
              'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
              'Open: ' + param.data[0] + '<br/>',
              'Close: ' + param.data[1] + '<br/>',
              'Lowest: ' + param.data[2] + '<br/>',
              'Highest: ' + param.data[3] + '<br/>'
            ].join('');
          }
        }
      },
      {
        name: '001',
        type: 'line',
        showSymbol: false,
        data: calculateMA(5, data),
        smooth: true,
        lineStyle: {}
      },
      {
        name: '002',
        type: 'line',
        showSymbol: false,
        data: calculateMA(10, data),
        smooth: true,
        lineStyle: {}
      },
      {
        name: '003',
        type: 'line',
        showSymbol: false,
        data: calculateMA(20, data),
        smooth: true,
        lineStyle: {}
      },
      {
        name: '004',
        type: 'line',
        showSymbol: false,
        data: calculateMA(30, data),
        smooth: true,
        lineStyle: {}
      },
      {
        name: '数据转换',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.volumes
      }
    ]
  };

  myChart.setOption(options);
}

</script>