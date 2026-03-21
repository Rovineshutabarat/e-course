import { ApiClient } from "@/services/config/api.client";
import { Course } from "@/types/entity/course";
import { SuccessResponse } from "@/types/payload/response/common/success.response";

export class CourseService {
    static async getAllCategories() {
        return ApiClient.get("course").json<SuccessResponse<Course[]>>();
    }

    static async getCourseById(id: number) {
        return ApiClient.get(`course/${id}`).json<SuccessResponse<Course>>();
    }

    static async createCourse(data: FormData) {
        return ApiClient.post("course", {
            body: data,
        }).json<SuccessResponse<Course>>();
    }

    static async updateCourse(id: number, data: FormData) {
        return ApiClient.put(`course/${id}`, {
            body: data,
        }).json<SuccessResponse<Course>>();
    }

    static async deleteCourse(id: number) {
        return ApiClient.delete(`course/${id}`).json<SuccessResponse<Course>>();
    }
}
