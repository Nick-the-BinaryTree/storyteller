import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { BrowserAnimationsModule } from
  '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StageEditorIndexComponent } from './stage-editor-index/stage-editor-index.component';
import { StageFormComponent } from './stage-form/stage-form.component';
import { StageSelectComponent } from './stage-select/stage-select.component';

import { rootReducer } from './store';
import { INITIAL_STATE } from './store-settings/store-defaults';
import { IAppState } from './store-settings/store-types';

const appRoutes: Routes = [
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: 'editor', component: StageEditorIndexComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    StageEditorIndexComponent,
    StageSelectComponent,
    StageFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    NgReduxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
