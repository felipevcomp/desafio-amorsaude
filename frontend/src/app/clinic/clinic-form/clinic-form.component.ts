import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ClinicService} from '../../_services/clinic.service';

interface Specialty {
  id: number;
  name: string;
}

interface Regional {
  id: number;
  name: string;
}

/**
 *
 */
@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
})
export class ClinicFormComponent implements OnInit {
  clinicId?: number;
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  saving: boolean = false;
  error: string = '';
  success: string = '';

  regionals: Regional[] = [];
  specialties: Specialty[] = [];

  /**
   *
   * @param fb
   * @param clinicService
   * @param route
   * @param router
   */
  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      company_name: ['', Validators.required],
      trade_name: ['', Validators.required],
      cnpj: ['', Validators.required],
      regional_id: ['', Validators.required],
      opening_date: ['', Validators.required],
      active: [true],
      specialties: [[], Validators.required],
    });
  }

  /**
   *
   */
  ngOnInit() {
    this.loadRegionals();
    this.loadSpecialties();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.clinicId = +id;
        this.loadClinic();
      }
    });
  }

  /**
   *
   */
  loadRegionals() {
    this.clinicService.getRegionals().subscribe({
      next: res => (this.regionals = res),
      error: () => (this.error = 'Erro ao carregar regionais'),
    });
  }

  /**
   *
   */
  loadSpecialties() {
    this.clinicService.getSpecialties().subscribe({
      next: res => (this.specialties = res),
      error: () => (this.error = 'Erro ao carregar especialidades'),
    });
  }

  /**
   *
   */
  loadClinic() {
    this.loading = true;
    this.clinicService.getClinic(this.clinicId!).subscribe({
      next: clinic => {
        this.form.patchValue({
          company_name: clinic.company_name,
          trade_name: clinic.trade_name,
          cnpj: clinic.cnpj,
          regional_id: clinic.regional?.id,
          opening_date: clinic.opening_date.split(' ')[0],
          active: clinic.active,
          specialties: clinic.specialties?.map((s: Specialty) => s.id) || [] // array de IDs
        });

        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar clínica';
        this.loading = false;
      },
    });
  }


  /**
   *
   */
  submit() {
    this.submitted = true;

    if (this.form.invalid) {return;}

    const specialties = this.form.get('specialties')?.value || [];
    if (specialties.length < 5) {
      this.error = 'Selecione pelo menos 5 especialidades.';
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = '';

    const request = this.clinicId
      ? this.clinicService.updateClinic(this.clinicId, this.form.value)
      : this.clinicService.createClinic(this.form.value);

    request.subscribe({
      next: (res) => {
        this.success = 'Clínica salva com sucesso!';
        this.saving = false;

        const clinicId = this.clinicId || res.id;

        setTimeout(() => {
          this.router.navigate(['/clinic/view', clinicId]);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erro ao salvar clínica';
        this.saving = false;
      },
    });
  }


  /**
   *
   */
  deleteClinic() {
    if (!this.clinicId) {return;}

    if (!confirm('Tem certeza que deseja excluir esta clínica?')) {
      return;
    }

    this.saving = true;
    this.clinicService.deleteClinic(this.clinicId).subscribe({
      next: () => {
        this.success = 'Clínica excluída com sucesso!';

        setTimeout(() => {
          this.router.navigate(['/clinic']);
        }, 1500);

        this.saving = false;
      },
      error: err => {
        this.error = err.error?.message || 'Erro ao excluir clínica';
        this.saving = false;
      },
    });
  }

}
