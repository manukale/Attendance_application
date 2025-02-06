import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts'; // Import NgChartsModule
import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular features
import { ArcElement, BarElement, Chart, Legend, LinearScale, PieController, Tooltip } from 'chart.js';
import { CategoryScale } from 'chart.js';
import { UserDataService } from '../../services/user-data.service';

Chart.register(CategoryScale,PieController,BarElement,LinearScale,Tooltip,Legend,ArcElement);

@Component({
  selector: 'app-admin-home',
  standalone:true,
  imports: [NavbarAdminComponent,CommonModule,BaseChartDirective],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  isBrowser: boolean;

  studentCount: number = 0;
  teacherCount: number = 0;
  adminCount: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private userService: UserDataService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  pieChartData = { 
    labels: ['Student', 'Teacher', 'Admin'], 
    datasets: [{ 
      data: [0, 0, 0], // Initial empty data
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
    }]
  };

  pieChartOptions = { 
    responsive: true, 
    plugins: { 
      legend: { position: 'bottom' as const }, 
      tooltip: { enabled: true }
    }
  };


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

  updateChartData() {
    this.pieChartData = { 
      labels: ['Student', 'Teacher', 'Admin'], 
      datasets: [{ 
        data: [this.studentCount, this.teacherCount, this.adminCount], // Update data dynamically
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
      }]
    };
  }
}
