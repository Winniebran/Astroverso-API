export interface ITypes {
  id: string;
  name: string;
}

export interface ITypesRequest{
  name: string;
}

export interface ITypesResponse extends ITypesRequest {
  name: string,
  id: string
}