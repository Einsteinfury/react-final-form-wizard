import { createContext } from 'react';
import { noop } from './utils';
import type { IWizardContext } from './interfaces';

/** Контекст визарда формы. */
export const FormWizardContext = createContext<IWizardContext>({
  currentStep: '',
  isFirstStep: true,
  isLastStep: false,
  next: noop,
  previous: noop,
  setCurrentStep: noop
});
