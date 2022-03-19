import { FormApi } from 'final-form';
import React, { useCallback, useMemo, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FormWizardContext } from './context';
import { IWizardContext, IWizardForm, TStep, TStepGeneric } from './interfaces';

export const FormWizard = <T, S extends TStepGeneric = string>({
  steps,
  initialStep,
  ...restProps
}: IWizardForm<T, S>) => {
  const stepNames = steps.map(({ name }) => name);

  const [currentStep, setCurrentStep] = useState(
    initialStep ? stepNames.indexOf(initialStep) : 0
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const goToNextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, isLastStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, isFirstStep]);

  const goToStep = useCallback(
    (step: TStep<S>) => {
      const stepIndex = stepNames.indexOf(step);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
      }
    },
    [stepNames]
  );

  const wizardContextValues: IWizardContext<S> = useMemo(
    () => ({
      currentStep: stepNames[currentStep],
      isFirstStep,
      isLastStep,
      goToStep,
      goToNextStep,
      goToPreviousStep,
      setCurrentStep
    }),
    [
      currentStep,
      goToNextStep,
      goToPreviousStep,
      goToStep,
      isFirstStep,
      isLastStep,
      stepNames
    ]
  );

  const { page: StepPage, onSubmit, validate } = steps[currentStep];

  const handleStepSubmit = useCallback(
    (values: T, form: FormApi<T, Partial<T>>) =>
      onSubmit && onSubmit(values, Object.assign(form, wizardContextValues)),
    [onSubmit, wizardContextValues]
  );

  return (
    <FormWizardContext.Provider
      value={wizardContextValues as unknown as IWizardContext}
    >
      <Form
        render={(props: FormRenderProps<T>) => (
          <StepPage {...wizardContextValues} {...props} />
        )}
        {...restProps}
        onSubmit={handleStepSubmit}
        validate={validate}
      />
    </FormWizardContext.Provider>
  );
};
