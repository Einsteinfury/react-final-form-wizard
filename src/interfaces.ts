import React from 'react';
import { FormApi } from 'final-form';
import { FormProps, FormRenderProps } from 'react-final-form';

export type TStepMap = Record<string, string>;
export type TStepGeneric = TStepMap | string;
export type TStep<S extends TStepGeneric = string> = S extends TStepMap
  ? keyof S
  : S;

type TFormApi<T, S extends TStepGeneric = string> = FormApi<T> &
  IWizardContext<S>;

export interface IWizardForm<T, S extends TStepGeneric = string>
  extends FormProps<T> {
  steps: Array<IFormStep<T, S>>;
  initialStep?: TStep<S>;
}

export interface IFormStep<T, S extends TStepGeneric = string> {
  name: TStep<S>;
  page: React.FC<FormRenderProps<T> & IWizardContext<S>>;
  onSubmit?(values: T, form?: TFormApi<T, S>): void;
  validate?(values: T): Object | Promise<Object>;
}

export interface IWizardContext<S extends TStepGeneric = string> {
  currentStep: TStep<S>;
  isFirstStep: boolean;
  isLastStep: boolean;
  goToStep(step: TStep<S>): void;
  goToNextStep(): void;
  goToPreviousStep(): void;
}
