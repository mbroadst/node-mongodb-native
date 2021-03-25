import { expectDeprecated, expectType, expectNotType, expectError, expectAssignable } from 'tsd';

import { Collection } from '../../.../../../src/collection';
import { ObjectId } from '../../../src/bson';
import { Db } from '../../../src/db';
import { MongoClient } from '../../../src/mongo_client';
import type { InferIdType } from '../../../src/mongo_types';

expectDeprecated(Collection.prototype.insert);
expectDeprecated(Collection.prototype.update);
expectDeprecated(Collection.prototype.remove);

const db = new Db(new MongoClient(''), '');

type InsertRes<TId = ObjectId> = Promise<{ acknowledged: boolean; insertedId: TId }>;

interface RandomKeysToNumberIncludingId {
  _id: number;
  a: number;
  [extraKeys: string]: number;
}
const randomKeysIncludeIdC = new Collection<RandomKeysToNumberIncludingId>(db, '');
expectType<InsertRes<number>>(randomKeysIncludeIdC.insertOne({ a: 2, randomKey: 23, _id: 23 }));
expectError(randomKeysIncludeIdC.insertOne({ a: 2, randomKey: 23 }));

let arg1: Parameters<typeof randomKeysIncludeIdC.findOne>[0] = null as any;
expectAssignable<Partial<RandomKeysToNumberIncludingId>>(arg1);

////////////////////////////////////////////////////////////////////////////////////////////////////

interface RandomKeysToNumber {
  a: number;
  [extraKeys: string]: number | ObjectId; // if you omit _id, it still needs to be accounted for
}
const randomKeysC = new Collection<RandomKeysToNumber>(db, '');
expectType<InsertRes>(randomKeysC.insertOne({ a: 2, randomKey: 23, _id: new ObjectId() }));
expectType<InsertRes>(randomKeysC.insertOne({ a: 2, randomKey: 23 }));
expectNotType<InsertRes<number>>(
  randomKeysC.insertOne({ a: 2, randomKey: 23, _id: new ObjectId() })
); // You cannot implicitly have an _id of an unusual type
