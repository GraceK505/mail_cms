import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    effect,
    ElementRef,
    Input,
    Renderer2,
    signal,
    ViewChild
} from "@angular/core";
import { ConvertService } from "../../services/mjml-converter.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TemplateEditorService } from "../../services/template-editor.service";
import { selectData } from "../../store/tags.selectors";
import { SearchTagsType } from "../../models/template";
import { Observable } from "rxjs";

@Component({
    selector: "app-editor-main",
    template: `
    <div #templateElement class="templates_editor"></div>
  `,
    styles: `
    .templates_editor{
        display: block;
        width: 100%;
        height: 100vh;
    }
  `
})
export class EditorElementComponent implements AfterViewInit {
    @ViewChild("templateElement") templateElement!: ElementRef<HTMLDivElement>;
    editorElement!: HTMLDivElement;
    @Input() editorData!: any;
    @Input() optionsTemplate!: Observable<SearchTagsType[]>;
    editorContainer!: HTMLElement;
    tagIdFromRouter!: string;
    data$: any;
    currentTemplateID: string;
    templatesEditor: any;
    conversionTrigger = signal(false);

    constructor(
    private convertService: ConvertService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private editorService: TemplateEditorService,
  ) {
    this.convertService.loadMjmlFromdb()
    this.data$ = this.store.select(selectData)
    this.currentTemplateID = this.router.parseUrl(this.router.url).toString()

    effect(() => {
      if (this.conversionTrigger()) {
        this.executeConversion();

        // Optionally reset the signal to prevent re-triggering
        this.conversionTrigger.set(false);
      }
    });

    // Trigger the signal once
    this.conversionTrigger.set(true);

  }

  ngAfterViewInit(): void {
    console.log(this.templateElement.nativeElement)
    if (!this.templateElement?.nativeElement) return;
    this.executeConversion();

    this.editorElement = document.createElement('div');
    this.editorElement.classList.add('editor');

    this.renderer.appendChild(
      this.templateElement.nativeElement,
      this.editorElement
    );

    this.editorService.initializerTemplateEdit(
      this.templateElement.nativeElement
    );
  }

  async executeConversion() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        const tagId = params['id'].toLowerCase();
        this.optionsTemplate.subscribe((data) => {
          const filteredData = data.filter((template) =>
            template.id.toLowerCase().startsWith(tagId)
          );

          console.log(filteredData[0].component)
          this.convertService.convert(filteredData[0].component).subscribe({
            next: async (data) => {
              if (data.ok && data.body?.html) {
                const html = data.body?.html.replace(/\n\//g, '');
                const mjmlState = data.ok

                await this.editorService.updateComponentContent(html, mjmlState, tagId)
              }
            },
            error: (err) => {
              console.error('Conversion failed:', err);
            },
          });
        })
      } else {
        console.log("something went wrong!!")
      }
    });

  }

  ngOnDestroy(): void {
    if (this.editorElement?.parentNode) {
      this.editorElement.parentNode.removeChild(this.editorElement);
    }
  }
}