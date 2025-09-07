
export const Gender =  {
  Male : 'Male',
  Female : 'Female',
} as const

export type Gender = (typeof Gender[keyof typeof Gender])

export interface Student {
  id: number;
  admissionNumber: string;
  name: string;
  dob: Date;
  gender: Gender;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  department: Department;
  departmentId: number;
  faculty: Faculty;
  facultyId: number;
}

export interface Staff {
  id: number;
  name: string;
  gender: Gender;
  position: string;
  createdAt: Date;
  updatedAt: Date;
  department: Department;
  departmentId: number;
}

export interface Faculty {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  departments: Department[];
  students: Student[];
}

export interface Department {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  faculty: Faculty;
  facultyId: number;
  students: Student[];
  staff: Staff[];
}

export interface Admin {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface StudentsByGenderResponse extends ApiResponse<{
    gender: Gender;
    count: number;
}[]> {}

export interface StudentsByLevelResponse extends ApiResponse<{
    level: number;
    count: number;
}[]> {}

export interface StudentsByDepartmentResponse extends ApiResponse<{
    departmentId: number;
    departmentName: string;
    count: number;
}[]> {}

export interface StudentsByFacultyResponse extends ApiResponse<{
    facultyId: number;
    facultyName: string;
    count: number;
}[]> {}

export interface StaffByGenderResponse extends ApiResponse<{
    gender: Gender;
    count: number;
}[]> {}

export interface StaffByDepartmentResponse extends ApiResponse<{
    departmentId: number;
    departmentName: string;
    count: number;
}[]> {}

export interface PopulationSummaryResponse extends ApiResponse<{
    studentCount: number;
    staffCount: number;
    facultyCount: number;
    departmentCount: number;
}> {}
