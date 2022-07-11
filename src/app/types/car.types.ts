export type status = 'processing' | 'completed';

export type CarPoolingType = {
  id: string;
  status: status;
};

export type CarType = {
  id: string;
  value: string;
  status: status;
};
