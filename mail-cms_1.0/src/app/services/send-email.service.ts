import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3001/api/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(data: { name: string; email: string[]; message: string }) {
    return this.http.post(this.apiUrl, data);
  }
}
