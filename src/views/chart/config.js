export const tooltipFunc = (data) => {
  return `
  <div>
    <div>
      <div
        style='display: inline-block;
        width: 10px;
        height: 20px;
        color: ${data.color}'
      >
      ●
      </div>
      <span>${"成功率：10.00%"}</span>
    </div>
    <div>
      <div
        style='display: inline-block;
        width: 10px;
        height: 20px;
        color: ${data.color}'
      >
      ●
      </div>
      <span>开盘：${data.data[1]}</span>
    </div>
    <div>
      <div
        style='display: inline-block;
        width: 10px;
        height: 20px;
        color: ${data.color}'
      >
      ●
      </div>
      <span>最高：${data.data[2]}</span>
    </div>
    <div>
      <div
        style='display: inline-block;
        width: 10px;
        height: 20px;
        color: ${data.color}'
      >
      ●
      </div>
      <span>最低：${data.data[3]}</span>
    </div>
    <div>
      <div
        style='display: inline-block;
        width: 10px;
        height: 20px;
        color: ${data.color}'
      >
      ●
      </div>
      <span>收盘：${data.data[4]}</span>
    </div>
  </div>
`;
};


export const generatedDataList =  (
  baseTimestamp = Date.now(),
  basePrice = 5000,
  dataSize = 800
) => {
  const dataList = [];
  let timestamp = Math.floor(baseTimestamp / 60 / 1000) * 60 * 1000;
  let baseValue = basePrice;
  const prices = [];
  for (let i = 0; i < dataSize; i++) {
    baseValue = baseValue + Math.random() * 20 - 10;
    for (let j = 0; j < 4; j++) {
      prices[j] = (Math.random() - 0.5) * 12 + baseValue;
    }
    prices.sort();
    const openIdx = +Math.round(Math.random() * 3).toFixed(0);
    let closeIdx = +Math.round(Math.random() * 2).toFixed(0);
    if (closeIdx === openIdx) {
      closeIdx++;
    }
    const volume = Math.random() * 50 + 10;
    const kLineData = {
      open: prices[openIdx],
      low: prices[0],
      high: prices[3],
      close: prices[closeIdx],
      volume: volume,
      timestamp,
    };
    timestamp -= 60 * 1000;
    kLineData.turnover =
      ((kLineData.open + kLineData.close + kLineData.high + kLineData.low) /
        4) *
      volume;
    dataList.unshift(kLineData);
  }
  return dataList;
}
