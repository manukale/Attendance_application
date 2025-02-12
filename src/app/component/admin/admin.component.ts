import { Component , Inject, PLATFORM_ID} from '@angular/core';
import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import * as Highcharts from "highcharts";
Chart.register(PieController, ArcElement, Tooltip, Legend);
// import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    Highcharts.chart("chartContainer", <Highcharts.Options>{
      chart: { type: "pie" },
      title: { text: "Sales Distribution" },
      tooltip: { pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>" },
      accessibility: { point: { valueSuffix: "%" } },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Sales",
          type: "pie",
          data: [
            { name: "Product A", y: 40 },
            { name: "Product B", y: 30 },
            { name: "Product C", y: 20 },
            { name: "Product D", y: 10 },
          ],
        },
      ],
    });
  }
}




                //  pieChartData = { 
                //   labels: ['Student', 'Teacher', 'Admin'], 
                //   datasets: [{ 
                //     data: [0, 0, 0], // Initial empty data
                //     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                //     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
                //   }]
                // };
              
                // pieChartOptions = { 
                //   responsive: true, 
                //   plugins: { 
                //     legend: { position: 'bottom' as const }, 
                //     tooltip: { enabled: true }
                //   }
                // };
  

  // import { isPlatformBrowser } from '@angular/common';
  // import { BaseChartDirective } from 'ng2-charts'; // Import NgChartsModule
  // import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular features
  // import { ArcElement, BarElement, Chart, ChartConfiguration, ChartType, Legend, LinearScale, PieController, Tooltip } from 'chart.js';
  // import { CategoryScale } from 'chart.js';
  
  // Chart.register(CategoryScale,PieController,BarElement,LinearScale,Tooltip,Legend,ArcElement);
  
//   isBrowser: boolean;

//   constructor(@Inject(PLATFORM_ID) private platformId: object) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   pieChartData = { 
//     labels: ['Red', 'Blue', 'Yellow'], 
//     datasets: [ 
//     { 
//     data: [300, 500, 100], 
//     backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
//     hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
//     }, 
//   ],
  
//     }; 
//     pieChartOptions = { 
//     responsive: true, 
//     plugins: { 
//     legend: { 
//     position: 'top' as const, 
//     }, 
//     tooltip: { 
//     enabled: true, 
//     }
//   }
// }


