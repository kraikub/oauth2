import { nextApiBaseInstance } from "../../libs/axios"
import { ApplicationResponse } from "../../api/types/response"

class AppService {
    public async getApplication(clientId: string) { 
        const { data, status } = await nextApiBaseInstance.get<ApplicationResponse>(`/api/app/${clientId}`)
        if (status === 200) {
            return data.result
        }
    }
}
export const appService = new AppService()
