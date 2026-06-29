import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EditorJSService implements OnInit {

  editor: any = null
  constructor(@Inject(PLATFORM_ID) private plateformId: Object) { }

  ngOnInit(): void {

  }

  async initEditor(holderId: string, initialData?: any) {
    if (!isPlatformBrowser(this.plateformId)) return;

    const { default: EditorJS } = await import('@editorjs/editorjs');
    const Header = (await import('@editorjs/header')).default;
    const List = (await import('@editorjs/list')).default;
    const ImageTool = (await import('@editorjs/image')).default;
    this.editor = new EditorJS({
      holder: holderId,
      data: initialData || { blocks: [] },
      tools: {
        header: {
          class: Header,
          config: {
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        // image: {
        //   class: ImageTool,
        //   config: {
        //     // For upload, you can define your own uploader
        //     uploader: {
        //       async uploadByFile(file: File) {
        //         // Upload to your server or cloud storage
        //         // Return { success: 1, file: { url: '...' } }
        //         const formData = new FormData();
        //         formData.append('image', file);
        //         const response = await fetch('/api/upload', { method: 'POST', body: formData });
        //         const data = await response.json();
        //         return { success: 1, file: { url: data.url } };
        //       },
        //     },
        //   },
        // },
        // Add more tools as needed
      },
      onChange: () => {
        // Optional: auto‑save on every change
        this.autoSave();
      },
    });
  }

  /**
   * Saves the current editor content and stores it in sessionStorage.
   */
  async saveEditorContent(): Promise<void> {
    if (!this.editor) return;
    const savedData = await this.editor.save();
    sessionStorage.setItem('editorContent', JSON.stringify(savedData));
    console.log('Editor content saved', savedData);
  }

  /**
   * Loads content from sessionStorage and renders it into the editor.
   */
  async loadEditorContent(): Promise<void> {
    if (!this.editor) return;
    const raw = sessionStorage.getItem('editorContent');
    if (raw) {
      const data = JSON.parse(raw);
      await this.editor.render(data);
    }
  }

  /**
   * Clears the editor content.
   */
  clearEditor(): void {
    if (this.editor) {
      this.editor.clear();
    }
  }

  /**
   * Destroys the editor instance to free resources.
   */
  destroyEditor(): void {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }

  /**
   * Optional: retrieve the raw block data (e.g., for preview).
   */
  async getBlocks(): Promise<any> {
    if (!this.editor) return null;
    return await this.editor.save();
  }

  private autoSave(): void {
    // Debounce this if you like
    this.saveEditorContent();
  }
}
