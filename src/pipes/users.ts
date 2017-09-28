import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'usersFilter',
  pure: false
})
@Injectable()
export class UsersPipe implements PipeTransform {
  transform(users: User[], excludedIds: string[]): any {
    if (!users) {
      return;
    } else if (!excludedIds) {
      return users;
    } else if (excludedIds) {
      return users.filter((user: User) => excludedIds.indexOf(user.userId) == -1);
    }
  }
}
