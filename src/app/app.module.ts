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
import {EditOrCreateComponent} from './edit/edit-or-create/edit-or-create.component';
import {MarkdownEditorComponent} from './edit/markdown-editor/markdown-editor.component';
import {MarkedPipe} from './helper/marked.pipe';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './static/footer/footer.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EditComponent } from './edit/edit/edit.component';
import { CreateComponent } from './edit/create/create.component';
import { UserMuseumListComponent } from './user/user-profile/user-museum-list/user-museum-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserEditListComponent } from './user/user-profile/user-edit-list/user-edit-list.component';
import { ViewEditComponent } from './view/view-edit/view-edit.component';
import { CollectionListComponent } from './view/collection-list/collection-list.component';
import { ConfirmationModalComponent } from './static/confirmation-modal/confirmation-modal.component';
import { ReviewEditComponent } from './static/review-edit/review-edit.component';


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
    TagSelectionComponent,
    FooterComponent,
    EditComponent,
    CreateComponent,
    EditOrCreateComponent,
    UserMuseumListComponent,
    UserEditListComponent,
    ViewEditComponent,
    CollectionListComponent,
    ConfirmationModalComponent,
    ReviewEditComponent
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
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
