'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">museum-wiki-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' : 'data-target="#xs-components-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' :
                                            'id="xs-components-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollectionListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CollectionListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmationModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmationModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditOrCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditOrCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EntryListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntryListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MarkdownDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarkdownDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MarkdownEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarkdownEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalMessageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalMessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MuseumListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MuseumListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavigationBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistrationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistrationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchInCategoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchInCategoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagSelectionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagSelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEditListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserEditListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserMuseumListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserMuseumListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WikiEntryEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WikiEntryEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WikiEntryViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WikiEntryViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' : 'data-target="#xs-pipes-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' :
                                            'id="xs-pipes-links-module-AppModule-7f34c96940972355cb7840301e2800c4"' }>
                                            <li class="link">
                                                <a href="pipes/MarkedPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarkedPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TextLimitPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextLimitPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Artifact.html" data-type="entity-link">Artifact</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArtifactBuilder.html" data-type="entity-link">ArtifactBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicEntry.html" data-type="entity-link">BasicEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicEntryBuilder.html" data-type="entity-link">BasicEntryBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/BasicUserInfo.html" data-type="entity-link">BasicUserInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Collection.html" data-type="entity-link">Collection</a>
                            </li>
                            <li class="link">
                                <a href="classes/CollectionBuilder.html" data-type="entity-link">CollectionBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Edit.html" data-type="entity-link">Edit</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditBuilder.html" data-type="entity-link">EditBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/HashHelper.html" data-type="entity-link">HashHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mocker.html" data-type="entity-link">Mocker</a>
                            </li>
                            <li class="link">
                                <a href="classes/Museum.html" data-type="entity-link">Museum</a>
                            </li>
                            <li class="link">
                                <a href="classes/MuseumBuilder.html" data-type="entity-link">MuseumBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectConfig.html" data-type="entity-link">ProjectConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProtoArtifact.html" data-type="entity-link">ProtoArtifact</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProtoCollection.html" data-type="entity-link">ProtoCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProtoEdit.html" data-type="entity-link">ProtoEdit</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProtoMuseum.html" data-type="entity-link">ProtoMuseum</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrototypeBuilder.html" data-type="entity-link">PrototypeBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProtoUser.html" data-type="entity-link">ProtoUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerCannotConnect.html" data-type="entity-link">ServerCannotConnect</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerConfig.html" data-type="entity-link">ServerConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServerResponse.html" data-type="entity-link">ServerResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/WikiEntry.html" data-type="entity-link">WikiEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/WikiEntryBuilder.html" data-type="entity-link">WikiEntryBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Wrapper.html" data-type="entity-link">Wrapper</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ArtifactService.html" data-type="entity-link">ArtifactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CollectionService.html" data-type="entity-link">CollectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EditService.html" data-type="entity-link">EditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetByCategoryService.html" data-type="entity-link">GetByCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MuseumService.html" data-type="entity-link">MuseumService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PreviousRouteService.html" data-type="entity-link">PreviousRouteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectConfigService.html" data-type="entity-link">ProjectConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServerConfigService.html" data-type="entity-link">ServerConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserInfoService.html" data-type="entity-link">UserInfoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/LoginGuardService.html" data-type="entity-link">LoginGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});