import { CreateSkill, UpdateSkill } from "../../types/scoutingTypes";
import { api } from "../../utils/api";

export const fetchData = async (url: string) => {
  try {
    const headers = {
      Authorization: "Bearer your_access_token_here",
    };

    const response = await api(url, { headers });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createData = async (data: CreateSkill, url: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_access_token_here",
    };

    const response = await api(url, {
      method: "POST",
      headers: headers,
      payload: data,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateData = async (data: UpdateSkill, url: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_access_token_here",
    };

    const response = await api(url, {
      method: "PUT",
      headers: headers,
      payload: data,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

export const deleteData = async (skillName: string, url: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_access_token_here",
    };

    await api(url, {
      method: "DELETE",
      headers: headers,
    });

    return [{ name: skillName }];
  } catch (error) {
    return [];
  }
};

export const uploadFiles = async (
  formData: FormData,
  skill: any,
  url: string,
  type: string
) => {
  try {
    const headers = {
      Authorization: "Bearer your_access_token_here",
    };
    if (skill) {
      formData.append("skill", JSON.stringify(skill));
    }
    if (type) {
      formData.append("type", type);
    }

    const result = await api(url, {
      method: "POST",
      headers: headers,
      payload: formData,
    });

    return result;
  } catch (error) {
    return [];
  }
};
