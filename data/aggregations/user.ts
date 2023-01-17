export const userWithExtraAggr = (uid: string) => {
  return [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "uid",
        foreignField: "uid",
        as: "student",
      },
    },
    {
      $set: {
        student: {
          $first: "$student",
        },
      },
    },
    {
      $lookup: {
        from: "organizations",
        localField: "orgId",
        foreignField: "orgId",
        as: "organization",
      },
    },
    {
      $set: {
        organization: {
          $first: "$organization",
        },
      },
    },
    {
      $lookup: {
        from: "roles",
        localField: "orgId",
        foreignField: "roleRef",
        as: "roles",
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
      },
    },
    {
      $project: {
        _id: 0,
        signinSignature: 0,
        __v: 0,
        student: {
          _id: 0,
          __v: 0,
        },
        organization: {
          _id: 0,
          __v: 0,
        },
        roles: {
          _id: 0,
          __v: 0,
          user: {
            _id: 0,
            __v: 0,
            signinSignature: 0,
            appOwned: 0,
            appQuota: 0,
            settings: 0,
            personalEmail: 0,
            type: 0,
            createdAt: 0,
            updatedAt: 0,
            orgId: 0,
            shouldUpdate: 0,
          },
        },
      },
    },
  ];
};
