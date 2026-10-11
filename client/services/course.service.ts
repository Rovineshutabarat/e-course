import { ApiClient } from "@/services/config/api.client";
import { Course } from "@/types/entity/course";
import { CourseModule } from "@/types/entity/module";
import { CourseFilterRequest } from "@/types/payload/request/course.filter.request";
import { UpdateCourseVisibilityRequest } from "@/types/payload/request/update.course.visibility.request";
import { SuccessResponse } from "@/types/payload/response/common/success.response";
import { PageResponse } from "@/types/payload/response/common/page.response";
import { CourseDetailResponse } from "@/types/payload/response/course.detail.response";
import { CourseResponse } from "@/types/payload/response/course.response";

export class CourseService {
    static async getCourses(filter: CourseFilterRequest = {}) {
        const searchParams = Object.fromEntries(
            Object.entries(filter).filter(
                ([, value]) => value !== undefined && value !== null && value !== "",
            ),
        );
        return ApiClient.get("course", { searchParams }).json<SuccessResponse<PageResponse<CourseResponse>>>();
    }

    // static async getCourseById(id: number) {
    //     return ApiClient.get(`course/${id}`).json<SuccessResponse<Course>>();
    // }

    static async getCourseBySlug(slug: string) {
        return ApiClient.get(`course/${slug}`).json<SuccessResponse<CourseDetailResponse>>();
    }

    static async getCourseModules(slug: string) {
        return ApiClient.get(`course/${slug}/modules`).json<SuccessResponse<CourseModule[]>>();
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
