import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {RestService} from '../rest.service';
import {MatSort, Sort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  name: any;
  picture: any;
  followers: any;
  repositories: any;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, AfterViewInit {

  constructor(public rest: RestService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
    this.dataSource.paginator = this.paginator;
  }

  headElements = ['name', 'picture', 'followers', 'repositories'];
  dataSource = new MatTableDataSource();
  urls: string;
  users: PeriodicElement[] = [];
  pageIndex = 0;
  pageSize = 15;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProducts(location?: any) {
    if (location) {
    location = location.target.value;
    } else {
      location = 'Nitra';
    }
    let params = location + '&page=' + 1;

    this.rest.getProducts(params).subscribe(
      (response: any) => {
        let pom = 0;
        if (response.total_count % 30 === 0) {
          pom = Math.floor(response.total_count / 30);

        } else {
          pom = Math.floor(response.total_count / 30) + 1;
        }
        for (let i = 1; i <= pom; i++) {
          params = location + '&page=' + i;
          this.rest.getProducts(params).subscribe(
            (data: any) => this.handleUsers(data.items, i - 1)
          );
        }
      }
    );
  }

  handleUsers(data: any, iterator: number): void {
    let i = 0;
    data.forEach(line => {
      this.users[i + (iterator * 30)] = this.transformData(line);
      i++;
      }
    );
    this.dataSource.data = this.users;
  }

  transformData(data: any) {
    const user: PeriodicElement = {id: 0, name : '', picture : '',
      followers : '', repositories : ''};
    this.rest.getUserDetails(data.url).subscribe(
      (details: any) => {
        user.id = data.id;
        user.name = data.login;
        user.picture = data.avatar_url;
        user.followers = details.followers;
        user.repositories = details.public_repos;
      }
    );
    return user;
  }

  page(event) {
    this.pageIndex = event.pageIndex;
  }

  btnClick(data: any) {
    this.urls = 'https://github.com/' + data;
    window.open(this.urls,  '_blank');
  }

  openUserDetails(row) {
    this.router.navigate(['/user-details/', row.name]);
  }
}
