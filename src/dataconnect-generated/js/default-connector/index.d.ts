import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ListBeatsData {
  beats?: {
    id: string;
    title: string;
    genre?: string | null;
    bpm?: number | null;
    price?: number | null;
    producer?: string | null;
    imageUrl?: string | null;
  } & beats_Key;
}

export interface beats_Key {
  id: string;
  __typename?: 'beats_Key';
}

interface ListBeatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListBeatsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListBeatsData, undefined>;
  operationName: string;
}
export const listBeatsRef: ListBeatsRef;

export function listBeats(): QueryPromise<ListBeatsData, undefined>;
export function listBeats(dc: DataConnect): QueryPromise<ListBeatsData, undefined>;

