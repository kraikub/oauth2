export const getUserLogsAggregation = (uid: string) => {
  return [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $lookup: {
        from: "applications",
        localField: "clientId",
        foreignField: "clientId",
        as: "app",
      },
    },
    {
      $set: {
        app: {
          $first: "$app",
        },
      },
    },
    {
      $project: {
        scope: 1,
        timestamp: 1,
        ip: 1,
        ssid: 1,
        userAgent: 1,
        userAgentMobile: 1,
        userAgentPlatform: 1,
        app: {
          appName: 1,
        },
      },
    },
  ];
};
