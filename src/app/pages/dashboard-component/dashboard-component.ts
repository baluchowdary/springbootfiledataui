import { Component, computed, Inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service';
import { Interfacedashboard } from '../../model/interfacedashboard';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {
  onDeleteUser(arg0: number) {
    throw new Error('Method not implemented.');
  }

  fileData = signal<Interfacedashboard[]>([]);

  // 2. Pagination State (Signals are better here for reactivity)
  currentPage = signal(1);
  pageSize = signal(3);

  // 3. Automatically updates whenever allUsers or pageSize changes
  totalPages = computed(() => {
    const total = Math.ceil(this.fileData().length / this.pageSize());
    return total > 0 ? total : 1;
  });

  // 4. Automatically updates the list whenever data OR page changes
  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.fileData().slice(start, end);
  });
  // by: any;

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  constructor(private service: DashboardService) {
    //refresh data every 5 seconds - we have to use below time interval approch, when our reequirement is less records and latest live datata 
    setInterval(() => {
      this.getFileData();
    }, 5000);

   }


  ngOnInit(): void {
    debugger;
    this.getFileData();
  }


  getFileData() {
    debugger;
    this.service.loadFileData().subscribe((data: any) => {
      console.log('File data loaded:', data);
      this.fileData.set(data);
    });
  }


}
