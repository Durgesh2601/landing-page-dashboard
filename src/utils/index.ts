export const getLabelByType = (formValues: any, type: string) => {
  const componentListLength = formValues?.components?.filter(
    (component: any) => component.type === type
  ).length;
  if (componentListLength === 1) return type;
  return `${type} ${componentListLength + 1}`;
};
