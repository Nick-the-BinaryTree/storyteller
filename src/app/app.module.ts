import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterEditorComponent } from './character-editor/character-editor.component';
import { StageEditorIndexComponent } from './stage-editor-index/stage-editor-index.component';
import { StageEditorComponent } from './stage-editor/stage-editor.component';

import { rootReducer } from './store';
import { INITIAL_STATE } from './store-settings/store-defaults';
import { IAppState } from './store-settings/store-types';

const appRoutes: Routes = [
  { path: '', redirectTo: '/stage', pathMatch: 'full' },
  { path: 'character/:id', component: CharacterEditorComponent },
  { path: 'stage', component: StageEditorIndexComponent },
  { path: 'stage/:id', component: StageEditorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    StageEditorIndexComponent,
    StageEditorComponent,
    CharacterEditorComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    AppRoutingModule,
    BrowserModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
