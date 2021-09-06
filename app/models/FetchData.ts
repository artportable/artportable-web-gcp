export default interface FetchData<TData> {
  data: TData;
  loading: boolean;
  error: any
}