import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { MuseumListComponent } from './static/museum-list/museum-list.component';
import { HomeComponent } from './static/home/home.component';
import { SearchComponent } from './search/search/search.component';
import { AboutComponent } from './static/about/about.component';
import { PageNotFoundComponent } from './static/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavigationBarComponent } from './static/navigation-bar/navigation-bar.component';
import { SearchInCategoryComponent } from './search/search-in-category/search-in-category.component';
import { ViewComponent } from './view/view/view.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import { LoadingComponent } from './static/loading/loading.component';

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
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
