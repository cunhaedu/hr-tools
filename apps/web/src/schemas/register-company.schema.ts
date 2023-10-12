import * as z from "zod";

export const registerCompanySchema = z.object({
  name: z.string({ required_error: 'O nome é obrigatário' }),
  cnpj: z.string({ required_error: 'O CNPJ é obrigatário' }),
  cep: z.string({ required_error: 'O CEP é obrigatário' }),
  phoneNumber: z.string({ required_error: 'O telefone é obrigatário' }),
  street: z.string({ required_error: 'O logradouro é obrigatário' }),
  streetNumber: z.string({ required_error: 'O número é obrigatário' }),
  neighborhood: z.string({ required_error: 'O bairro é obrigatário' }),
  city: z.string({ required_error: 'A cidade é obrigatória' }),
  state: z
    .string({ required_error: 'O estado é obrigatário' })
    .length(2, { message: 'O estado deve conter 2 caracteres' }),
  email: z
    .string({ required_error: 'O email é obrigatário' })
    .email('Email inválido'),
  responsibleFirstName: z
    .string({ required_error: 'campo obrigatário' }),
  responsibleLastName: z
    .string({ required_error: 'campo obrigatário' }),
});
