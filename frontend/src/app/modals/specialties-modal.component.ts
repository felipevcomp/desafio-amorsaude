import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Specialty {
  id: number;
  name: string;
}

@Component({
  selector: 'app-specialties-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Especialidades</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <ul class="list-group">
        <li class="list-group-item" *ngFor="let s of specialties">{{ s.name }}</li>
      </ul>
    </div>
  `
})
export class SpecialtiesModalComponent {
  @Input() specialties: Specialty[] = [];

  constructor(public activeModal: NgbActiveModal) {}
}
