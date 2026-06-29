import { Injectable, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import createStudioEditor, { ProjectData } from '@grapesjs/studio-sdk';
import 'grapesjs/dist/css/grapes.min.css';
import { Editor } from 'grapesjs';
import { Router } from '@angular/router';
import { templates } from '../components/data/data';
import { Store } from '@ngrx/store';
import { selectData } from '../store/tags.selectors';
import { catchError, firstValueFrom, forkJoin, map, Observable, of } from 'rxjs';
import { SearchTagsType } from '../models/template';
import { ConvertService } from './mjml-converter.service';
import { ModalService } from './modal.service';


type TemplateDataType = {
  id: number,
  name: string,
  data: {
    pages: [
      {
        name: string,
        component: string
      }
    ]
  }

}

interface Template {
  templateList: TemplateDataType | null
}

@Injectable({
  providedIn: 'root',
})
export class TemplateEditorService implements OnInit {
  private studio: any;
  private projectData: any;
  private pages: any;
  private templatesData$!: Observable<SearchTagsType[]>;
  templates: TemplateDataType[] = [];

  constructor(private errorModal: ModalService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private store: Store, private converterService: ConvertService) {
    this.templatesData$ = this.store.select(selectData)
  }

  async updateComponentContent(mjmlJson: string, mjmlState: boolean, projectId: string) {
    this.projectData = mjmlState && {
      pages: [
        {
          name: projectId,
          component: mjmlJson,
        },
      ],
    }
  }

  async ngOnInit() {

  }


  navigateContext() {
    this.navigateTo(this.projectData.pages.at(0)?.name)
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

  async initializerTemplateEdit(
    editorEl: HTMLElement,
  ): Promise<void> {
    console.log(this.projectData)
    if (
      isPlatformBrowser(this.platformId) &&
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    ) {
      try {
        this.studio = await createStudioEditor({
          licenseKey: '5d0d2a959abd492cbdccc8f94a476f79e00fef90ea7940fe838d3ea5221926d6',
          root: editorEl,
          assets: {
            storageType: "self",
            onUpload: async ({ files, editor }: any) => {
              const results = await this.myUploadAssetsLogic(files);
              return results.map(({ file, url }: any) => ({
                id: url,
                src: url,
                name: file.name,
                mimeType: file.type,
                size: file.size,
              }));
            },
            onDelete: async ({ assets, editor }: any) => {
              await this.myDeleteAssetsLogic({ assets });
            },
            onLoad: async (): Promise<any> => {
              return Array(10)
                .fill(0)
                .map((_, i) => ({
                  id: i,
                  name: "Image from storage " + i,
                  type: "image",
                  src: `https://picsum.photos/seed/from-storage-${i}/300/300`,
                }));
            },
          },
          plugins: [
            editor => {
              if (!editor) return;
              editor.on('storage:store', () => {
                console.log('🔍 editor.store() was called');
              });

              editor.on("load", async () => {
                const pageData = await this.projectData;
                try {
                  if (editor && this.projectData) {
                    editor.loadProjectData(pageData);
                  } else {
                    throw new Error(`Project data is incomplete or editor not ready`)
                  }
                } catch (err) {
                  throw new Error(`Error loading project:",${err}`)
                }
              })
            }
          ],
          storage: {
            type: "self",
            autosaveChanges: 100,
            onSave: async ({ project, editor }): Promise<any> => {
              console.log("onSave triggered");

              const projectData = editor ? await editor.getProjectData() : null;

              const pageName = this.projectData.pages.at(0)?.name || "defaultProject";

              try {
                const html = editor.getHtml();
                const css = editor.getCss();
                const fullHtml = await this.injectStyleIntoHead(html, css);

                sessionStorage.setItem(`${pageName}_project`, JSON.stringify(project));
                sessionStorage.setItem(`${pageName}_html`, fullHtml);

                console.log("Project saved to sessionStorage:", project);
              } catch (e) {
                throw new Error(`Failed to save to sessionStorage: ${e}`)
              }

              return;
            },
            project: {
              type: "email",
              pages: [{
                name: "welcome page",
                component: `
                  <style>
                    .main_container {
                      max-width: 500px;
                      margin: 40px auto;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      height: 300px;
                      border-radius: 15px;
                      padding: 30px;
                      background: linear-gradient(135deg, #f7debe, #fff3e0);
                      border: 1px solid #ccc;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                      font-family: 'Segoe UI', sans-serif;
                      text-align: center;
                    }

                    .main_container h1 {
                      font-size: 24px;
                      color: #333;
                      margin-bottom: 10px;
                    }

                    .main_container p {
                      font-size: 16px;
                      color: #555;
                    }

                    .highlight {
                      color: #d35400;
                      font-weight: bold;
                    }
                  </style>

                  <div class="main_container">
                    <h1>Welcome to <span class="highlight">Mail CMS Editor 2025</span></h1>
                    <p>We're thrilled to have you here. Start crafting beautiful emails with ease.</p>
                    <p><em>Happy editing!</em></p>
                  </div>
                `
              }]
            }
          },
          layout: {
            default: {
              type: "row",
              height: "100%",
              children: [
                {
                  type: "canvasSidebarTop",
                  sidebarTop: {
                    leftContainer: {
                      buttons: ({ items }: any) => [
                        ...items,
                        {
                          id: "openTemplatesButtonId",
                          size: "s",
                          icon: '<svg viewBox="0 0 24 24"><path d="M20 14H6C3.8 14 2 15.8 2 18S3.8 22 6 22H20C21.1 22 22 21.1 22 20V16C22 14.9 21.1 14 20 14M6 20C4.9 20 4 19.1 4 18S4.9 16 6 16 8 16.9 8 18 7.1 20 6 20M6.3 12L13 5.3C13.8 4.5 15 4.5 15.8 5.3L18.6 8.1C19.4 8.9 19.4 10.1 18.6 10.9L17.7 12H6.3M2 13.5V4C2 2.9 2.9 2 4 2H8C9.1 2 10 2.9 10 4V5.5L2 13.5Z" /></svg>',
                          onClick: ({ editor }: any) => {
                            editor.runCommand("studio:layoutToggle", {
                              id: "editor-panel",
                              header: true,
                              placer: {
                                type: "dialog",
                                title: "Choose a template for your project",
                                size: "l",
                              },
                              layout: {
                                type: "panelTemplates",
                                content: { itemsPerRow: 3 },
                                onSelect: ({ loadTemplate, template }: any) => {
                                  loadTemplate(template);
                                  editor.runCommand("studio:layoutRemove", {
                                    id: "editor-panel",
                                  });
                                },
                              },
                            });
                          },
                        },
                        {
                          id: "openAssetsButtonId",
                          size: "l",
                          icon: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM10 10l2.03 2.71L15 11l4 5H5l5-6z"/></svg>',
                          onClick: ({ editor }: any) => {
                            editor.runCommand("studio:layoutToggle", {
                              id: "studio-assets-panel",
                              header: true,
                              placer: {
                                type: "dialog",
                                title: "Select or Upload an Asset",
                                size: "l",
                              },
                              layout: {
                                type: "panelAssets",
                                content: {
                                  itemsPerRow: 3,
                                  categories: true,
                                },
                                onSelect: ({ asset, editor }: any) => {
                                  const root = editor.getWrapper();
                                  let imgCmp = root.findFirstType("image");
                                  if (!imgCmp)
                                    imgCmp = root.append(
                                      { type: "image" },
                                      { at: 0 }
                                    )[0];
                                  imgCmp.set({ src: asset.getSrc() });

                                  editor.runCommand("studio:layoutRemove", {
                                    id: "studio-assets-panel",
                                  });
                                },
                              },
                            });
                          },
                        },
                      ],
                    },
                  },
                },
                { type: "sidebarRight" },
              ],
            },
          },
          templates: {
            onLoad: async (): Promise<any> => {
              const rawData = await firstValueFrom(this.templatesData$);

              if (!Array.isArray(rawData)) {
                return [];
              }

              const conversionObservables = rawData.map((item: any) =>
                this.converterService.convert(item.component).pipe(
                  map((convertedData: any) => ({
                    id: item.id,
                    name: item.name,
                    data: {
                      pages: [
                        {
                          name: item.name,
                          component: convertedData?.body?.html ?? ''
                        }
                      ]
                    }
                  })),
                  catchError(error => {

                    return of({
                      id: item.id,
                      name: item.name,
                      data: {
                        pages: [
                          {
                            name: item.name,
                            component: '' // fallback
                          }
                        ]
                      }
                    });
                  })
                )
              );

              const mappedTemplates = await firstValueFrom(forkJoin(conversionObservables));
              return mappedTemplates;
            }

          }
        });
      } catch (error) {
        console.error('Error initializing editor:', error);

        this.errorHandler(error)
      }
    }
  }
  errorHandler(error: any) {
    this.errorModal.erroModal(new Error(`Something broke ${error}`), 'Error: Failed to load data');
  }
  injectStyleIntoHead(html: any, css: any) {
    const styleTag = `<style>${css}</style>`;
    const headCloseTag = '</head>';

    if (html.includes(headCloseTag)) {
      return html.replace(headCloseTag, `${styleTag}${headCloseTag}`);
    } else {
      // Fallback: inject before <body> if <head> is missing
      return html.replace('<body>', `<head>${styleTag}</head><body>`);
    }
  }

  navigateTo(viewId?: string) {
    if (!viewId) return;
    this.router.navigate(['/campaign'], { queryParams: { id: viewId } })
  }

  async saveToSessionStorage(key: string, data: ProjectData | null) {
    if (!key || !data) {
      console.warn("Missing key or data for sessionStorage");
      return;
    }

    try {
      const serialized = JSON.stringify(data);
      sessionStorage.setItem(key, serialized);
    } catch (e) {
      console.error("Error saving to sessionStorage:", e);
    }
  }

  async loadFromSessionStorage(projectId: string) {
    const projectString = sessionStorage.getItem(projectId);
    return projectString ? JSON.parse(projectString) : null;
  }

  async publishWebsite(editor: Editor, id: string) {
    const files = await editor.runCommand('studio:projectFiles', { styles: 'inline' })
    // For simplicity, we'll "publish" only the first page.
    const firstPage = files.find((file: { mimeType: string; }) => file.mimeType === 'text/html');
    const websiteData = {
      lastPublished: new Date().toLocaleString(),
      html: firstPage.content,
    };
    sessionStorage.setItem(id, JSON.stringify(websiteData));
  }

  viewPublishedWebsite(editor: Editor, id: string) {
    const websiteDataString = sessionStorage.getItem(id);
    const websiteData = websiteDataString ? JSON.parse(websiteDataString) : null;
    //   const emptyStateText = 'Website not yet published! ' + (env === 'PROD' ? 'Click on the "rocket" icon to publish on PROD!' : 'Save a project to see it in STAGE');

    editor?.runCommand('studio:layoutToggle', {
      id: 'viewPublishedWebsite',
      header: false,
      placer: { type: 'dialog', size: 'l', title: id },
      layout: {
        type: 'column',
        style: { minHeight: 600 },
        children: websiteData && [
          'Last time published: ' + websiteData.lastPublished,
          {
            type: 'row',
            as: 'iframe',
            srcDoc: websiteData.html,
            style: { backgroundColor: 'white', height: 600 },
          }
        ]
      },
    });
  }

  getEditorInstance(): any {
    const editor = this.studio.getEditor(); // assuming `studio` is your Studio SDK instance
    return editor.getHtml(); // returns the HTML string
  }


  destroyEditor(): void {
    if (this.studio) {
      this.studio.destroy();
      this.studio = null;
    }
  }
}
