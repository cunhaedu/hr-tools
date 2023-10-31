import * as z from "zod";

export const registerCompanySchema = z.object({
  name: z
    .string({ required_error: 'O nome é obrigatório' })
    .min(1, { message: 'O nome é obrigatório' })
    .refine((value) => !/\d/.test(value), 'Nome não pode conter números'),
  cnpj: z
    .string({ required_error: 'O CNPJ é obrigatório' })
    .transform((val, ctx) => {
      const value = val.replace(/[^\d]/g, '');

      if(value.length !== 14) {
        ctx.addIssue({
          code: 'custom',
          message: 'CNPJ inválido',
        });
      }

      return value;
    }),
  cep: z
    .string({ required_error: 'O CEP é obrigatório' })
    .transform((val, ctx) => {
      const value = val.replace(/[^\d]/g, '');

      if(value.length !== 8) {
        ctx.addIssue({
          code: 'custom',
          message: 'CEP inválido',
        });
      }

      return value;
    }),
  phoneNumber: z
    .string({ required_error: 'O telefone é obrigatório' })
    .min(1, { message: 'O telefone é obrigatório' }),
  street: z
    .string({ required_error: 'O logradouro é obrigatório' })
    .min(1, { message: 'O logradouro é obrigatório' }),
  streetNumber: z
    .string({ required_error: 'O número é obrigatório' })
    .min(1, { message: 'O número é obrigatório' })
    .refine((value) => /\d/.test(value), 'Deve conter apenas números'),
  neighborhood: z
    .string({ required_error: 'O bairro é obrigatório' })
    .min(1, { message: 'O bairro é obrigatório' }),
  city: z
    .string({ required_error: 'A cidade é obrigatória' })
    .min(1, { message: 'A cidade é obrigatória' }),
  state: z
    .string({ required_error: 'A UF é obrigatória' })
    .length(2, { message: 'A UF deve conter 2 caracteres' }),
  email: z
    .string({ required_error: 'O email é obrigatório' })
    .email('Email inválido'),
  responsibleFirstName: z
    .string({ required_error: 'campo obrigatório' })
    .refine((value) => !/\d/.test(value), 'Nome não pode conter números'),
  responsibleLastName: z
    .string({ required_error: 'campo obrigatório' })
    .refine((value) => !/\d/.test(value), 'Sobrenome não pode conter números'),
});

export type registerCompanySchemaType = z.infer<typeof registerCompanySchema>;
