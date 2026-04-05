export interface FilterTableState {
  search: string;
  department: Record<string, any> | null;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  image_url: string;
  position: null;
  role: Role;
  role_id: string;
  department: Department;
  department_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Role {
  id: string;
  code: string;
  name: string;
}
