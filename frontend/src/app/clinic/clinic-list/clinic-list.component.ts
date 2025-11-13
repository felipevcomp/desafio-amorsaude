import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../../_services/clinic.service';

interface Clinic {
  id: number;
  company_name: string;
  trade_name: string;
  cnpj: string;
  regional: { id: number; name: string };
  specialties: { id: number; name: string }[];
  active: boolean;
  opening_date: string;
}

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
})
export class ClinicListComponent implements OnInit {
  clinics: any[] = [];
  loading: boolean = false;
  error: string = '';

  // variaveis da paginacao
  currentPage: number = 1;
  lastPage: number = 1;
  visiblePages: number[] = [];

  // variaveis ordenar por nome
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private clinicService: ClinicService) {
  }

  ngOnInit() {
    this.loadClinics();
  }

  // passo o numero da pagina para poder paginar legal
  loadClinics(page: number = 1) {
    this.loading = true;
    this.error = '';
    this.clinicService.getAllClinics(page).subscribe({
      next: (res) => {
        this.clinics = res.data;
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        // chamo para atualizar a paginacao
        this.updateVisiblePages();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar clínicas';
        this.loading = false;
      }
    });
  }

  // seleciona a pagina que clicar
  goToPage(page: number) {
    if (page < 1 || page > this.lastPage || page === this.currentPage) return;
    this.loadClinics(page);
  }

  // pagincao
  updateVisiblePages() {
    const total = this.lastPage;
    const current = this.currentPage;
    const range = 2;
    let start = Math.max(1, current - range);
    let end = Math.min(total, current + range);

    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(total, start + 4);
      } else if (end === total) {
        start = Math.max(1, end - 4);
      }
    }

    this.visiblePages = Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  // funcao chamada para alterar a ordem da listagem, vou deixar só pelo nome, mas a funcao ta generica
  sortBy(column: string) {
    if (this.sortColumn === column) {
      // inverte direção
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortData(column);
  }

  // alterar ordem da listagem Ascendente e descendente
  private sortData(column: string) {
    this.clinics.sort((a, b) => {
      let aValue = column.includes('.') ? this.getNestedValue(a, column) : a[column];
      let bValue = column.includes('.') ? this.getNestedValue(b, column) : b[column];

      aValue = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
      bValue = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((o, key) => (o ? o[key] : null), obj);
  }

}
