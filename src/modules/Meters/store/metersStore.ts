import { ApiServices, IResponse } from '@/core';
import { IDeletResponse, IMeter } from '@modules';
import { flow, types } from 'mobx-state-tree';
const Meter = types.model('Meter', {
  id: types.string,
  _type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.string,
  initial_values: types.array(types.number),
  adress_id: types.string,
  adress: types.maybe(types.string),
  description: types.maybeNull(types.string),
});

export const MetersStore = types
  .model('MetersStore', {
    list: types.array(Meter),
    loading_status: types.string,
    hasEmpryAdresses: types.boolean,
    count: types.number,
    next_link: types.maybeNull(types.number),
    previous: types.maybeNull(types.number),
    count_deleted: types.number,
  })
  .actions((self) => ({
    removeItem: flow(function* (id: string) {
      const result: IDeletResponse = yield ApiServices.delete<IDeletResponse>(
        id
      );

      const filteredMeters = self.list.filter((el) => el.id !== id);
      if (result.status === 204 && self.next_link) {
        const getData: IResponse<IMeter[], number | null> =
          yield ApiServices.loadSingleItem(self.next_link + self.count_deleted);

        self.list = [...filteredMeters, getData.results[0]] as typeof self.list;

        self.count_deleted += 1;
      } else {
        self.list = [...filteredMeters] as typeof self.list;
      }
    }),
  }));
