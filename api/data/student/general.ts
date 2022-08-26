import { NextApiRequest, NextApiResponse } from "next";
import { studentFromResponse } from "../../../scopes/student";
import { handleApiError } from "../../error";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { bridge } from "../../bridge/bridge";
import { createResponse } from "../../types/response";

export async function studentGeneralApi(req: NextApiRequest,res: NextApiResponse) {
    try {
    if (req.method === "GET") {
        const {success, payload} = AuthMiddleware(req, res)
        if (!success) return
        const {status, data} = await bridge.getProfile(payload.stdId, payload.accessToken)
        if (status !== 200) {
            return res.status(status).send(createResponse(false, "Failed from myapi.ku.th", {}))
        }
        const converted = studentFromResponse(payload.stdCode, data)
        return res.send(createResponse(true, "", converted))
    }
    res.status(404).send({})
    } catch(error) {
        handleApiError(res, error)
    }
}