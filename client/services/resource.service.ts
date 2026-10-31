import { ApiClient } from "@/configurations/api.client";
import { Resource } from "@/types/entity/resource";
import { SuccessResponse } from "@/types/payload/response/common/success.response";

export class ResourceService {
    static async getResourceById(id: number) {
        return ApiClient.get(`resource/${id}`).json<SuccessResponse<Resource>>();
    }
}
