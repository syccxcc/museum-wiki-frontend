import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './static/home/home.component';
import {MuseumListComponent} from './static/museum-list/museum-list.component';
import {SearchComponent} from './search/search/search.component';
import {AboutComponent} from './static/about/about.component';
import {PageNotFoundComponent} from './static/page-not-found/page-not-found.component';
import {SearchInCategoryComponent} from './search/search-in-category/search-in-category.component';
import {ViewComponent} from './view/view/view.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'museum-list', component: MuseumListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:searchCategory/:searchText', component: SearchInCategoryComponent},
  { path: 'about', component: AboutComponent },
  { path: 'view/:viewCategory/:id', component: ViewComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
