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
  //onDeleteUser(arg0: number) { }

  fileData = signal<Interfacedashboard[]>([]);

  selectedFile: File | null = null;
  products: any[] = []; // This should hold your table data

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

  // Capture the file from the input change event
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  // Handle the upload button click
  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.service.uploadFile(formData).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          alert('File uploaded successfully!');
          this.getFileData(); // Refresh the table after upload
          this.selectedFile = null; // Reset input
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert('Failed to upload file.');
        }
      });
    }
  }

}
