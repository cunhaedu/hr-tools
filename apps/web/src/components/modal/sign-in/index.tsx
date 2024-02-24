"use client"

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  CustomModal,
  CustomModalContent,
  CustomModalTrigger,
} from "@/components/custom-modal";

import { RegisterCompanyForm } from '../register-company/register-company-form';
import { ForgotPasswordForm } from '../forgot-password/forgot-password-form';
import { SignInForm } from './sign-in-form';

type availableForms = 'signIn' | 'forgotPassword' | 'registerCompany';

export function SignIn() {
  const [open, setOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<availableForms>(
    'signIn'
  );

  function handleToggleOpen() {
    setOpen(!open);
  }

  function handleFormChange(form: availableForms) {
    setCurrentForm(form);
  }

  function renderForm() {
    const forms = {
      signIn: <SignInForm handleFormChange={handleFormChange} />,
      forgotPassword: <ForgotPasswordForm handleFormChange={handleFormChange} />,
      registerCompany: <RegisterCompanyForm handleFormChange={handleFormChange} setOpen={setOpen} />,
    }

    return forms[currentForm];
  }

  return (
    <CustomModal open={open} onOpenChange={() => setCurrentForm('signIn')}>
      <CustomModalTrigger asChild>
        <Button
          className="w-48 flex justify-center items-center gap-2"
          onClick={() => setOpen(true)}
        >
          Login
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CustomModalTrigger>

      <CustomModalContent handleToggleOpen={handleToggleOpen}>
        {renderForm()}
      </CustomModalContent>
    </CustomModal>
  )
}
