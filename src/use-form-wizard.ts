import { useContext } from 'react';
import { useForm } from 'react-final-form';
import { FormWizardContext } from './context';
import type { IWizardContext, TStepGeneric } from './interfaces';

/** A useForm hook with added access to wizard context. */
export const useFormWizard = <
  T = Record<string, any>,
  S extends TStepGeneric = string
>() => {
  const form = useForm<T>();
  const wizardContext = useContext(
    FormWizardContext
  ) as unknown as IWizardContext<S>;

  return { ...form, ...wizardContext };
};
