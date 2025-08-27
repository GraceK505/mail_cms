import {
  AfterViewInit,
  Component,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateEditorService } from '../../services/template-editor.service';
import { ConvertService } from '../../services/mjml-converter.service';
import { Observable } from 'rxjs';
import { SearchTagsType } from '../../models/template';
import { selectData } from '../../store/tags.selectors';
import { Store } from '@ngrx/store';
import { SuspenseComponentCustom } from '../suspense/suspense.component';
import { EditorElementComponent } from '../editorElement/editorElement.component';

@Component({
  selector: 'app-template-editing',
  imports: [SuspenseComponentCustom, EditorElementComponent],
  templateUrl: './template-editing.component.html',
  styleUrls: ['./template-editing.component.css'],
})
export class TemplateEditingComponent implements AfterViewInit {
  data$!: Observable<SearchTagsType[]>;
  currentTemplateID: string = ""

  constructor(
    private convertService: ConvertService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private editorService: TemplateEditorService
  ) {
    this.convertService.loadMjmlFromdb()
    this.data$ = this.store.select(selectData)
    this.currentTemplateID = this.router.parseUrl(this.router.url).toString()
  }

  ngAfterViewInit(): void { }

  navigateTo(viewId: string) {
    if (!viewId) return;
    this.router.navigate(['/campaign'], { queryParams: { id: viewId } })
  }
}
