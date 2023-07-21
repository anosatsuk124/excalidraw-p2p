import { match } from 'ts-pattern';
import { SignalingDataType, SignalingData } from './utilities';
import { z } from 'zod';

export const PeerConfiguration: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const EstablishingConnectionStateSchema = z.enum([
  'noConnection',
  'waiting',
  'established',
]);

export type EstablishingConnectionState = z.infer<
  typeof EstablishingConnectionStateSchema
>;

export type Connection = {
  connectionState: EstablishingConnectionState;
  signalingData?: SignalingData;
  dataChannelCallbacks?: DataChannelCallbacks;
};

export const establishConnection = async ({
  connectionState,
  signalingData,
  dataChannelCallbacks,
}: Connection): Promise<Connection> => {
  const peerConnection = createPeerConnection();

  return await match(connectionState)
    .with('noConnection', async () => {
      const _signalingData = await createOffer(peerConnection);

      return {
        connectionState: 'waiting',
        signalingData: _signalingData,
        dataChannelCallbacks,
      } as Connection;
    })
    .with('waiting', async () => {
      if (!dataChannelCallbacks) {
        throw new Error('Data channel callbacks are not set');
      }
      if (!signalingData) {
        throw new Error('Signaling data is not set');
      }

      await peerConnection.setRemoteDescription(signalingData.sdp);

      const connection: Connection = await match(signalingData.type)
        .with('offer', async () => {
          const answer = await createAnswer(peerConnection);
          return {
            connectionState: 'waiting',
            signalingData: answer,
            dataChannelCallbacks,
          } as Connection;
        })
        .with('answer', () => {
          return {
            connectionState: 'established',
            signalingData: undefined,
            dataChannelCallbacks,
          } as Connection;
        })
        .exhaustive();

      dataChannelHandler(
        signalingData.type,
        peerConnection,
        dataChannelCallbacks
      );

      return connection;
    })
    .with('established', () => {
      throw new Error(
        "Connection can't be established because it is already established"
      );
    })
    .exhaustive();
};

export default establishConnection;

export const createPeerConnection = () => {
  const configuration = PeerConfiguration;

  return new RTCPeerConnection(configuration);
};

export const createOffer = async (peerConnection: RTCPeerConnection) => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  if (peerConnection.localDescription) {
    const signalingData: SignalingData = {
      type: 'offer',
      sdp: peerConnection.localDescription,
    };

    return signalingData;
  } else {
    throw new Error('Local description is not set');
  }
};

export type DataChannelCallbacks = {
  onMessage: (event: MessageEvent) => void;
};

export const dataChannelHandler = (
  type: SignalingDataType,
  peerConnection: RTCPeerConnection,
  DataChannelCallbacks: DataChannelCallbacks
) => {
  const { onMessage } = DataChannelCallbacks;

  match(type)
    .with('offer', () => {
      const dataChannel = peerConnection.createDataChannel('dataChannel');
      dataChannel.onmessage = onMessage;
    })
    .with('answer', () => {
      peerConnection.ondatachannel = (event) => {
        event.channel.onmessage = onMessage;
      };
    })
    .exhaustive();
};

export const createAnswer = async (peerConnection: RTCPeerConnection) => {
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  if (peerConnection.localDescription) {
    const signalingData: SignalingData = {
      type: 'answer',
      sdp: peerConnection.localDescription,
    };

    return signalingData;
  } else {
    throw new Error('Local description is not set');
  }
};
