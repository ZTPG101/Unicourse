import { UserRole } from "src/database/entities/user.entity"

export type CurrentUser = {
    id: number,
    role: UserRole
}