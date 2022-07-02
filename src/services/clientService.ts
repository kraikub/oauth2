import { mapQueryStringToUrl } from "../../api/utils/query"
import { nextApiBaseInstance } from "../../libs/axios"
import { ApplicationResponse } from "../../api/types/response"

class ClientService {
    public async getApplication(clientId: string) { 
        const { data, status } = await nextApiBaseInstance.get<ApplicationResponse>(mapQueryStringToUrl("/client/app", {
            client_id: clientId
        }))
        if (status === 200) {
            return data.result
        }
    }
}
export const clientService = new ClientService()