import React from 'react';
import { FormWizard } from '../form-wizard';
import type { IFormWizardStep, RenderNewCompProps } from '../interfaces';

interface IFormRequest {
  a: string;
  b: number;
}

enum STEPS {
  DOCS_LOAD = 'DOCS_LOAD'
}

const steps: Array<IFormWizardStep<IFormRequest, STEPS>> = [
  {
    name: STEPS.DOCS_LOAD,
    title: 'firstPage',
    page: () => <div>hell</div>,
    onSubmit: ({ next, setCurrentStep }) => {
      next();
      setCurrentStep(STEPS.DOCS_LOAD);
    }
  }
];

const RenderNewComp = ({
  props,
  StepPage
}: RenderNewCompProps<IFormRequest, STEPS>) => (
  <div>
    <div>{props.currentStep}</div>
    {StepPage}
    <div>Wohooo</div>
  </div>
);

const mockVals: IFormRequest = { a: 'ss', b: 2 };

const Wizard = () => (
  <FormWizard
    steps={steps}
    renderNew={RenderNewComp}
    formProps={{ initialValues: mockVals }}
  />
);
