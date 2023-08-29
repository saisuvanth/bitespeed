import { pool } from "../db";
import { IdentifyDTO } from "../types";
import { IDENTIFY_QUERY } from "./queries";

export class UserRepository {
    static async identify(email: string, phoneNumber: number) {
        const query = IDENTIFY_QUERY;
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();
            const [rows] = await pool.query<IdentifyDTO[]>(query, [email, phoneNumber]);
            if (!rows) {
                return null;
            }
            const result = rows[0];
            const {
                emails,
                phoneNumbers,
                primaryContactId,
                secondaryContactIds,
                secondaryEmails,
                secondaryPhoneNumbers
            } = result;
            await conn.commit();
            return {
                primaryContactId,
                emails: [...emails, ...secondaryEmails],
                phoneNumbers: [...phoneNumbers, ...secondaryPhoneNumbers],
                secondaryContacts: secondaryContactIds
            }
        } catch (e) {
            await conn.rollback();
            console.log(e);
            return null;
        } finally {
            conn.release();
        }
    }
}