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
import { firstValueFrom, Observable } from "rxjs";
// import { templates } from "../data/data";
import { EditorService } from "../../services/editor.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { ConvertService } from "../../services/mjml-converter.service";
import { selectData } from "../../store/tags.selectors";
import { SearchTagsType } from "../../models/template";
import pluginExport from "grapesjs-plugin-export";
import { Editor } from "grapesjs";

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
  theme$: any = "light";
  editorService = inject(EditorService);
  data$!: Observable<SearchTagsType[]>
  currentUrl = ""

  constructor(
    private convertService: ConvertService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
    this.convertService.loadMjmlFromdb()
    this.data$ = this.store.select(selectData)

    this.currentUrl = this.router.url
  }

  options: any = {
    themes: this.theme$,
    project: {
      type: "email",
      default: {
        pages: [{
          name: "welcome page",
          component: `
            <mjml>
              <mj-head>
                <mj-style inline="inline">
                  .highlight {
                    color: #d35400;
                    font-weight: bold;
                  }
                </mj-style>
              </mj-head>
              <mj-body background-color="#fff3e0">
                <mj-section padding="40px 0" border="0">
                  <mj-column width="100%">
                    <mj-wrapper
                      background-color="#f7debe"
                      border="1px solid #ccc"
                      border-radius="15px"
                      padding="30px"
                    >
                      <mj-text
                        align="center"
                        font-size="24px"
                        color="#333333"
                        font-family="Segoe UI, sans-serif"
                        padding-bottom="10px"
                      >
                        Welcome to <span class="highlight" style="color: #d35400;font-weight: bold;">Mail CMS Editor 2025</span>
                      </mj-text>

                      <mj-text
                        align="center"
                        font-size="16px"
                        color="#555555"
                        font-family="Segoe UI, sans-serif"
                        line-height="1.5"
                      >
                        We're thrilled to have you here. Start crafting beautiful emails with ease.
                      </mj-text>

                      <mj-text
                        align="center"
                        font-size="16px"
                        color="#555555"
                        font-family="Segoe UI, sans-serif"
                        line-height="1.5"
                        padding-top="10px"
                      >
                        <em>Happy editing!</em>
                      </mj-text>
                    </mj-wrapper>
                  </mj-column>
                </mj-section>
              </mj-body>
            </mjml>
          `
        }]
      }
    },
  };

  async ngOnInit() {
    this.editorElement = document.createElement("div");
    this.editorElement.classList.add("editor");

    this.renderer.appendChild(this.editorEl.nativeElement, this.editorElement);

    await this.editorService.initializeEditor(
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
