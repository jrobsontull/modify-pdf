const isBrowser = () => {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return true;
  }
};

export { isBrowser };
