interface Query {
  client_id: string | string[] | null;
  state?: string | string[] | null;
  scope: string | string[] | null;
  dev?: string | string[] | null;
  secret?: string | string[] | null;
  redirect_uri?: string | string[] | null;
  response_type: string | string[] | null;
  code_challenge: string | string[] | null;
  code_challenge_method: string | string[] | null;
}