import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app/app.component';
import {MuseumListComponent} from './view/museum-list/museum-list.component';
import {HomeComponent} from './static/home/home.component';
import {SearchComponent} from './static/search/search/search.component';
import {AboutComponent} from './static/about/about.component';
import {PageNotFoundComponent} from './static/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigationBarComponent} from './static/navigation-bar/navigation-bar.component';
import {SearchInCategoryComponent} from './static/search/search-in-category/search-in-category.component';
import {ViewComponent} from './view/view/view.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-ram-server/in-memory-data.service';
import {LoadingComponent} from './static/loading/loading.component';
import {CreateComponent} from './edit/create/create.component';
import {MarkdownEditorComponent} from './edit/markdown-editor/markdown-editor.component';
import { MarkedPipe } from './edit/marked.pipe';
import { MarkdownDisplayComponent } from './edit/markdown-display/markdown-display.component';
import { BasicInfoEditorComponent } from './edit/basic-info-editor/basic-info-editor.component';
import { BasicInfoViewComponent } from './view/basic-info-view/basic-info-view.component';
import { LoginComponent } from './user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MuseumListComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    PageNotFoundComponent,
    NavigationBarComponent,
    SearchInCategoryComponent,
    ViewComponent,
    UserProfileComponent,
    LoadingComponent,
    CreateComponent,
    MarkdownEditorComponent,
    MarkedPipe,
    MarkdownDisplayComponent,
    BasicInfoEditorComponent,
    BasicInfoViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false, passThruUnknownUrl: true, delay: 500}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
