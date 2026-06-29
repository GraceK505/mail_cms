import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { indentOnInput } from '@codemirror/language';
import { indentMore, indentLess } from '@codemirror/commands';
import { EmailService } from '../../services/send-email.service';
import { Router } from '@angular/router';
import { AsyncPipe, isPlatformBrowser, NgIf } from "@angular/common";
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-campaign-form',
  imports: [NgIf, AsyncPipe],
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css'],
  animations: [
    trigger('end_animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.1)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.1)' })),
      ]),
    ]),
    trigger('heading', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})

export class CampaignFormComponent {
  currentText: string = '';
  emailRegex = /[\w.-]+@[\w.-]+\.\w+/
  readyState: any = false;
  @Input() emailTemplate!: any;
  @ViewChild("submitButton", { static: true }) submitButton!: ElementRef<HTMLDivElement>;
  @ViewChild('subject', { static: true }) subject!: ElementRef<HTMLInputElement>;
  @ViewChild('adminName', { static: true }) adminName!: ElementRef<HTMLInputElement>;
  @ViewChild('editable', { static: true }) editable!: ElementRef<HTMLDivElement>;
  @ViewChild('parentElmnt', { static: true }) parentElmnt!: ElementRef<HTMLDivElement>;
  @ViewChild('iframeElement', { static: true }) iframeElement!: ElementRef<HTMLIFrameElement>;

  emailView!: any;

  constructor(public emailService: EmailService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  async ngAfterViewInit() {
    const isBrowser = isPlatformBrowser(this.platformId)
    
    if (!isBrowser) return

    let doc = this.iframeElement.nativeElement.contentDocument || this.iframeElement.nativeElement.contentWindow?.document;
    doc?.open();
    doc?.write(this.emailTemplate);
    doc?.close();

    const keyBindings = keymap.of([
      { key: 'Tab', run: indentMore },
      { key: 'Shift-Tab', run: indentLess }
    ]);

    this.emailView = new EditorView({
      state: EditorState.create({
        doc: this.emailTemplate,
        extensions: [
          basicSetup,
          html(),
          indentOnInput(),
          EditorView.lineWrapping,
          keyBindings
        ]
      }),
      parent: this.parentElmnt.nativeElement
    });


    this.submitButton.nativeElement.innerText = "submit your campaign"
  }



  handleInput(event: Event): void {
    const div = event.target as HTMLDivElement;
    this.currentText = div.innerText.trim();
  }

  @HostListener('document:keydown.enter', ['$event'])
  @HostListener('document:keydown.space', ['$event'])
  onKeyTrigger(event: KeyboardEvent): void {
    const editableEl = this.editable.nativeElement;
    const lastNode = editableEl.lastChild;

    // Extract raw text from last node
    const rawText = lastNode?.textContent?.trim() || '';

    if (!rawText || !this.emailRegex.test(rawText)) return;

    event.preventDefault(); // Prevent default space/enter behavior

    this.createBubble(rawText);

    this.currentText = '';
    editableEl.textContent = ''
  }

  createBubble(email: string): void {
    const bubble = document.createElement('span');
    bubble.className = 'bubble';
    bubble.innerHTML = `
    ${email}
    <span class="closebtn" style="
      right: 2px;
      top: 2px;
      cursor: pointer;
    ">×</span>
  `;

    bubble.style.cssText = `
    background-color: #f7debe;
    border: 1px solid #999;
    border-radius: 12px;
    padding: 2px 14px;
    margin: 2px;
    display: inline-block;
    color: #999;
    position: relative;
  `;

    this.attachBubbleCloseHandler(bubble);

    const space = document.createTextNode(' ');
    this.editable.nativeElement.insertAdjacentElement('afterend', bubble);
    this.editable.nativeElement.appendChild(space);
  }

  attachBubbleCloseHandler(bubble: HTMLElement) {
    const closebtn = bubble.querySelector('.closebtn');
    if (closebtn) {
      closebtn.addEventListener("click", () => {
        bubble.remove();
      });
    }
  }

  async submit(event: Event) {
    event.preventDefault();

    const name = this.adminName.nativeElement.value;
    const subject = this.subject.nativeElement.value;

    const parent = this.editable.nativeElement.parentElement;
    const spans: HTMLElement[] = parent
      ? Array.from(parent.querySelectorAll("span")) as HTMLElement[]
      : [];

    const recipient = spans
      .map(span => span.textContent?.trim())
      .filter((email): email is string => !!email)
      .join(",")
      .replace(/;/g, ",");

    const payload = {
      name,
      recipient: [recipient],
      subject,
      html: this.emailTemplate
    };

    await this.emailService.sendEmail(payload as any);

    this.submitButton.nativeElement.textContent !== null && this.submitButton.nativeElement.textContent.replace("submit your campaign", "clicked !")
    this.emailService.loading.subscribe(result => {
      console.log(result)
    })
  }

  headingAnimation(){
    this.readyState = true
  }
}
