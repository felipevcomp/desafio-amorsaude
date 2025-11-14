import {Component, OnInit} from '@angular/core';
import {ClinicService} from '../../_services/clinic.service';
import {debounceTime, Subject} from "rxjs";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SpecialtiesModalComponent} from '../../modals/specialties-modal.component';
import {Router} from "@angular/router";

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
  clinics: Clinic[] = [];
  filteredClinics: Clinic[] = [];
  loading: boolean = false;
  error: string = '';

  // variáveis de paginação
  currentPage: number = 1;
  lastPage: number = 1;
  visiblePages: number[] = [];

  // variáveis de ordenação
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // variáveis do filtro
  filterTerm: string = '';
  private filterSubject: Subject<string> = new Subject();

  constructor(private clinicService: ClinicService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.loadClinics();

    this.filterSubject.pipe(debounceTime(1000)).subscribe((term) => {
      this.applyFilter(term);
    });
  }

  loadClinics(page: number = 1) {
    this.loading = true;
    this.error = '';
    this.clinicService.getAllClinics(page).subscribe({
      next: (res: any) => {
        this.clinics = res.data;
        this.filteredClinics = [...this.clinics];
        this.currentPage = res.current_page;
        this.lastPage = res.last_page;
        this.updateVisiblePages();
        this.loading = false;

        if (this.sortColumn) this.sortData(this.sortColumn);
      },
      error: () => {
        this.error = 'Erro ao carregar clínicas';
        this.loading = false;
      }
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.lastPage || page === this.currentPage) return;
    this.loadClinics(page);
  }

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

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortData(column);
  }

  private sortData(column: string) {
    this.filteredClinics.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (column) {
        case 'company_name':
          aValue = a.company_name;
          bValue = b.company_name;
          break;
        case 'cnpj':
          aValue = a.cnpj;
          bValue = b.cnpj;
          break;
        case 'regional':
          aValue = a.regional?.name || '';
          bValue = b.regional?.name || '';
          break;
        case 'specialties':
          aValue = a.specialties.map(s => s.name).join(', ');
          bValue = b.specialties.map(s => s.name).join(', ');
          break;
        case 'active':
          aValue = a.active ? 1 : 0;
          bValue = b.active ? 1 : 0;
          break;
        default:
          aValue = '';
          bValue = '';
      }

      aValue = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
      bValue = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onFilterChange(term: string) {
    this.filterSubject.next(term);
  }

  private applyFilter(term: string) {
    if (!term) {
      this.filteredClinics = [...this.clinics];
      if (this.sortColumn) this.sortData(this.sortColumn);
      return;
    }

    const lowerTerm = term.toLowerCase();

    const localResults = this.clinics.filter(c =>
      c.company_name.toLowerCase().includes(lowerTerm) ||
      c.cnpj.toLowerCase().includes(lowerTerm) ||
      c.regional?.name.toLowerCase().includes(lowerTerm) ||
      c.specialties.some(s => s.name.toLowerCase().includes(lowerTerm)) ||
      (c.active ? 'sim' : 'não').includes(lowerTerm)
    );

    if (localResults.length > 0) {
      this.filteredClinics = localResults;
      if (this.sortColumn) this.sortData(this.sortColumn);
      return;
    }

    this.loading = true;

    this.clinicService.searchClinics(term).subscribe({
      next: (res: any) => {
        this.filteredClinics = res.data ?? []; // mantém padrão de paginação
        this.loading = false;

        if (this.sortColumn) this.sortData(this.sortColumn);
      },
      error: () => {
        this.filteredClinics = [];
        this.loading = false;
      }
    });
  }


  openSpecialtiesModal(specialties: any[]) {
    const modalRef = this.modalService.open(SpecialtiesModalComponent, {size: 'lg', centered: true });
    modalRef.componentInstance.specialties = specialties;
  }

  formatCnpj(cnpj: string): string {
    if (!cnpj) return '';
    const v = cnpj.replace(/\D/g, '');
    return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
  newClinic() {
    this.router.navigate(['/clinic/create']);
  }

  editClinic(id: number) {
    this.router.navigate(['/clinic/edit', id]);
  }

  viewClinic(id: number) {
    this.router.navigate(['/clinic/view', id]);
  }
}
