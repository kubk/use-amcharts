import * as React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import { color, DropShadowFilter } from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import amchartThemeAnimated from '@amcharts/amcharts4/themes/animated';
import amchartsLocaleRu from '@amcharts/amcharts4/lang/ru_RU';
import { useAmcharts } from '../src/use-amcharts';

am4core.useTheme(amchartThemeAnimated);

export const tooltipShadow = (series: am4charts.LineSeries): void => {
  const filter = new DropShadowFilter();
  filter.opacity = 0.1;
  filter.dx = 0;
  filter.dy = 2;
  filter.blur = 6;
  if (!series.tooltip){
    throw new Error('Tooltip hasn\'t been added');
  }
  series.tooltip.background.filters.clear();
  series.tooltip.background.filters.push(filter);
};

const chartColors = {
  white: '#fff',
  primary: '#ff6926',
  secondary: '#f69362',
};

type Props = {
  data: { date: Date; value: number }[];
};

export const WeightMeasurementChart = (props: Props) => {
  const { data } = props;

  const { amchartsElRef } = useAmcharts(am4charts.XYChart, (chart) => {
    chart.language.locale = amchartsLocaleRu;
    chart.fontFamily = 'Open Sans, sans-serif';

    chart.data = data;
    chart.dateFormatter.dateFormat = 'd MMM yyyy';

    const min = Math.min(...data.map(({ value }) => value));
    const max = Math.max(...data.map(({ value }) => value));

    const yAxis = chart.xAxes.push(new am4charts.DateAxis());
    yAxis.renderer.labels.template.disabled = true;
    yAxis.renderer.grid.template.disabled = true;

    const xAxis = chart.yAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.labels.template.disabled = true;
    xAxis.min = min - 0.5;
    xAxis.max = max + 0.5;
    xAxis.renderer.labels.template.location = 0.0001;
    xAxis.renderer.grid.template.disabled = true;
    xAxis.startLocation = 0.8;
    xAxis.endLocation = 0.8;

    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.fillOpacity = 1;
    lineSeries.dataFields.valueY = 'value';
    lineSeries.dataFields.dateX = 'date';
    lineSeries.fill = color(chartColors.secondary);
    lineSeries.stroke = color(chartColors.primary);
    if (!lineSeries.tooltip){
      throw new Error('Tooltip hasn\'t been added');
    }
    lineSeries.tooltip.getFillFromObject = false;
    lineSeries.tooltip.background.fill = color(chartColors.white);
    lineSeries.tooltip.background.fillOpacity = 1;
    tooltipShadow(lineSeries);

    const fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0];
    fillModifier.offsets = [0, 0.08];
    fillModifier.gradient.rotation = 90;
    lineSeries.segments.template.fillModifier = fillModifier;

    const circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color(chartColors.white);
    circleBullet.circle.stroke = am4core.color(chartColors.primary);
    circleBullet.circle.strokeWidth = 1;
    circleBullet.tooltipHTML = `<div style="font-family: Open Sans, sans-serif; padding-bottom: 5px; color: #212023; display: flex; flex-direction: column; align-items: center; background-color: ${chartColors.white}">
<div style="font-size: 36px; color: ${chartColors.primary}; padding-bottom: 5px">{valueY} кг</div>
<div style="font-size: 14px">{dateX}</div>
</div>`;

    const hoverState = circleBullet.states.create('hover');
    hoverState.properties.scale = 1.5;

    const labelBullet = lineSeries.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = '{value}';
    labelBullet.label.dy = -20;
  });

  return <div ref={amchartsElRef} />;
};
