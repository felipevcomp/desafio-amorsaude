import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Clinic} from "@/app/_shared/models/clinic.model";
import {ClinicService} from '@/app/_services/clinic.service';
import {SpecialtiesModalComponent} from '@/app/_shared/modals/specialties-modal.component';

/**
 *
 */
@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html'
})
export class ClinicViewComponent implements OnInit {
  clinic: Clinic | null = null;
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
  ) {
  }

  /**
   *
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadClinic(id);
    }
  }

  /**
   *
   * @param id
   */
  loadClinic(id: string) {
    this.loading = true;
    this.clinicService.getClinic(id).subscribe({
      next: (res: Clinic) => {
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
    if (specialties.length === 0) {
      return 'Nenhuma especialidade';
    }
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
  editClinic(id?: number) {
    if (!id) return;
    this.router.navigate(['/clinic/edit', id]);
  }

  /**
   *
   */
  backToList() {
    this.router.navigate(['/clinic']);
  }
}
