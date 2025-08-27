import { Component, Input } from '@angular/core';
import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { EditorView, basicSetup } from "codemirror"

@Component({
  selector: 'app-campaign',
  imports: [CampaignFormComponent],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css'
})
export class CampaignComponent {
  emailSubject: string = ""
  emailView!: HTMLElement | any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["id"]) {

        console.log(params["id"])
        const memoEmail = sessionStorage.getItem(`${params["id"]}_html`)
        this.emailView = memoEmail
      }
    })
  }
}


