import { RowDataPacket } from "mysql2";

interface IdentifyDTO extends RowDataPacket {
    primaryContactId: string;
    emails: string[];
    phoneNumbers: number[];
    secondaryContactIds: number[];
    secondaryEmails: string[];
    secondaryPhoneNumbers: number[];
}

interface IdentifyReqDTO {
    email: string;
    phoneNumber: number;
}

interface IdentifyResponseDTO {
    message: string;
    contact?: {
        primaryContactId: string;
        emails: string[];
        phoneNumbers: number[];
        secondaryContactsIds: number[];
    };
}