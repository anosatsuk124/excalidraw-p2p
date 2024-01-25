import { match } from 'ts-pattern';
import { SignalingDataType, SignalingData } from './utilities';

export const DefaultPeerConfiguration: RTCConfiguration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
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
    devlog.error('Local description is not set');
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
    devlog.error('Local description is not set');
  }
};
