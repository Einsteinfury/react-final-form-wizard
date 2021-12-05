import { useContext } from 'react';
import { useForm } from 'react-final-form';
import { FormWizardContext } from './context';
import type { IWizardContext } from './interfaces';

/**
 * Хук, возвращающий контекст формы и и визарда.
 *
 * T – Тип значений формы.
 * S - Мапа шагов визарда.
 * */
export const useFormWizard = <T = Record<string, any>, S = string>() => {
  const form = useForm<T>();
  // Происходит каст из-за прокидывания дженерика.
  const wizardContext = useContext(
    FormWizardContext
  ) as unknown as IWizardContext<S>;

  return { ...form, ...wizardContext };
};
