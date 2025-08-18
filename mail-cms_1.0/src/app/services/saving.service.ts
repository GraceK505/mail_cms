import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { Editor } from 'grapesjs';

@Injectable({ providedIn: 'root' })

export class SavingService {
    constructor() { }

    async saveToSessionStorage(projectId: string, project: string) {
        sessionStorage.setItem(projectId, JSON.stringify(project));
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
}