import { types } from 'mobx-state-tree';

const Area = types.model('Area', {
  id: types.string,
  adress: types.string,
});

export const AreasStore = types.model('AreasStore', {
  list: types.array(Area),
  count: types.number,
  next_link: types.maybeNull(types.string),
  previous: types.maybeNull(types.string),
  loading_status: types.string,
  limit: types.number,
});
