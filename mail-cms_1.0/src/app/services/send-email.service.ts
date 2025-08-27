import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:3000/api/send-email';
  header: any;
  loading = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Mailer': 'NodeMailer',
      'Precedence': 'bulk'
    });
  }

  sendEmail(data: { name: string; recipient: string[]; subject: string, html: any }) {
    this.http.post(this.apiUrl, data, this.header).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        throw new Error(`Error occured ${err}`)
      },
      complete: () => {
        console.log("post executed");
        this.loading.next(false)
      },
    });

    return;
  }
}
