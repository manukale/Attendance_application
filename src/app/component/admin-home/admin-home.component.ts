import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular features
import { UserDataService } from '../../services/user-data.service';
//chart imports
import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import * as Highcharts from "highcharts";
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-admin-home',
  standalone:true,
  imports: [NavbarAdminComponent,CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  
  studentCount: number = 0;
  teacherCount: number = 0;
  adminCount: number = 0;
 chartInstance!: Highcharts.Chart;
  constructor(private userService: UserDataService) {
    
  }

  ngOnInit() {
    this.userService.fetchUserData('user/getUser').subscribe((res) => {
      // Reset counts before processing
      this.studentCount = 0;
      this.teacherCount = 0;
      this.adminCount = 0;

      // Count user roles
      for (let i = 0; i < res.length; i++) {
        
        if(res[i].role === 'Student'){
          this.studentCount++
        }
        if(res[i].role === 'Teacher'){
          this.teacherCount++
        }
        if(res[i].role === 'Admin'){
          this.adminCount++
        }
        
      }

      // ✅ Update chart data dynamically after getting API response
      this.updateChartData();
      
      console.log('student:', this.studentCount); // Now correctly logs the updated count
    });
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
        this.chartInstance = Highcharts.chart("chartContainer", <Highcharts.Options>{
          chart: { type: "pie" ,marginTop: 50},
          title: { text: "" },
          credits: { enabled: false },
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
              name: "Count",
              type: "pie",
              data: [
                { name: "Total Students", y: this.studentCount, color: '#FF6384'  },
                { name: "Total Teacher", y: this.teacherCount  ,color:'#36A2EB'},
                { name: "Total Admin", y: this.adminCount  ,color:'#FFCE56'},
              ],
            },
          ],
        });
      }

  updateChartData() {
    if (this.chartInstance) {
      this.chartInstance.series[0].setData([
        { name: "Total Students", y: this.studentCount, color: '#FF6384'  },
        { name: "Total Teacher", y: this.teacherCount  ,color:'#36A2EB'},
        { name: "Total Admin", y: this.adminCount  ,color:'#FFCE56'},
      ]);
    }
  }
 
}
