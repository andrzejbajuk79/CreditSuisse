import * as Yup from 'yup';

export const newRequestFormValidationSchema = Yup.object({
 RequestName: Yup.string()
  .required('Required')
  .max(255),
 Requestor: Yup.string().required('Required'),
 GoodEnding: Yup.string().required('Required'),
 Description: Yup.string()
  .required('Required')
  .min(250),
 NeedStoryteller: Yup.boolean(),
 Storyteller: Yup.string().when('NeedStoryteller', {
  is: true,
  then: Yup.string().required('Required'),
 }),
 WantedCharacters: Yup.string(),
 Deadline: Yup.date().required('Required'),
 Budget: Yup.number()
  .required('Required')
  .min(250000),
});
