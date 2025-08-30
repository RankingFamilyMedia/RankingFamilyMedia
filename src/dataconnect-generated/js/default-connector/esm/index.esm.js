import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'ranking',
  location: 'us-central1'
};

export const listBeatsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBeats');
}
listBeatsRef.operationName = 'ListBeats';

export function listBeats(dc) {
  return executeQuery(listBeatsRef(dc));
}

