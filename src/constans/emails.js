export const defaultEmail = (requestor) => (
    {
        subject: 'New request',
        body: `Hi, A new request has been created by ${requestor}. Cheers, Story Team`
    }
);