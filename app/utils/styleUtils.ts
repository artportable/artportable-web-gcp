export const rowGap = (gap) => ({ 
  marginLeft: -(gap/2),
  marginRight: -(gap/2),
  '& > *': { 
    marginLeft: gap/2,
    marginRight: gap/2
  } 
});

export const columnGap = (gap) => ({
  marginTop: -(gap/2),
  marginBottom: -(gap/2),
  '& > *': { 
    marginTop: gap/2,
    marginBottom: gap/2
  } 
});