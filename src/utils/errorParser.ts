export const parseValidationErrors = (err: any): { fieldErrors: Record<string, string>, generalMessage: string } => {
  const message = err.response?.data?.message;
  
  if (Array.isArray(message)) {
    const fieldErrors: Record<string, string> = {};
    message.forEach(msg => {
      if (typeof msg === 'string') {
        const firstSpaceIndex = msg.indexOf(' ');
        if (firstSpaceIndex !== -1) {
          const field = msg.substring(0, firstSpaceIndex);
          if (!fieldErrors[field]) {
            fieldErrors[field] = msg; // Original full message or could be msg.substring(firstSpaceIndex + 1)
          }
        }
      }
    });
    return { fieldErrors, generalMessage: 'Please correct the highlighted errors in the form.' };
  } else if (typeof message === 'string') {
    return { fieldErrors: {}, generalMessage: message };
  }
  
  return { fieldErrors: {}, generalMessage: err.message || 'An unexpected error occurred.' };
};
