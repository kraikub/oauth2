export const orgFullDataForDisplay = (orgId: string) => [
  {
    $match: {
      orgId: orgId,
    },
  },
  {
    $lookup: {
      from: "roles",
      localField: "orgId",
      foreignField: "roleRef",
      pipeline: [
        {
          $lookup: {
            from: "users",
            localField: "userRef",
            foreignField: "uid",
            as: "user",
          },
        },
        {
          $set: {
            user: {
              $first: "$user",
            },
          },
        },
      ],
      as: "members",
    },
  },
  {
    $project: {
      _id: 0,
      orgId: 1,
      orgName: 1,
      orgUsername: 1,
      availableRoles: 1,
      members: {
        roleName: 1,
        roleType: 1,
        priority: 1,
        data: 1,
        user: {
          uid: 1,
          profileImageUrl: 1,
          fullName: 1,
          type: 1,
          personalEmail: 1,
          createdAt: 1,
        },
      },
    },
  },
];
