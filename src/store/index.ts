import { ApiServices, IResponse } from '@/core';
import { AreasStore, IArea, IMeter, MetersStore } from '@modules';
import { flow, types } from 'mobx-state-tree';
const RootStore = types
  .model('RootStore', {
    meters: MetersStore,
    areas: AreasStore,
  })
  .actions((self) => ({
    fetchMeters: flow(function* (page: number) {
      self.meters.list.clear();

      const getData: IResponse<IMeter[], number | null> =
        yield ApiServices.loadMeters(page);
      self.meters.list = getData.results as typeof self.meters.list;
      self.meters.count = getData.count ? Math.trunc(getData.count / 20) : 0;
      self.meters.next_link = getData.next;
      self.meters.previous = getData.previous;
      self.meters.loading_status = 'Done';
      self.meters.count_deleted = 0;
    }),
    fetchAreas: flow(function* () {
      self.areas.loading_status = 'Loading';
      if (self.areas.next_link) {
        const getData: IResponse<IArea[], string | null> =
          yield ApiServices.loadAreas(self.areas.next_link);
        self.areas.list.push(...(getData.results as typeof self.areas.list));
        self.areas.next_link = getData.next;
        self.areas.previous = getData.previous;
        self.areas.loading_status = 'Uploaded';
      }
    }),
  }))
  .actions((self) => ({
    populateAdresses: flow(function* () {
      yield self.fetchAreas();

      if (self.meters.list.length) {
        for (const meter of self.meters.list) {
          if (meter.adress) continue;

          const area = self.areas.list.find((a) => a.id === meter.adress_id);
          if (area) {
            meter.adress = area.adress;
          } else {
            // Если адрес не найден, запрашиваем новый список адресов

            //  let limit = 20;
            while (!meter.adress) {
              try {
                const response: IResponse<IArea[], string | null> =
                  yield ApiServices.loadAreas(
                    `http://showroom.eis24.me/api/v4/test/areas/?limit=20&offset=${self.areas.limit}`
                  );
                if (response.results.length) {
                  self.areas.list.push(...response.results);
                  const newArea = response.results.find(
                    (a) => a.id === meter.adress_id
                  );
                  if (newArea) {
                    meter.adress = newArea.adress;
                    break;
                  } else {
                    self.areas.limit += 20;
                  }
                } else {
                  break;
                }
              } catch (error) {
                // limit += 20;
                console.log((error as Error).message);

                break;
              }
            }
          }
        }
      }
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      void self.fetchMeters(0);
      void self.fetchAreas();
    },
  }));

export type RootStoreType = typeof RootStore;
export default RootStore;
