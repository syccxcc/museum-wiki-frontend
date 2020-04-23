import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './static/home/home.component';
import {MuseumListComponent} from './view/museum-list/museum-list.component';
import {SearchComponent} from './static/search/search/search.component';
import {AboutComponent} from './static/about/about.component';
import {PageNotFoundComponent} from './static/page-not-found/page-not-found.component';
import {SearchInCategoryComponent} from './static/search/search-in-category/search-in-category.component';
import {ViewComponent} from './view/view/view.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {CreateComponent} from './edit/create/create.component';
import {LoginGuardService} from './services/user/login-guard.service';
import {LoginComponent} from './user/login/login.component';
import {RegistrationComponent} from './user/registration/registration.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'museum-list', component: MuseumListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:searchCategory/:searchText', component: SearchInCategoryComponent},
  { path: 'about', component: AboutComponent },
  { path: 'view/:viewCategory/:id', component: ViewComponent},
  { path: 'create/museum', component: CreateComponent, canActivate: [LoginGuardService]},
  { path: 'create/:category/:museumId', component: CreateComponent, canActivate: [LoginGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [LoginGuardService]},
  { path: 'register', component: RegistrationComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
