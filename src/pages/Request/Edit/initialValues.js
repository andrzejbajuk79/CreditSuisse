export const editRequestFormInitialValues = request => ({
 RequestName: request.RequestName || '',
 Requestor: request.Requestor || '',
 GoodEnding: request.GoodEnding || '',
 Description: request.Description || '',
 NeedStoryteller: request.NeedStoryteller || '',
 Storyteller: request.Storyteller || '',
 WantedCharacters: request.WantedCharacters.split(';') || '',
 Deadline: new Date(request.Deadline) || '',
 Budget: request.Budget || '',
});
