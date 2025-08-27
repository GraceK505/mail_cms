import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createStudioEditor } from '@grapesjs/studio-sdk';
import { MenuService } from '../store/menu.services';
import pluginExport from 'grapesjs-plugin-export';
import { Editor } from 'grapesjs';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from './modal.service';


@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private editor: any;
  private theme$: any = 'light';
  private editorSubject = new BehaviorSubject<Editor | null>(null);
  editor$ = this.editorSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: MenuService,
    private errorModal: ModalService
  ) { }

  themeChanging() {
    this.store.toggleTheme();
    this.store.getCurrentTheme().subscribe((newTheme) => {
      this.theme$ = newTheme;
    });
  }

  async myUploadAssetsLogic(files: any) {
    await this.waitAndFailRandomly('Testing when upload assets failed');
    const mockUploadedFiles = files.map((file: Blob | MediaSource) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    console.log(
      'Assets to upload to the self-hosted storage',
      mockUploadedFiles
    );
    return mockUploadedFiles;
  }

  async myDeleteAssetsLogic({ assets }: any) {
    await this.waitAndFailRandomly('Testing when delete assets failed');
    console.log(
      'Assets to delete from the self-hosted storage',
      assets.map((asset: { getSrc: () => any }) => asset.getSrc())
    );
  }

  async waitAndFailRandomly(str: any) {
    await new Promise((res) => setTimeout(res, 1000));
    if (Math.random() >= 0.7) throw new Error(str);
  }

  async initializeEditor(
    editorEl: HTMLElement,
    options?: any
  ): Promise<Editor | undefined> {
    if (
      isPlatformBrowser(this.platformId) &&
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    ) {
      try {
        this.editor = await createStudioEditor({
          theme: this.theme$,
          licenseKey: '',
          root: editorEl,
          ...options,
          plugins: [pluginExport,
            (editor: Editor) => {
              this.editorSubject.next(editor)
            }
          ],
        });
        console.log('Editor initialized successfully', this.editor);
        return this.editor;
      } catch (error) {
        // console.error('Error initializing editor:', error);
        this.errorHandler(error)
        return undefined;
      }
    }
    return undefined;
  }

  errorHandler(error: any){
    this.errorModal.erroModal(new Error(`Something broke ${error}`), 'Failed to load data');
  }

  destroyEditor(): void {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
      console.log('Editor instance destroyed');
    }
  }
}
