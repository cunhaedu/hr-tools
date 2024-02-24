import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { RotateCwIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { registerCompanySchema, registerCompanySchemaType } from '@/schemas/register-company.schema';
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";
import { Stepper } from '@/components/stepper';
import { Form } from '@/components/ui/form';
import {
  CustomModalDescription,
  CustomModalFooter,
  CustomModalHeader,
  CustomModalTitle,
} from "@/components/custom-modal";

import { RegisterCompanyFormeStep1 } from './steps/register-company-form-step-1';
import { RegisterCompanyFormeStep2 } from './steps/register-company-form-step-2';
import { RegisterCompanyFormeStep3 } from './steps/register-company-form-step-3';
import { CompanyRegistered } from './components/company-registered';

export const registerCompanyValidationPerStep:
  Record<number, (keyof registerCompanySchemaType)[]> = {
    0: ['name', "cnpj"],
    1: ['cep', 'city', 'state', 'neighborhood', 'street', 'streetNumber'],
    2: ['email', 'responsibleFirstName', 'responsibleLastName', 'phoneNumber'],
  };

const FORM_STEP_TITLES = ['Dados da empresa', 'endereço', 'Dados do responsável'];
const FORM_STEP_LENGTH = 2;

interface RegisterCompanyFormProps {
  handleFormChange(form: 'signIn' | 'forgotPassword' | 'registerCompany'): void;
  setOpen(open: boolean): void;
}

export function RegisterCompanyForm({
  handleFormChange,
  setOpen
}: Readonly<RegisterCompanyFormProps>) {
  const [isFormSuccessfullySubmitted, setIsFormSuccessfullySubmitted] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState<number>(0);

  const form = useForm<registerCompanySchemaType>({
    resolver: zodResolver(registerCompanySchema),
  });

  const isInFirstStep = currentFormStep === 0;
  const isInLastStep = currentFormStep === FORM_STEP_LENGTH;

  async function onSubmit(values: registerCompanySchemaType) {
    console.log(values);
    try {
      await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/distritos')
      setIsFormSuccessfullySubmitted(true);
    } catch (error) {
    }
  }

  async function handleActionButton() {
    const isAllFieldsValid = await form.trigger(
      registerCompanyValidationPerStep[currentFormStep]
    );

    if (!isAllFieldsValid) return;

    if (isInLastStep) {
      form.handleSubmit(onSubmit)();
    } else {
      setCurrentFormStep((currentStep) => currentStep + 1);
    }
  };

  const handleGoBackButton = () => {
    setCurrentFormStep((currentStep) => currentStep - 1);
  };

  function renderFormByCurrentStep() {
    const forms: Record<number, ReactNode> = {
      0: <RegisterCompanyFormeStep1 />,
      1: <RegisterCompanyFormeStep2 />,
      2: <RegisterCompanyFormeStep3 />,
    }

    return forms[currentFormStep];
  }

  if(isFormSuccessfullySubmitted) {
    return (
      <CompanyRegistered setOpen={setOpen} />
    )
  }

  return (
    <>
      <CustomModalHeader>
        <Stepper stepTitles={FORM_STEP_TITLES} currentStep={currentFormStep} />

        <CustomModalTitle>Abra uma conta para a sua empresa</CustomModalTitle>
        <CustomModalDescription>
          Inicie hoje mesmo com nosso sistema!
        </CustomModalDescription>
      </CustomModalHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          {renderFormByCurrentStep()}

          <div className="flex justify-center items-center gap-4 mt-2">
            {isInFirstStep ? (
              <Button
                type="button"
                variant="link"
                className="flex-1"
                onClick={() => handleFormChange('signIn')}
              >
                Já tenho um login
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1"
                onClick={handleGoBackButton}
              >
                Voltar
              </Button>
            )}

            {form.formState.isSubmitting ? (
              <Button
                size="lg"
                type="button"
                className="flex-1"
                disabled
              >
                <RotateCwIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                size="lg"
                type="button"
                className="flex-1"
                onClick={handleActionButton}
              >
                {currentFormStep === FORM_STEP_LENGTH ? 'Registrar Empresa' : 'Avançar'}
              </Button>
            )}

          </div>
        </form>
      </Form>

      <CustomModalFooter className='flex flex-col gap-4 justify-center'>
        <Separator className="mb-2" />

        <span className='text-center'>
          Já iniciou o cadastro da empresa mas não recebeu o email de confirmação?
        </span>
        <Button
          variant="ghost"
          size="lg"
          className="w-full font-semibold text-primary hover:text-primary"
          onClick={() => handleFormChange('signIn')}
        >
          Reenviar email
        </Button>
      </CustomModalFooter>
    </>
  )
}
