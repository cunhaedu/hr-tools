"use client"

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ForgotPasswordForm } from '../forgot-password/forgot-password-form';
import { SignInForm } from './sign-in-form';
import { RegisterCompanyForm } from '../register-company/register-company-form';

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
      registerCompany: <RegisterCompanyForm handleFormChange={handleFormChange} />,
    }

    return forms[currentForm];
  }

  return (
    <Dialog open={open} onOpenChange={() => setCurrentForm('signIn')}>
      <DialogTrigger asChild>
        <Button
          className="w-48 flex justify-center items-center gap-2"
          onClick={() => setOpen(true)}
        >
          Login
          <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent open={open} handleToggleOpen={handleToggleOpen}>
        {renderForm()}
      </DialogContent>
    </Dialog>
  )
}
