import { Router, Request, Response } from "express";
import { IdentifyReqDTO, IdentifyResponseDTO } from "../types";
import { UserRepository } from "../repository/user.repo";

const userRouter = Router();



userRouter.post('/identify', async (req: Request<{}, {}, IdentifyReqDTO>, res: Response<IdentifyResponseDTO>) => {
    const { email, phoneNumber } = req.body;
    const result = await UserRepository.identify(email, phoneNumber);
    if (!result) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    const { primaryContactId, emails, phoneNumbers, secondaryContacts } = result;
    res.json({
        message: 'Contact found',
        contact: {
            primaryContactId,
            emails,
            phoneNumbers,
            secondaryContactsIds: secondaryContacts
        }
    });
});




export default userRouter;