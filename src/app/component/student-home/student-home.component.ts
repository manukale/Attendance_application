import { Component } from '@angular/core';
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";
//chart imports
import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import * as Highcharts from "highcharts";
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { LoginService } from '../../services/login.service';
import { SessionStorageService } from '../../services/session-storage.service';
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-student-home',
  standalone:true,
  imports: [NavbarStudentComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {
  attendanceMarkCount: number = 80;
  attendancePendingCount: number = 20;
  currentUser : any

  chartInstance!: Highcharts.Chart;

  constructor(private router: Router, private userService: UserDataService, 
                  private loginService: LoginService,private route: ActivatedRoute,
                  private session : SessionStorageService) {}

  ngOnInit(){
      
    this.currentUser=this.session.getUserData('user')
   
    this.userService.fetchUserData('user/getUser').subscribe((res) => {
      // this.attendanceMarkCount = 0;
      
      for (let i = 0; i < res.length; i++) {
        
        if(res[i].role === 'Student' && this.currentUser.dept === res[i].dept ){
          // this.attendancePendingCount++
        }
      }

      this.updateChartData();
      
      // console.log('student:', this.attendanceHistoryCount); 
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
                { name: " Attendance Mark", y: this.attendanceMarkCount ,color:'#FF6384'},
                { name: " Attendance Pending", y: this.attendancePendingCount ,color:'#36A2EB'},
              ],
            },
          ],
        });
      }

      updateChartData() {
        if (this.chartInstance) {
          this.chartInstance.series[0].setData([
            { name: " Attendance Mark", y: this.attendanceMarkCount,color:'#FF6384' },
            { name: " Attendance Pending", y: this.attendancePendingCount,color:'#36A2EB' },
          ]);
        }
      }
}
