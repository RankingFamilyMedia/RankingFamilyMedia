const { queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'ranking',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const listBeatsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBeats');
}
listBeatsRef.operationName = 'ListBeats';
exports.listBeatsRef = listBeatsRef;

exports.listBeats = function listBeats(dc) {
  return executeQuery(listBeatsRef(dc));
};
