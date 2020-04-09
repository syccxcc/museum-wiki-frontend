import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MuseumListComponent } from './static/museum-list/museum-list.component';
import { HomeComponent } from './static/home/home.component';
import { SearchComponent } from './static/search/search/search.component';
import { AboutComponent } from './static/about/about.component';
import { PageNotFoundComponent } from './static/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavigationBarComponent } from './static/navigation-bar/navigation-bar.component';
import { SearchInCategoryComponent } from './static/search/search-in-category/search-in-category.component';
import { ViewComponent } from './view/view/view.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import { LoadingComponent } from './static/loading/loading.component';
import { CreateComponent } from './edit/create/create.component';
import { MarkdownEditorComponent } from './edit/markdown-editor/markdown-editor.component';

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
    MarkdownEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false, passThruUnknownUrl: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
