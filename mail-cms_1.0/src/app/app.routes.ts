
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { EditorComponent } from './components/editor/editor.component';
import { SearchComponent } from './search/search.component';
import { DocsComponent } from './docs/docs.component';
import { SearchSlotComponent } from './search-slot/search-slot.component';
import { TemplateEditingComponent } from './components/template-editing/template-editing.component';
import { TemplateListComponent } from './template-list/template-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { 
        path: 'editor', 
        component: EditorComponent, 
        data: { viewTransitionName: 'page-content' }
      },
      { 
        path: 'search', 
        component: SearchComponent,
      },
      { path: 'search-slot', component: SearchSlotComponent },
      { path: 'template-editor', component: TemplateEditingComponent },
      { path: 'template-list', component: TemplateListComponent },
      { path: 'docs', component: DocsComponent },
      { path: 'campaign', component: CampaignComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

