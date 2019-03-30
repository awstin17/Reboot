import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ChartProvider } from '..//../providers/chart/chart';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent implements OnInit {

  @ViewChild('canvas') canvas;
  @Input() pageData: any; //All chart data lives on the chart provider file and is passed in with this variable.
  @Input() belongsTo: any; //Just used to display charts differently if they are on the history page 

  chart: any;

  constructor(public chartProvider: ChartProvider) { }

  /** This comment block is for everything contained in ngOnInit right below it
 *
 - Everything above the options property in the chart code relates to the chart data. Everything below that property modifies the display in some way.
 - Everything below the plugins property in options relates to the snazzy labels that surround the chart.

 In plugins.datalabels:

            anchor, align, and offset are all used to position the labels. the anchor value sets the anchor point from which you'll relate a label's position
            align defines what direction you'll position your labels relative to the anchor point
            offset defines how far away from the anchor point you will position the labels
            For more explanation: https://chartjs-plugin-datalabels.netlify.com/positioning.html

            Some properties have functions as their values. This makes the values dynamic, changing based on certain conditions.
            You'll notice that the functions take an argument called context. This object contains helpful information about the chart. Console log it if you're curious!

            The "rotation" property is what rotates the labels to match where they are around the graph
            The "BorderRadius property " controls how round the edges of the label containers are.
            The "Font" and "Offset" functions scale the font and positioning of labels respectively, according to the chart's width.
            */

  ngOnInit() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ["Career", "Finance", "Personal \n Growth", "Health", "Family", "Relationships", "Social life", "Attitude"],
        datasets: [
          {
            backgroundColor: ["rgba(0,0,255, .6)", "rgba(255,0,0, .6)", "rgba(128,0,128, .6)", "rgba(0,128,0, .6)", "rgba(255,165,0, .6)", "rgba(0,128,128, .6)", "rgba(255,0,255, .6)", "rgba(0,255,0, .6)"],
            borderColor: "black",
            data: this.pageData // This data changes depending on what page owns the component. 
          }
        ]
      },
      options: {

        layout: {
          padding: { //This padding changes depending on if chart is on history page or not
            top: this.belongsTo === 'historyPage' ? 5 : 55,
            bottom: this.belongsTo === 'historyPage' ? 5 : 55
          }
        },

        legend: {
          display: false
        },

        plugins: {
          datalabels: {
            textAlign: 'center',
            anchor: 'start',
            align: 'end',
            offset: function (context) {
              let chartWidth = context.chart.width;
              return chartWidth / 4.0 - 60;
            },
            backgroundColor: ["rgba(0,0,255, .2)", "rgba(255,0,0, .2)", "rgba(128,0,128, .2)", "rgba(0,128,0, .2)", "rgba(255,165,0, .2)", "rgba(0,128,128, .2)", "rgba(255,0,255, .2)", "rgba(0,255,0, .2)"],
            borderColor: 'black',
            rotation: function (context) {
              if (context.dataIndex === 0 || context.dataIndex === 1 || context.dataIndex === 6 || context.dataIndex === 7) { return 45 / 2 + (45 * context.dataIndex) }
              else { return 45 / 2 + (45 * context.dataIndex) + 180 }
            },
            borderRadius: 5,
            borderWidth: 0,
            color: 'black',
            font: function (context) {
              var width = context.chart.width;
              var size = Math.round(width / 60);
              return {
                size: size,
                weight: 600,
                font: 'Lato'
              };
            },
            /* The formatter function's return is what becomes the label for each section of the chart
            If the chart is on the history page, there are no labels. If not, the labels are the area name
             and its rating */
            formatter: this.belongsTo === 'historyPage' ? function () { return null }
              : function (value, context) {
                let areaName = context.chart.data.labels[context.dataIndex];
                let areaRating = context.chart.data.datasets[0].data[context.dataIndex];
                return (areaName + ' ' + areaRating);
              }
          }
        }
      }
    });

    //This code down below is to fix a bug where I could not modify the scale in the options
    //key in the above code (It threw a typescript error even though it worked)

    this.chart.config.options.scale.ticks.min = 0;
    this.chart.config.options.scale.ticks.max = 10;
    this.chart.update();
  }

}


