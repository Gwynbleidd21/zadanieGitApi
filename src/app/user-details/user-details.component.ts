import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {RestService} from '../rest.service';

export interface PeriodicElement {
  name: any;
  description: any;
  language: any;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit, AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rest: RestService
  ) { }

  dataSource = new MatTableDataSource();
  repos: PeriodicElement[] = [];
  headElements = ['name', 'description', 'language'];
  pageIndex = 0;
  pageSize = 15;
  name = '';
  repositories = '';
  followers = '';
  url = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  evaluateParams(params: Params) {
    this.rest.getUser(params.name).subscribe(
      (response: any) => {
        this.name = response.login;
        this.repositories = response.public_repos;
        this.followers = response.followers;
        this.url = response.avatar_url;
        let pom = 0;
        if (Number(this.repositories) % 30 === 0) {
          pom = Math.floor(Number(this.repositories) / 30);

        } else {
          pom = Math.floor(Number(this.repositories) / 30) + 1;
        }
        for (let i = 1; i <= pom; i++) {
          const para = this.name.toLowerCase() + '/repos?page=' + i;
          this.rest.getSomeRepos(para).subscribe(
            (dar: any) => this.handleUsers(dar, i - 1)
          );
        }
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.evaluateParams(params);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleUsers(data: any, iterator: number): void {
    let i = 0;
    data.forEach(line => {
        this.repos[i + (iterator * 30)] = this.transformData(line);
        i++;
      }
    );
    this.dataSource.data = this.repos;
  }

  transformData(data: any) {
    const user: PeriodicElement = {name : '', description : '',
      language : ''};
    this.rest.getUserDetails(data.url).subscribe(
      (details: any) => {
        user.name = data.name;
        if (data.description !== null) {
          user.description = data.description;
        } else {
          user.description = 'Not defined';
        }
        if (details.language !== null) {
          user.language = details.language;
        } else {
          user.language = 'Not defined';
        }
      }
    );
    return user;
  }
}
