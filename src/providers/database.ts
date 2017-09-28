import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import 'rxjs/add/operator/take';

@Injectable()
export class DatabaseProvider {

  constructor(private database: AngularFireDatabase) {
    console.log("Initializing Database Provider");
  }

  public exists(query: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.database.object(query).take(1).subscribe((obj) => {
        if (obj.$exists()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public getUserById(userId: string): FirebaseObjectObservable<any> {
    return this.database.object('users/' + userId);
  }

  public getUsers(): FirebaseListObservable<any> {
    return this.database.list('/users', {
      query: {
        orderByChild: 'firstName'
      }
    });
  }

  public setUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.object('users/' + user.userId).set(user).then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public setPushToken(userId, token): void {
    this.database.list('/users', {
      query: {
        orderByChild: 'pushToken',
        equalTo: token
      }
    }).take(1).subscribe((users) => {
      if (users.length > 0) {
        this.database.object('users/' + users[0].$key).update({
          pushToken: ''
        });
      }
      this.database.object('users/' + userId).update({
        pushToken: token
      });
    });
  }

  public removePushToken(userId): void {
    this.database.object('users/' + userId).update({
      pushToken: ''
    });
  }

}