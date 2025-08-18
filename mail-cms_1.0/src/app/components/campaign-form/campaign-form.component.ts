import { Component, ElementRef, HostListener, Input, NgModule, ViewChild } from '@angular/core';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { html } from '@codemirror/lang-html';
import { indentOnInput } from '@codemirror/language';
import { indentMore, indentLess } from '@codemirror/commands';
import { FormsModule } from '@angular/forms';
interface FormaData{
  name: any,
  email: any[]
  message: any
};
@Component({
  selector: 'app-campaign-form',
  imports: [],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.css'
})

export class CampaignFormComponent {
  currentText: string = '';
  emailRegex = /[\w.-]+@[\w.-]+\.\w+/
  @Input() emailTemplate!: any;
  
  @ViewChild('subject', {static: true}) subject!: ElementRef<HTMLInputElement>;
  @ViewChild('adminName', {static: true}) adminName!: ElementRef<HTMLInputElement>;
  @ViewChild('editable', { static: true }) editable!: ElementRef<HTMLDivElement>;
  @ViewChild('parentElmnt', { static: true }) parentElmnt!: ElementRef<HTMLDivElement>;
  @ViewChild('iframeElement', { static: false }) iframeElement!: ElementRef<HTMLIFrameElement>;

  emailView!: any;
formData!: FormaData 
  constructor(){}
  async ngAfterViewInit() {
    console.log(this.emailTemplate)
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

    this.iframeElement.nativeElement.contentDocument?.write(this.emailTemplate)
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

    bubble.textContent = email;

    const space = document.createTextNode(' ');

    this.editable.nativeElement.insertAdjacentElement('afterend', bubble);
    this.editable.nativeElement.appendChild(space);
  }
}
