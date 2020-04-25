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
import {LoadingComponent} from './static/loading/loading.component';
import {CreateComponent} from './edit/create/create.component';
import {MarkdownEditorComponent} from './edit/markdown-editor/markdown-editor.component';
import {MarkedPipe} from './edit/marked.pipe';
import {MarkdownDisplayComponent} from './edit/markdown-display/markdown-display.component';
import {WikiEntryEditorComponent} from './edit/wiki-entry-editor/wiki-entry-editor.component';
import {WikiEntryViewComponent} from './view/wiki-entry-view/wiki-entry-view.component';
import {LoginComponent} from './user/login/login.component';
import {ModalComponent} from './user/modal/modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './user/registration/registration.component';
import { ModalMessageComponent } from './static/modal-message/modal-message.component';
import { TextLimitPipe } from './helper/text-limit.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { EntryListComponent } from './view/entry-list/entry-list.component';
import { TagSelectionComponent } from './edit/tag-selection/tag-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';


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
    WikiEntryEditorComponent,
    WikiEntryViewComponent,
    LoginComponent,
    ModalComponent,
    RegistrationComponent,
    ModalMessageComponent,
    TextLimitPipe,
    EntryListComponent,
    TagSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
