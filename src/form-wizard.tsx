import React, { useState, useCallback, useMemo } from 'react';
import type { FormRenderProps } from 'react-final-form';
import { Form, FormProps } from 'react-final-form';
import { FormWizardContext } from './context';
import type {
  FormWizardRenderProps,
  IFormWizardStep,
  IWizardContext
} from './interfaces';

interface IWizardProps<T, S = string> {
  steps: Array<IFormWizardStep<T, S>>;
  renderNew: React.FC<{
    props: FormRenderProps<T> & IWizardContext<S>;
    StepPage: React.FC<FormWizardRenderProps<T, S>>;
  }>;
  formProps?: Partial<FormProps<T>>;
}

export const FormWizard = <T, S = string>({
  steps,
  renderNew,
  formProps
}: IWizardProps<T, S>) => {
  const [currentStep, setCurrentStep] = useState(steps[0].name);

  const currentStepIndex = steps.findIndex(step => step.name === currentStep);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = steps.length - 1 === currentStepIndex;

  const wizardContextValues: IWizardContext<S> = useMemo(
    () => ({
      currentStep,
      isFirstStep,
      isLastStep,
      setCurrentStep,
      next: () =>
        !isLastStep && setCurrentStep(steps[currentStepIndex + 1].name),
      previous: () =>
        !isFirstStep && setCurrentStep(steps[currentStepIndex - 1].name)
    }),
    [currentStep, currentStepIndex, isFirstStep, isLastStep, steps]
  );

  const {
    page: StepPage,
    validationSchema,
    onSubmit
  } = steps[currentStepIndex];

  const handleStepSubmit = useCallback(
    (values: T) => onSubmit({ ...values, ...wizardContextValues }),
    [onSubmit, wizardContextValues]
  );

  return (
    <FormWizardContext.Provider
      value={wizardContextValues as unknown as IWizardContext}
    >
      <Form
        render={(props: FormRenderProps<T>) =>
          renderNew({ props: { ...props, ...wizardContextValues }, StepPage })
        }
        {...formProps}
        onSubmit={handleStepSubmit}
      />
    </FormWizardContext.Provider>
  );
};

FormWizard.displayName = 'FormWizard';
