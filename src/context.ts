import { createContext } from 'react';
import { noop } from './utils';
import type { IWizardContext } from './interfaces';

export const FormWizardContext = createContext<IWizardContext>({
  currentStep: '',
  isFirstStep: true,
  isLastStep: false,
  goToNextStep: noop,
  goToPreviousStep: noop,
  goToStep: noop
});
