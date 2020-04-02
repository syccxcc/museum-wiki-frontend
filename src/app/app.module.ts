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
import { ViewMuseumComponent } from './view/view-museum/view-museum.component';

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
    ViewMuseumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
