import { ApiClient } from "@/configurations/api.client";
import { Course } from "@/types/entity/course";
import { CourseFilterRequest } from "@/types/payload/request/course.filter.request";
import { UpdateCourseVisibilityRequest } from "@/types/payload/request/update.course.visibility.request";
import { PageResponse } from "@/types/payload/response/common/page.response";
import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { CourseDetailResponse } from "@/types/payload/response/course.detail.response";
import { CourseResponse } from "@/types/payload/response/course.response";
import { ModuleResponse } from "@/types/payload/response/module.response";

export class CourseService {
    static async getAllCourses(filter: CourseFilterRequest = {}) {
        const searchParams = Object.fromEntries(
            Object.entries(filter).filter(
                ([, value]) => value !== undefined && value !== null && value !== "",
            ),
        );
        return ApiClient.get("course", { searchParams }).json<SuccessResponse<PageResponse<CourseResponse>>>();
    }

    static async getCourseBySlug(slug: string) {
        return ApiClient.get(`course/${slug}`).json<SuccessResponse<CourseDetailResponse>>();
    }

    static async getAllModuleBySlug(slug: string) {
        return ApiClient.get(`course/${slug}/modules`).json<SuccessResponse<ModuleResponse[]>>();
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

    static async updateCourseVisibility(id: number, data: UpdateCourseVisibilityRequest) {
        return ApiClient.put(`course/${id}/update-visibility`, {
            json: data,
        }).json<SuccessResponse<Course>>();
    }

    static async deleteCourse(id: number) {
        return ApiClient.delete(`course/${id}`).json<SuccessResponse<Course>>();
    }
}
