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
