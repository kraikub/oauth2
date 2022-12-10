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

function onlyPrivateUser(uid: string) {
  return [
    {
      $match: {
        uid: uid,
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0
      },
    },
  ];
}

const privateApplication = [
  {
    $lookup: {
      from: "applications",
      localField: "uid",
      foreignField: "ownerId",
      as: "applications"
    },
  }
]

// interface OptionalUserKeys {
//   universityEmail?: 0 | 1;
//   personalEmail?: 0 | 1;
//   profileImageUrl?: 0 | 1;
// }

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

function onlyPublicUserWith(uid: string, includeKeys: string[]) {
  const projection: any = {
    $project: {
      _id: 0,
      uid: 1,
    },
  }
  for (const key of includeKeys) {
    projection.$project[key] = 1
  }
  return [
    {
      $match: {
        uid: uid,
      },
    },
    projection,
  ];
}

function onlyPrivateStudent() {
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


// Main export aggrs. ///////////////////////////////////
/////////////////////////////////////////////////////////

export const aggregations = {
  private: {
    user: onlyPrivateUser,
    apps: privateApplication,
    student: onlyPrivateStudent,
  },
  public: {
    user: onlyPublicUser,
    userWith: onlyPublicUserWith,
    education: onlyEducation,
    academic: onlyAcademic,
    student: onlyPrivateStudent,
  },
};