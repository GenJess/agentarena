export const getApiKey = (): string => {
  return localStorage.getItem('apiKey') || import.meta.env.VITE_OPENAI_API_KEY || '';
};

export const saveApiKey = (key: string): void => {
  localStorage.setItem('apiKey', key);
};
