import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from '../../_services/clinic.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialtiesModalComponent } from '../../modals/specialties-modal.component';

@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html'
})
export class ClinicViewComponent implements OnInit {
  clinic: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clinicService: ClinicService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadClinic(id);
  }

  loadClinic(id: string) {
    this.loading = true;
    this.clinicService.getClinic(id).subscribe({
      next: (res) => {
        this.clinic = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar dados da clínica.';
        this.loading = false;
      }
    });
  }

  getSpecialtiesPreview(): string {
    const specialties = this.clinic?.specialties || [];
    if (specialties.length === 0) return 'Nenhuma especialidade';
    const preview = specialties.slice(0, 2).map((s: any) => s.name).join(', ');
    return specialties.length > 2 ? `${preview}` : preview;
  }

  openSpecialtiesModal(specialties: any[]) {
    const modalRef = this.modalService.open(SpecialtiesModalComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.specialties = specialties;
  }

  editClinic(id: number) {
    console.log(id);
    this.router.navigate(['/clinic/edit', id]);
  }

  backToList() {
    this.router.navigate(['/clinic']);
  }
}
