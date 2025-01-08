export interface UserLogin {
    userDTO: {
      id: string;
      employeeName: string;
      employeeCode: string | null;
      employeeMailId: string;
      subDepartment: string | null;
      role: string | null;
      mobileNo: string | null;
      supervisor: string | null;
      isActive: boolean | null;
      createdAt: string | null;
      createdBy: string | null;
      modifiedAt: string | null;
      modifiedBy: string | null;
      deletedFlag: boolean | null;
    };
    token: string;
    refreshToken: string;
  }

export  interface ResponseEditData {
    departmentType: any;
    formulationInputs?: any;
    subDepartment?: any;
    sampleTest?: any;
    standardTimeInMin?: any;
    singlePointMeasurementInMin?: any;
    analysisCompletionTimeInMin?: any;
    maxNoOfSamplesPerDay?: any;
    sampleCategory?: any;
  }