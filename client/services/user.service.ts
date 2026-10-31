import { ApiClient } from "@/configurations/api.client";
import { User } from "@/types/entity/user";
import { UpdateProfileRequest } from "@/types/payload/request/update.profile.request";
import { SuccessResponse } from "@/types/payload/response/common/success.response";

export class UserService {
  static async updateUser(
    id: number,
    data: UpdateProfileRequest,
  ): Promise<SuccessResponse<User>> {
    return await ApiClient.put(`user/${id}`, {
      json: data,
    }).json<SuccessResponse<User>>();
  }
}
