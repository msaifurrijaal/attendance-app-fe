interface Role {
  id: string;
  code: string;
  name: string;
}

interface Department {
  id: string;
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface UserMe {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  image_url: string | null;
  position: string | null;
  role: Role;
  department: Department;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}