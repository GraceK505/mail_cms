import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-button',
  imports: [],
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.css'
})
export class GenericButtonComponent {
  @Input() callFunction!: () => void;
  @Input() textBtn!: string;
  @Input() classBtn!: string;
}
