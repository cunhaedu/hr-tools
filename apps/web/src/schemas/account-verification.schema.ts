import * as z from "zod";

export const AccountVerificationSchema = z.object({
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(8, { message: 'A senha não pode ter menos de 8 caracteres' }),
  passwordConfirmation: z
    .string({ required_error: 'A senha de confirmação é obrigatória' })
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'As senhas não conferem',
  path: ['passwordConfirmation'],
});

export type AccountVerificationSchemaType = z.infer<typeof AccountVerificationSchema>;
