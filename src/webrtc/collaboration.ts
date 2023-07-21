import establishConnection from './connection';
import type { Connection, DataChannelCallbacks } from './connection';
import type { SignalingData } from './utilities';

export type SignalingDataCallback = (signalingData: SignalingData) => void;

export type OnAnswerCallback = (answer: RTCSessionDescription) => void;
export type OnOfferCallback = (offer: RTCSessionDescription) => void;

export const startCollaboration = async (
  signalingData: SignalingData | undefined,
  onSignalingData: SignalingDataCallback,
  dataChannelCallbacks: DataChannelCallbacks
): Promise<void> => {
  let connection: Connection = {
    connectionState: 'noConnection',
    dataChannelCallbacks,
    signalingData,
  };

  while (connection?.connectionState !== 'established') {
    connection = await establishConnection(connection);

    if (connection.signalingData) {
      onSignalingData(connection.signalingData);
    }
  }
};
