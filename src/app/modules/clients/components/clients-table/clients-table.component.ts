import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from '../../../core/models/client.model';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'lp',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Client>;
  totalCount = 0;
  filterValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private clientSerivce: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemsPerPage = this.paginator.pageSize;
            const sortDirection = this.sort.direction;
            const sortColumnName = this.sort.active;
            return this.clientSerivce.getClients(
              pageIndex,
              itemsPerPage,
              sortDirection,
              sortColumnName
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            // Only refresh the result length if there is new data. In case of rate
            // limit errors, we do not want to reset the paginator to zero, as that
            // would prevent users from re-triggering requests.
            return data.clients;
          })
        )
        .subscribe((clients) => {
          this.dataSource = new MatTableDataSource<Client>(clients);
        })
    );

    this.sub.add(
      this.filterValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          const val = value?.trim();
          this.applyFilter(val);
        })
    );
  }

  applyFilter(val: string) {
    const pageIndex = this.paginator.pageIndex + 1;
    const itemsPerPage = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortColumnName = this.sort.active;

    this.clientSerivce
      .getClients(pageIndex, itemsPerPage, sortDirection, sortColumnName, val)
      .subscribe({
        next: (response) => {
          this.totalCount = response.totalCount;
          this.dataSource = new MatTableDataSource<Client>(response.clients);
        },
      });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
