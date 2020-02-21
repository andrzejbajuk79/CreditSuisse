const fourWeeksAhead = new Date();
fourWeeksAhead.setDate(fourWeeksAhead.getDate() + 28);

export const newRequestFormInitialValues = {
 RequestName: '',
 Requestor: '',
 GoodEnding: '',
 Description: '',
 NeedStoryteller: '',
 Storyteller: '',
 WantedCharacters: [],
 Deadline: fourWeeksAhead,
 Budget: '',
};
