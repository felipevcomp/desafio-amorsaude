import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ClinicService } from '../../_services/clinic.service';
import { SpecialtiesModalComponent } from '@/app/_shared/modals/specialties-modal.component';

/**
 *
 */
@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html'
})
export class ClinicViewComponent implements OnInit {
  clinic: any;
  loading = false;
  error = '';

  /**
   *
   * @param route
   * @param router
   * @param clinicService
   * @param modalService
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clinicService: ClinicService,
    private modalService: NgbModal
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {this.loadClinic(id);}
  }

  /**
   *
   * @param id
   */
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

  /**
   *
   */
  getSpecialtiesPreview(): string {
    const specialties = this.clinic?.specialties || [];
    if (specialties.length === 0) {return 'Nenhuma especialidade';}
    const preview = specialties.slice(0, 2).map((s: any) => s.name).join(', ');
    return specialties.length > 2 ? `${preview}` : preview;
  }

  /**
   *
   * @param specialties
   */
  openSpecialtiesModal(specialties: any[]) {
    const modalRef = this.modalService.open(SpecialtiesModalComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.specialties = specialties;
  }

  /**
   *
   * @param id
   */
  editClinic(id: number) {
    console.log(id);
    this.router.navigate(['/clinic/edit', id]);
  }

  /**
   *
   */
  backToList() {
    this.router.navigate(['/clinic']);
  }

  /**
   *
   * @param value
   */
  formatCnpj(value: string): string {
    if (!value) {return '';}

    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  }
}
