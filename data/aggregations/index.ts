export const fullStudentUserAggr = (uid: string) => {
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
        from: "educations",
        localField: "uid",
        foreignField: "uid",
        as: "educations",
      },
    },
    {
      $project: {
        _id: 0,
        student: {
          _id: 0,
        },
        educations: {
          _id: 0,
        },
      },
    },
  ];
};

export const studentAggr = (uid: string) => {
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
      $project: {
        uid: 1,
        createdAt: 1,
        appOwned: 1,
        appQuota: 1,
        student: {
          nameEn: 1,
          nameTh: 1,
        },
      },
    },
  ];
};

export const aggregations = {
  private: {
    user: onlyPrivateUser,
  },
  public: {
    user: onlyPublicUser,
    student: onlyPublicStudent,
    education: onlyEducation,
    academic: onlyAcademic,
  },
};


function onlyPrivateUser(uid: string) {
  return [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $project: {
        uid: 1,
        appOwned: 1,
        appQuota: 1,
      },
    },
  ];
}

function onlyPublicUser(uid: string) {
  return [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $project: {
        _id: 0,
        uid: 1,
      },
    },
  ];
}

function onlyPublicStudent() {
  return [
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
      $project: {
        student: {
          uid: 0,
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    },
  ];
}

function onlyEducation() {
  return [
    {
      $lookup: {
        from: "educations",
        localField: "uid",
        foreignField: "uid",
        as: "educations",
      },
    },
    {
      $project: {
        educations: {
          uid: 0,
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    },
  ];
}

function onlyAcademic(uid: string) {
  return [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $lookup: {
        from: "grades",
        localField: "hash",
        foreignField: "academicHash",
        as: "grades",
      },
    },
    {
      $project: {
        uid: 0,
        __v: 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        grades: {
          __v: 0,
          _id: 0,
          uid: 0,
          updatedAt: 0,
          createdAt: 0,
        },
      },
    },
  ];
}
