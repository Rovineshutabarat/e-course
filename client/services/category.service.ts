import { ApiClient } from "@/services/config/api.client";
import { Category } from "@/types/entity/category";
import { SuccessResponse } from "@/types/payload/response/common/success.response";

export class CategoryService {
  static async getAllCategories() {
    return ApiClient.get("category").json<SuccessResponse<Category[]>>();
  }

  static async getCategoryById(id: number) {
    return ApiClient.get(`category/${id}`).json<SuccessResponse<Category>>();
  }

  static async createCategory(data: Category) {
    return ApiClient.post("category", {
      json: data,
    }).json<SuccessResponse<Category>>();
  }

  static async updateCategory(id: number, data: Category) {
    return ApiClient.put(`category/${id}`, {
      json: data,
    }).json<SuccessResponse<Category>>();
  }

  static async deleteCategory(id: number) {
    return ApiClient.delete(`category/${id}`).json<SuccessResponse<Category>>();
  }
}
