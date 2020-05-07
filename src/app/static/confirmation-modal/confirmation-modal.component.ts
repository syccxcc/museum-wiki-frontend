import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

/**
 * a modal asking for the user to confirm an action that has an irreversible and detrimental consequence
 */
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  /**
   * title on top of modal
   */
  title: string;
  /**
   * message displayed in the modal
   */
  message: string;
  /**
   * the modal class that contains the content of this component;
   * need this information so that the modal can be closed on user click
   */
  modal: NgbActiveModal;

  /**
   * all members are publicly accessible, so no constructor is needed
   */
  constructor() { }

}
