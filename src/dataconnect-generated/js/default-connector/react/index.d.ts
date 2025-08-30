import { ListBeatsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListBeats(options?: useDataConnectQueryOptions<ListBeatsData>): UseDataConnectQueryResult<ListBeatsData, undefined>;
export function useListBeats(dc: DataConnect, options?: useDataConnectQueryOptions<ListBeatsData>): UseDataConnectQueryResult<ListBeatsData, undefined>;
