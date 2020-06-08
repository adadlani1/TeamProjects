import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialistReferralService {
  specialistsDataResource = "http://miahelpdesk.tk/php/get-specialists-data.php"
  constructor(public http: HttpClient) { }

  getSpecialistsData() {
    return this.http.get(this.specialistsDataResource);
  }
}
