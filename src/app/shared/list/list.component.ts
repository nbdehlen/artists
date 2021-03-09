import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  artistList: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            artistList {
              id
              name
              picture
              price
              video
              tags {
                id
                name
                group
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((res: any) => {
        this.artistList = res?.data?.artistList;
        this.loading = res.loading;
        this.error = res.error;
        console.log(res.data.artistList);
      });
  }
}
