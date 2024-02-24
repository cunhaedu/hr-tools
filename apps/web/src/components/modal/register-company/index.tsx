"use client"

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  CustomModal,
  CustomModalContent,
  CustomModalTrigger,
} from "@/components/custom-modal";

import { ForgotPasswordForm } from '../forgot-password/forgot-password-form';
import { RegisterCompanyForm } from './register-company-form';
import { SignInForm } from '../sign-in/sign-in-form';

type availableForms = 'signIn' | 'forgotPassword' | 'registerCompany';

export function RegisterCompany() {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<availableForms>(
    'registerCompany'
  );

  function handleFormChange(form: availableForms) {
    setCurrentForm(form);
  }

  function handleToggleOpen() {
    setOpen(!open);
  }

  function renderForm() {
    const forms = {
      registerCompany: <RegisterCompanyForm handleFormChange={handleFormChange} setOpen={setOpen} />,
      forgotPassword: <ForgotPasswordForm handleFormChange={handleFormChange} />,
      signIn: <SignInForm handleFormChange={handleFormChange} />,
    }

    return forms[currentForm];
  }

  return (
    <CustomModal open={open} onOpenChange={() => setCurrentForm('registerCompany')}>
      <CustomModalTrigger asChild>
        <Button
          variant="secondary"
          className="w-48"
          onClick={() => setOpen(true)}
        >
          Registrar empresa
        </Button>
      </CustomModalTrigger>
      <CustomModalContent handleToggleOpen={handleToggleOpen}>
        {renderForm()}
      </CustomModalContent>
    </CustomModal>
  )
}
