import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";
import { LoginService } from '../../services/login.service';
import { SessionStorageService } from '../../services/session-storage.service';
//chart imports
import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import * as Highcharts from "highcharts";
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [HttpClientModule, NavbarTeacherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  studentCount: number = 0;
  attendanceCount: number = 0;
  currentUser : any
 
  chartInstance!: Highcharts.Chart;

    constructor(private router: Router, private userService: UserDataService, 
                private loginService: LoginService,private route: ActivatedRoute,
                private session : SessionStorageService) {}

    ngOnInit(){
      
      this.currentUser=this.session.getUserData('user')
     
      this.userService.fetchUserData('user/getUser').subscribe((res) => {
        this.studentCount = 0;
        
        for (let i = 0; i < res.length; i++) {
          
          if(res[i].role === 'Student' && this.currentUser.dept === res[i].dept ){
            this.studentCount++
          }
        }
  
        this.updateChartData();
        
        console.log('student:', this.studentCount); 
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
              { name: "Total Attendance", y: 40 ,color:'#36A2EB'},
            ],
          },
        ],
      });
    }
  
    updateChartData() {
      if (this.chartInstance) {
        this.chartInstance.series[0].setData([
          { name: "Total Students", y: this.studentCount, color: '#FF6384'  },
          { name: "Total Attendance", y: 40,color:'#36A2EB' },
        ]);
      }
    }
  
    

    signOut() {
      this.loginService.userLogOut()
      this.router.navigate(['/'],{})    
    }
  
}
