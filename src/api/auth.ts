import axios from "./axios";

export interface RegisterData {
  name: string;
  admissionNumber: string;
  email: string;
  faceSnapshot: Blob;
}

export interface LoginData {
  admissionNumber: string;
  faceSnapshot: Blob;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    admissionNumber: string;
    faceSample: string;
    email: string;
  };
  token: string;
  message: string;
}

export const authAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("admissionNumber", data.admissionNumber);
    formData.append("email", data.email);
    formData.append("file", data.faceSnapshot, "face.png");

    const response = await axios.post<AuthResponse>(
      "/auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const formData = new FormData();
    formData.append("admissionNumber", data.admissionNumber);
    formData.append("file", data.faceSnapshot, "face.png");

    const response = await axios.post<AuthResponse>("/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
