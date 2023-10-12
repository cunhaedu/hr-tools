"use client"

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      registerCompany: <RegisterCompanyForm handleFormChange={handleFormChange} />,
      forgotPassword: <ForgotPasswordForm handleFormChange={handleFormChange} />,
      signIn: <SignInForm handleFormChange={handleFormChange} />,
    }

    return forms[currentForm];
  }

  return (
    <Dialog open={open} onOpenChange={() => setCurrentForm('registerCompany')}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-48"
          onClick={() => setOpen(true)}
        >
          Registrar empresa
        </Button>
      </DialogTrigger>
      <DialogContent open={open} handleToggleOpen={handleToggleOpen}>
        {renderForm()}
      </DialogContent>
    </Dialog>
  )
}
