export interface MiddlewareOutput<type> {
    success: boolean
    payload: type
}