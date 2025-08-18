import "zone.js";
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import "@grapesjs/studio-sdk/dist/style.css";
import { Observable } from "rxjs";
import { templates } from "../data/data";
import { EditorService } from "../../services/editor.service";

@Component({
  selector: "app-editor",
  imports: [],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.css",
})
export class EditorComponent implements OnInit {
  @ViewChild("editorEl", { static: true }) editorEl!: ElementRef;
  editor: any;
  private editorElement!: HTMLElement;
  editorInstance$: Observable<any> | undefined;
  templatesList!: any;
  theme$: any = "light";
  editorService = inject(EditorService);
  convertedMjml$!: Observable<any[]>;
  mjmlTemplates!: Observable<any>;
  start: number = 0;

  constructor(
    private renderer: Renderer2
  ) {

  }

  options: any = {
    themes: this.theme$,
    project: {
      type: "email",
      default: {
        pages: [
          {
            name: "Home",
            component:
              "<mjml><mj-body><mj-section><mj-column><mj-text>My email default</mj-text></mj-column></mj-section></mj-body></mjml>",
          },
        ],
      },
    },
  };

  ngOnInit(): void {
    this.editorElement = document.createElement("div");
    this.editorElement.classList.add("editor");

    this.renderer.appendChild(this.editorEl.nativeElement, this.editorElement);

    this.editorService.initializeEditor(
      this.editorEl.nativeElement,
      this.options
    );
  }

  ngOnDestroy(): void {
    if (this.editorElement?.parentNode) {
      this.editorElement.parentNode.removeChild(this.editorElement);
    }
  }
}
