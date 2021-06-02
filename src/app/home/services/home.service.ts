import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FiscalYear } from '../models/fiscalyear';
import { Home } from '../models/Home';
import { Indicators } from '../models/indicators';
import { Portfolio } from '../models/portfolio';
import { SearchColumns } from '../models/searchColumns';
import { OrderColumns } from '../models/orderColumns';
import { FilterHome } from '../models/filterHome';
import { DistinctColumns } from '../models/distinctColumns';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  cantperPage = 15;
  page = 0;
  listClientsLoaded: number[] = [];
  totalCount = 0;
  filtered = false;
  ordered = false;
  descOrdered = false;
  columnOrdered: string;
  clients$: Observable<any[]>;
  numberFilters: number;

  constructor(private http: HttpClient) { }

  load(): Observable<Home> {
    return of(() => new Home());
  }

  loadPortfolio(): Observable<Portfolio[]> {
    return this.http.get<Portfolio>('assets/data/portfolio.json').pipe(map(x => x['list']));
  }

  loadFiscalYear(): Observable<FiscalYear[]> {
    return this.http.get<FiscalYear[]>('assets/data/fiscaYear.json').pipe(map(x => x['list']));
  }

  loadIndicators(): Observable<Indicators> {
    return this.http.get<Indicators>('assets/data/indicators.json');
  }

  loadColumnsFilter(): Observable<SearchColumns[]> {
    return this.http.get<SearchColumns[]>('assets/data/searchColumns.json');
  }

  loadColumnsOrder(): Observable<OrderColumns[]> {
    return this.http.get<OrderColumns[]>('assets/data/homeInitialOrderColumns.json');
  }

  loadDistinctColumns(): Observable<DistinctColumns[]> {
    return this.http.get<DistinctColumns>('assets/data/distinctColumns.json').pipe(map(x => x['list']));
  }

  /************* GRID CLIENTS *************/
  setPage() {
    this.listClientsLoaded.push(this.page);
    this.page += this.cantperPage;
  }

  resetPage() {
    this.listClientsLoaded = [];
    this.page = 0;
  }

  getPage(): number {
    return this.page;
  }

  isPageLoaded(page: number): boolean {
    return this.listClientsLoaded.find(x => x === page) === undefined;
  }

  // tslint:disable-next-line: no-shadowed-variable
  getFilters(filters: FilterHome[]): string {
    let filter:string = '';
    if(filters.length === 1){
      filter = `&$filter=substringof('${filters[0].query}', ${filters[0].columnName}) eq true`;
    }
    else if(filters.length > 1){
      let i:number = 0;
      filters.forEach(item=>{
        if(i===0){
          filter = `&$filter=substringof('${item.query}', ${item.columnName}) eq true`;
        }
        else{
          filter = `${filter} and substringof('${item.query}', ${item.columnName}) eq true`;
        }
      });
    }
    return filter;
  }

  getOrder(orderColumns: OrderColumns): string{
    return `&$orderby=${orderColumns.columnName} ${orderColumns.orderType}`;
  }

  clientObservable(filterHome: FilterHome[], orderColumns: OrderColumns) {
    if (!orderColumns) {
      orderColumns = new OrderColumns('ProductName', true, 'asc');
    }
    let url = `https://services.odata.org/V3/Northwind/Northwind.svc/Products?$skip=${this.getPage()}&$top=${this.cantperPage}${this.getFilters(filterHome)}${this.getOrder(orderColumns)}`;
    console.log(url);
    this.clients$ = this.http.get<any>(url);
  }

  loadClients(loadOptions: any): Promise<any> {
    const isloaded = this.isPageLoaded(this.getPage());
    let filterHome: FilterHome[] = [];
    let orderColumns: OrderColumns;
    if (loadOptions.filter) {
      if (!this.filtered) {
        this.resetPage();
      }
      if (loadOptions.filter[1] === 'and' || loadOptions.filter[1] === 'or') {
        if (loadOptions.filter.filterValue && loadOptions.filter.filterValue instanceof Date) {
          const date = new Date(loadOptions.filter.filterValue);
          const datestring = `${date.getFullYear()}-${this.leftpad(date.getMonth() + 1, 2)}-${this.leftpad(date.getDate(), 2)}`;
          // tslint:disable-next-line: no-shadowed-variable
          const filter = new FilterHome(loadOptions.filter[0][0], datestring);
          if (loadOptions.filter.filterValue) {
            filterHome.push(filter);
          }
        } else {
          loadOptions.filter.forEach((index) => {
            if (index === 0 || index % 2 === 0) {
              // tslint:disable-next-line: no-shadowed-variable
              const filter = new FilterHome(loadOptions.filter[index][0], loadOptions.filter[index].filterValue);
              if (loadOptions.filter[index].filterValue) {
                filterHome.push(filter);
              } else {
                loadOptions.filter[index].forEach((fil) => {
                  if (index === 0 || index % 2 === 0) {
                    // tslint:disable-next-line: no-shadowed-variable
                    const filter = new FilterHome(fil[0], fil.filterValue);
                    if (fil.filterValue) {
                      filterHome.push(filter);
                    }
                  }
                });
              }
            }
          });
        }
      } else {
        // tslint:disable-next-line: no-shadowed-variable
        const filter = new FilterHome(loadOptions.filter[0], loadOptions.filter.filterValue);
        if (loadOptions.filter.filterValue) {
          filterHome.push(filter);
        }
      }
      filterHome = this.distinctColumns(filterHome);
      if (this.numberFilters !== filterHome.length) {
        this.resetPage();
      }
      this.numberFilters = filterHome.length;
    } else {
      if (this.filtered) {
        this.resetPage();
      }
      this.filtered = false;
    }
    if (loadOptions.sort && loadOptions.sort.length > 0) {
      if (!this.ordered || this.descOrdered !== loadOptions.sort[0].desc || this.columnOrdered !== loadOptions.sort[0].selector) {
        this.resetPage();
      }
      orderColumns = new OrderColumns(loadOptions.sort[0].selector, true, loadOptions.sort[0].desc ? 'desc' : 'asc');
      this.descOrdered = loadOptions.sort[0].desc;
      this.columnOrdered = loadOptions.sort[0].selector;
      this.ordered = true;
    } else {
      if (this.ordered) {
        this.resetPage();
      }
      this.ordered = false;
    }
    this.clientObservable(filterHome, orderColumns);
    if (isloaded && this.getPage() > 0 && this.listClientsLoaded.length <= (this.numPages() + 1)) {
      return this.clients$
        .toPromise()
        .then((data: any) => {
          this.setPage();
          this.totalCount = data.value.length;
          return {
            data: data.value,
            totalCount: data.value.length
          };
        })
        .catch(() => { throw new Error('Data Loading Error'); });
    } else {
      return this.clients$
        .toPromise()
        .then((data: any) => {
          this.setPage();
          this.totalCount = data.value.length;
          return {
            data: data.value,
            totalCount: data.value.length
          };
        })
        .catch(() => { throw new Error('Data Loading Error'); });
    }
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
  }

  numPages() {
    return this.totalCount / this.cantperPage;
  }  

  distinctColumns(filterHome: FilterHome[]): FilterHome[] {
    const filterHomeDistinct: FilterHome[] = [];
    filterHome.forEach(column => {
      const columnFilter = filterHome.find(a => a.columnName === column.columnName);
      columnFilter.query = filterHome.filter(a => a.columnName === column.columnName).map(x => x.query).join('-');
      filterHomeDistinct.push(columnFilter);
    });
    return this.distintArray(filterHomeDistinct);
  }

  distintArray(filterHome: FilterHome[]): FilterHome[] {
    const result: FilterHome[] = filterHome.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
    result.forEach(x => {
      const queryArray: string[] = x.query.split('-');
      const queryTemp: string[] = [];
      queryArray.forEach(q => {
        if (!queryTemp.includes(q)) {
          queryTemp.push(q);
        }
      });
      x.query = queryTemp.join('-');
    });
    return result;
  }

  /************* GRID *************/
}
