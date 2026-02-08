import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DASHBOARD_CONSTANTS } from '../../constants/Dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  //http = inject(HttpClient);

  constructor(private http: HttpClient) { }


  loadFileData() {
    debugger;
    return this.http.get(DASHBOARD_CONSTANTS.API_URL + DASHBOARD_CONSTANTS.LOAD_FILE_DATA);
  } 

  uploadFile(formData: FormData) {
    debugger;
    return this.http.post(DASHBOARD_CONSTANTS.API_URL + DASHBOARD_CONSTANTS.UPLOAD_FILE, formData, {
      responseType: 'text' // Adjust response type if needed
    });
  }
  
}
