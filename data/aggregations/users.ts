export const fullStudentUserAggr = (uid: string) => {
  return [
    {
      '$match': {
        'uid': uid
      }
    }, {
      '$lookup': {
        'from': 'students', 
        'localField': 'uid', 
        'foreignField': 'uid', 
        'as': 'student'
      }
    }, {
      '$set': {
        'student': {
          '$first': '$student'
        }
      }
    }, {
      '$lookup': {
        'from': 'educations', 
        'localField': 'uid', 
        'foreignField': 'uid', 
        'as': 'educations'
      }
    }, {
      '$project': {
        '_id': 0, 
        'student': {
          '_id': 0
        }, 
        'educations': {
          '_id': 0
        }
      }
    }
  ]
}

export const studentAggr = (uid: string) => {
  return [
    {
      '$match': {
        'uid': '7aa9d883290077be4999f36252a0c61fbd603acf3a51adc4f724544525d503e2'
      }
    }, {
      '$lookup': {
        'from': 'students', 
        'localField': 'uid', 
        'foreignField': 'uid', 
        'as': 'student'
      }
    }, {
      '$set': {
        'student': {
          '$first': '$student'
        }
      }
    }, {
      '$project': {
        'uid': 1, 
        'createdAt': 1, 
        'appOwned': 1, 
        'appQuota': 1, 
        'student': {
          'nameEn': 1, 
          'nameTh': 1
        }
      }
    }
  ]
}