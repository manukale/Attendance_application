import { Component , Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts'; // Import NgChartsModule
import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular features
import { ArcElement, BarElement, Chart, ChartConfiguration, ChartType, Legend, LinearScale, PieController, Tooltip } from 'chart.js';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale,PieController,BarElement,LinearScale,Tooltip,Legend,ArcElement);

@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  pieChartData = { 
    labels: ['Red', 'Blue', 'Yellow'], 
    datasets: [ 
    { 
    data: [300, 500, 100], 
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
    }, 
  ],
  
    }; 
    pieChartOptions = { 
    responsive: true, 
    plugins: { 
    legend: { 
    position: 'top' as const, 
    }, 
    tooltip: { 
    enabled: true, 
    }
  }
}

}
