import type { FormRenderProps } from 'react-final-form';

/**
 * Дополнительные параметры передаваемые в контексте визарда.
 *
 * S - Мапа шагов визарда.
 * */
export interface IWizardContext<S = string> {
  /** Нынешний шаг. */
  currentStep: S;
  /** Является ли первым шагом. */
  isFirstStep: boolean;
  /** Является ли последним шагом. */
  isLastStep: boolean;
  /** Изменение нынешнего шага на другой. */
  setCurrentStep: React.Dispatch<React.SetStateAction<S>>;
  /** Переход на следующий шаг. */
  next(): void;
  /** Переход не предыдущий шаг. */
  previous(): void;
}

/**
 * Параметры шага вызарда.
 *
 * T – Тип значений формы.
 * S - Мапа шагов визарда.
 * */
export interface IFormWizardStep<T, S = string> {
  /** Название шага. */
  name: S;
  /** Yup схема валидации. */
  validationSchema?: any;
  /** Название шага. Отображается в табах. */
  title: string;
  /** Активнсть шага. */
  disabled?: boolean;
  /** Страница шага. */
  page: React.FC<FormWizardRenderProps<T, S>>;
  /** Хендлер по сабмиту. */
  onSubmit(values: IWizardContext<S> & T): void;
}

/**
 * Прокидываемые параметры контента формы. Включает в себя контекст визарда и параметры формы.
 *
 * T – Тип значений формы.
 * S - Мапа шагов визарда.
 * */
export type FormWizardRenderProps<T, S = string> = FormRenderProps<T> &
  IWizardContext<S>;

export interface RenderNewCompProps<T, S = string> {
  props: FormRenderProps<T> & IWizardContext<S>;
  StepPage: React.FC<FormWizardRenderProps<T, S>>;
}
