import { z } from 'zod';

export const encodeSignalingData = (
  data: SignalingData
): EncodedSignalingData => {
  return encodeURIComponent(JSON.stringify(data));
};

export const decodeSignalingData = (encodedData: string) => {
  return JSON.parse(decodeURIComponent(encodedData)) as SignalingData;
};

export const SignanlingDataTypeSchema = z.enum(['offer', 'answer']);

export type SignalingDataType = z.infer<typeof SignanlingDataTypeSchema>;

export type SignalingData = {
  type: SignalingDataType;
  sdp: RTCSessionDescription;
};

export const EncodedSignalingDataSchema = z.string();

export type EncodedSignalingData = z.infer<typeof EncodedSignalingDataSchema>;
