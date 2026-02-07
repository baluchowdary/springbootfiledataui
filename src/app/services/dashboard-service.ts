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
  
}
