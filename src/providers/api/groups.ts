import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Group } from '../../models';
import { LoadingProvider, DatabaseProvider, NetworkProvider } from '../../providers';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GroupsApi {
  public loaded: boolean;
  private groups: Group[];
  private groupsIndexMap: Map<string, number>;

  private subscriptionMap: Map<string, Subscription>;
  public subscriptions: Map<string, Subject<Group>>;

  private subscription: Subscription;
  private networkSubscription: Subscription;

  public groupsSubscription: Subject<Group[]> = new Subject<Group[]>();

  constructor(private database: DatabaseProvider, private network: NetworkProvider, private loading: LoadingProvider) {
    console.log("Initializing groupsAPI");
    this.networkSubscription = this.network.subscription.subscribe((connected: boolean) => {
      if (connected && !this.loaded) {
        var self = this;
        setTimeout(function() {
          self.init();
        }, 1000);
      }
    });

    this.groupsSubscription = new Subject<Group[]>();
    this.groupsIndexMap = new Map<string, number>();

    this.subscriptionMap = new Map<string, Subscription>();
    this.subscriptions = new Map<string, Subject<Group>>();
  }

  public init(): Promise<any> {
    return new Promise(resolve => {
      if (this.subscription) {
        this.subscription.unsubscribe();
      } else {
        this.loading.show();
      }

      this.subscription = this.database.getGroups().subscribe((groups: Group[]) => {
        this.groups = groups;
        this.groupsSubscription.next(this.groups);
        for (let i = 0; i < this.groups.length; i++) {
          let groupId = this.groups[i].groupId;
          this.groupsIndexMap.set(groupId, i);

          if (!this.subscriptionMap.get(groupId)) {
            this.subscriptions.set(groupId, new Subject<Group>());
            let subscription = this.database.getGroupById(groupId).subscribe((group: Group) => {
              this.subscriptions.get(groupId).next(group);
            });
            this.subscriptionMap.set(groupId, subscription);
          }
        }
        this.loaded = true;
        this.loading.hide();
        resolve();
      });
    });
  }

  public getGroup(groupId: string): Group {
    if (this.loaded)
      return this.groups[this.groupsIndexMap.get(groupId)];
    else
      return null;
  }

  public getGroups(): Group[] {
    if (this.loaded)
      return this.groups;
    else
      return null;
  }

  
}
