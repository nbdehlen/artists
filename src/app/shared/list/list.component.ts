import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

const GET_ARTISTS = gql`
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
`;

type Artist = {
  id: number;
  name: string;
  picture: string;
  price: number;
  tags: Tag[];
  video: string;
};

type Tag = {
  id: number;
  name: string;
  group: number;
};
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  public artistList: Artist[];
  public loading = true;
  public error: any;
  public searchText = '';
  public filteredData = [];

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.querySubscription = this.apollo
      .watchQuery({
        query: GET_ARTISTS,
      })
      .valueChanges.subscribe((res: any) => {
        this.artistList = res?.data?.artistList;
        this.loading = res.loading;
        this.error = res.error;
        console.log(this.artistList);
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  textFilter(term: string, artistList: Artist[]): Artist[] {
    return artistList.filter((item) => item.name.includes(term));
  }

  clearFilter() {
    this.searchText = '';
  }
}
