export interface Query {
  client_id?: string | string[] | null;
  state?: string | string[] | null;
  scope?: string | string[] | null;
  dev?: string | string[] | null;
  secret?: string | string[] | null;
}
