// This is used for filtering User entity with out
// revealing any kraikub's user information, public
// use only.

export const publicUserFilter = (u: User): PublicUser => {
  return {
    uid: u.uid,
  };
};
