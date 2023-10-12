import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatário' })
    .email(),
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(8, { message: 'A senha não pode ter menos de 8 caracteres' }),
});
