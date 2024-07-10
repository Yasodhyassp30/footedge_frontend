import { CreateSkill, UpdateSkill } from "../../types/scoutingTypes";
import { api } from "../../utils/api";

export const fetchData = async (url: string) => {
  try {
    const response = await api(url);
    console.log(response)
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createData = async (data: CreateSkill, url: string) => {
  try {
    const response = await api(url, {
      method: "POST",
      payload: data,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

export const updateData = async (data: UpdateSkill, url: string) => {
  try {
    const response = await api(url, {
      method: "PUT",
      payload: data,
    });

    return response.data;
  } catch (error) {
    return [];
  }
};

export const deleteData = async (skillName: string, url: string) => {
  try {
    await api(url, {
      method: "DELETE",
    });

    return [{ name: skillName }];
  } catch (error) {
    return [];
  }
};

export const uploadFiles = async (
  formData: FormData,
  skill: any,
  player: any,
  url: string,
  type: string
) => {
  try {
    if (skill) {
      formData.append("skill", JSON.stringify(skill));
    }
    if (type) {
      formData.append("type", type);
    }
    if(player){
      formData.append("player", player);
    
    }
    const result = await api(url, {
      method: "POST",
      payload: formData,
    });

    return result;
  } catch (error) {
    return [];
  }
};
