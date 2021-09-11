# use-amcharts

React hook for working with Amcharts 4 library. Supports TypeScript type-inference and automatically destroys on component unmount.

### Installation

```
npm i use-amcharts
```

### Usage
```tsx
export const Chart = () => {
  const { amchartsElRef } = useAmcharts(am4charts.XYChart, (chart) => {
    // Configure chart...
  });

  return <div ref={amchartsElRef} />;
};
```

### Runnable example

```tsx
let data = [];
let visits = 10;

for (let i = 1; i < 366; i++) {
  visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
}

export const Chart = () => {
  const { amchartsElRef } = useAmcharts(am4charts.XYChart, (chart) => {
    chart.data = data;
    
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
    
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.tooltipText = "{valueY.value}";
  });

  return <div ref={amchartsElRef} />;
};
```

### Storybook

To run Storybook example:
- `git clone`
- `npm install`
- `npm run storybook` 
